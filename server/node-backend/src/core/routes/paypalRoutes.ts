import { Request, Response, Router } from "express";
import { resend } from "../libs/resend.js";
import generateFieldBasedEmailHtml from "../helpers/generateFieldBasedEmailHtml.js";
import { format } from "date-fns";

const router = Router();

interface PaypalPaymentDetails {
  id: string;
  intent: string;
  status: string;
  purchase_units: any[];
  payer: any;
  create_time: string;
  update_time: string;
  links: any[];
}

interface PaypalData {
  orderID: string;
  payerID: string;
  paymentID: string;
  billingToken: string | null;
  facilitatorAccessToken: string;
  paymentSource: string;
}

const email = "Voccaria <payments@mail.voccaria.com>";

const mailOptions = {
  from: email,
  to: ["voccaria@gmail.com", process.env.RAJI_EMAIL],
};

router.route("/").post(async function (request: Request, response: Response) {
  const { details, data }: { details: PaypalPaymentDetails; data: PaypalData } =
    request.body;

  console.log("Received payment details from frontend:");
  console.log("Details:", details);
  console.log("Data:", data);

  const emailReportFieldNames = {
    lessonName: "Lesson name",
    amount: "Amount",
    payer: "Bought by",
    payerEmail: "Payer email",
    paymentDate: "Payment date",
    paymentID: "Payment ID",
    paymentStatus: "Payment status",
  };

  const currencySymbols: { [key: string]: string } = {
    EUR: "€",
    USD: "$",
  };

  const paymentDate = new Date(details.create_time);
  const formattedPaymentDate = format(paymentDate, "d MMMM yyyy, h:mm:ss a");
  const lessonName = details.purchase_units[0].description;
  const amount = `${currencySymbols[details.purchase_units[0].amount.currency_code] || details.purchase_units[0].amount.currency_code}${parseFloat(details.purchase_units[0].amount.value).toFixed(2)}`;
  const payer = `${details.payer.name.given_name} ${details.payer.name.surname}`;

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
    fields: emailReportFieldNames,
    heading: `New paid lesson booking`,
  });

  try {
    const emailResponse = await resend.emails.send({
      ...mailOptions,
      subject: `New lesson booking: ${dataForEmail.lessonName} for ${dataForEmail.amount}`,
      ...emailHtml,
    });

    console.log("Payment notification email sent successfully:", emailResponse);

    response.status(200).json({
      success: true,
      message: "Payment details processed successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    response
      .status(500)
      .json({ success: false, message: "Failed to process payment details" });
  }
});

export default router;

// Paypal data object example
// const data = {
//   orderID: "79N38966PR267773T",
//   payerID: "PT2AK2YF866UE",
//   paymentID: "79N38966PR267773T",
//   billingToken: null,
//   facilitatorAccessToken:
//     "A21AAIMCY2Fm64-lJDFlPCxW6xF_E8flxySDSxDpSMITXVr5Nvl1X2eRrMrKdXMAxAV6DfFqBT4U1Js1bIGGil03ECwKrd7ew",
//   paymentSource: "paypal",
// };

// Paypal details object example
// const deatails = {
//   id: "8B61288923817153F",
//   intent: "CAPTURE",
//   status: "COMPLETED",
//   purchase_units: [
//     {
//       reference_id: "default",
//       amount: {
//         currency_code: "EUR",
//         value: "50.00",
//       },
//       payee: {
//         email_address: "sb-ydv4a24923894@business.example.com",
//         merchant_id: "G6CXNFV27Q4K4",
//       },
//       description:
//         "Written Recording Review + Custom Vocal Development Plan (Offline Written/Video Feedback, One-Time)",
//       soft_descriptor: "PAYPAL *TEST STORE TES",
//       shipping: {
//         name: {
//           full_name: "John Doe",
//         },
//         address: {
//           address_line_1: "Flat no. 507 Wing A Raheja Residency",
//           address_line_2: "Film City Road, Goregaon East",
//           admin_area_2: "Mumbai",
//           admin_area_1: "Maharashtra",
//           postal_code: "400097",
//           country_code: "IN",
//         },
//       },
//       payments: {
//         captures: [
//           {
//             id: "7VY99946JU156831H",
//             status: "COMPLETED",
//             amount: {
//               currency_code: "EUR",
//               value: "50.00",
//             },
//             final_capture: true,
//             disbursement_mode: "INSTANT",
//             seller_protection: {
//               status: "ELIGIBLE",
//               dispute_categories: [
//                 "ITEM_NOT_RECEIVED",
//                 "UNAUTHORIZED_TRANSACTION",
//               ],
//             },
//             settlement_details: {
//               settlement_account_id: "G6CXNFV27Q4K4",
//               settlement_party: "MERCHANT",
//             },
//             create_time: "2026-03-31T19:33:37Z",
//             update_time: "2026-03-31T19:33:37Z",
//           },
//         ],
//       },
//     },
//   ],
//   payer: {
//     name: {
//       given_name: "John",
//       surname: "Doe",
//     },
//     email_address: "sb-jrh04723937012@business.example.com",
//     payer_id: "PT2AK2YF866UE",
//     address: {
//       country_code: "IN",
//     },
//   },
//   create_time: "2026-03-31T19:29:51Z",
//   update_time: "2026-03-31T19:33:37Z",
//   links: [
//     {
//       href: "https://api.sandbox.paypal.com/v2/checkout/orders/8B61288923817153F",
//       rel: "self",
//       method: "GET",
//     },
//   ],
// };
