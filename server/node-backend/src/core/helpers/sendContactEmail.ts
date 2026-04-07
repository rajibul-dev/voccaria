import { resend } from "../libs/resend.js";
import generateFieldBasedEmailHtml from "./generateFieldBasedEmailHtml.js";

const email = "Voccaria <messages@mail.voccaria.com>";

const mailOptions = {
  from: email,
  to: ["voccaria@gmail.com", process.env.RAJI_EMAIL].filter(
    (addr): addr is string => addr !== undefined,
  ),
};

const CONTACT_MESSAGE_FIELDS = {
  name: "Name",
  email: "Email",
  subject: "Subject",
  message: "Message",
};

export async function sendContactEmail(data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) {
  try {
    const info = await resend.emails.send({
      ...mailOptions,
      ...generateFieldBasedEmailHtml({ data, fields: CONTACT_MESSAGE_FIELDS }),
      ...(data.subject && { subject: data.subject }),
    } as Parameters<typeof resend.emails.send>[0]);

    console.log("📧 Resend result:", info);
    return info;
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email. Please try again.");
  }
}
