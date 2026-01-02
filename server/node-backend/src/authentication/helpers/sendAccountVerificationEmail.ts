import { resend } from "../../core/libs/resend.js";
import EmailVerificationTemplate from "../emails/emailVerification.js";

interface SendVerificationEmailInterface {
  email: string;
  name: string;
  verificationLink: string;
}

export async function sendAccountVerificationEmail({
  email,
  name,
  verificationLink,
}: SendVerificationEmailInterface) {
  try {
    const result = await resend.emails.send({
      from: "Voccaria <hello@voccaria.com>",
      to: [email],
      subject: "Verify your email address",
      react: EmailVerificationTemplate({ name, verificationLink }),
    });

    console.log("📧 Resend result:", result);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email. Please try again.");
  }
}
