import { NextResponse } from "next/server";
import { resend } from "@/server/email/resend";
import generateFieldBasedEmailHtml from "@/server/email/generateFieldBasedEmailHtml";

const CONTACT_MESSAGE_FIELDS = {
  name: "Name",
  email: "Email",
  subject: "Subject",
  message: "Message",
};

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data?.name || !data?.email || !data?.message) {
      return NextResponse.json(
        { success: false, message: "Bad request" },
        { status: 400 },
      );
    }

    const name = String(data.name).trim();
    const email = String(data.email).trim();
    const message = String(data.message).trim();
    const subject = typeof data.subject === "string" ? data.subject.trim() : "";

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Bad request" },
        { status: 400 },
      );
    }

    const to = [
      // "voccaria@gmail.com",
      process.env.RAJI_EMAIL,
    ].filter((address): address is string => Boolean(address));

    const mailOptions = {
      from: "Voccaria <messages@mail.voccaria.com>",
      to,
      ...generateFieldBasedEmailHtml({
        data: {
          name,
          email,
          ...(subject && { subject }),
          message,
        },
        fields: CONTACT_MESSAGE_FIELDS,
      }),
      ...(subject && { subject }),
    };

    const result = await resend.emails.send(mailOptions);

    console.log("📧 Contact email sent:", result);

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Error sending contact email:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message",
      },
      { status: 500 },
    );
  }
}
