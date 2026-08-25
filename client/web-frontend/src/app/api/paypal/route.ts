import { NextResponse } from "next/server";
import { format } from "date-fns";
import { resend } from "@/server/email/resend";
import generateFieldBasedEmailHtml from "@/server/email/generateFieldBasedEmailHtml";

interface PaypalPaymentDetails {
  id: string;
  intent: string;
  status: string;
  purchase_units: Array<{
    description?: string;
    amount: {
      currency_code: string;
      value: string;
    };
  }>;
  payer: {
    name: {
      given_name: string;
      surname?: string;
    };
    email_address: string;
  };
  create_time: string;
  update_time: string;
  links: unknown[];
}

interface PaypalData {
  orderID: string;
  payerID: string;
  paymentID: string;
  billingToken: string | null;
  facilitatorAccessToken: string;
  paymentSource: string;
}

const currencySymbols: Record<string, string> = {
  EUR: "€",
  USD: "$",
};

export async function POST(request: Request) {
  try {
    const {
      details,
      data,
    }: {
      details: PaypalPaymentDetails;
      data: PaypalData;
    } = await request.json();

    if (!details || !data || !details.purchase_units?.[0]) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment details",
        },
        { status: 400 },
      );
    }

    console.log("Received payment details from frontend:");
    console.log("Details:", details);
    console.log("Data:", data);

    const paymentDate = new Date(details.create_time);
    const formattedPaymentDate = format(
      paymentDate,
      "d MMMM yyyy, h:mm:ss a",
    );

    const purchaseUnit = details.purchase_units[0];
    const currencyCode = purchaseUnit.amount.currency_code;

    const lessonName = purchaseUnit.description || "Paid lesson";

    const amount = `${
      currencySymbols[currencyCode] || currencyCode
    }${parseFloat(purchaseUnit.amount.value).toFixed(2)}`;

    const payer = `${details.payer.name.given_name} ${
      details.payer.name.surname || ""
    }`.trim();

    const dataForEmail = {
      lessonName,
      amount,
      payer,
      payerEmail: details.payer.email_address,
      paymentDate: formattedPaymentDate,
      paymentID: data.paymentID,
      paymentStatus: details.status,
    };

    const emailHtml = generateFieldBasedEmailHtml({
      data: dataForEmail,
      fields: {
        lessonName: "Lesson name",
        amount: "Amount",
        payer: "Bought by",
        payerEmail: "Payer email",
        paymentDate: "Payment date",
        paymentID: "Payment ID",
        paymentStatus: "Payment status",
      },
      heading: "New paid lesson booking",
    });

    const to = [process.env.RAJI_EMAIL].filter(
      (address): address is string => Boolean(address),
    );

    const emailResponse = await resend.emails.send({
      from: "Voccaria <payments@mail.voccaria.com>",
      to,
      subject: `New lesson booking: ${dataForEmail.lessonName} for ${dataForEmail.amount}`,
      ...emailHtml,
    });

    console.log(
      "Payment notification email sent successfully:",
      emailResponse,
    );

    return NextResponse.json({
      success: true,
      message: "Payment details processed successfully",
    });
  } catch (error) {
    console.error("Error processing payment details:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to process payment details",
      },
      { status: 500 },
    );
  }
}
