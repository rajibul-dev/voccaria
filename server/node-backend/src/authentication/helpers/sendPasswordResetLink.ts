import PasswordResetLink from "../emails/PasswordResetLink.js";
import { resend } from "../../core/libs/resend.js";

interface SendPasswordResetLinkInterface {
  email: string;
  name: string;
  passwordLink: string;
}

export async function sendPasswordResetLink({
  email,
  name,
  passwordLink,
}: SendPasswordResetLinkInterface) {
  try {
    const result = await resend.emails.send({
      from: "Voccaria <no-reply@voccaria.com>",
      to: [email],
      subject: "Link to reset your password",
      react: PasswordResetLink({ name, passwordLink }),
    });

    console.log("📧 Resend result:", result);
  } catch (error) {
    console.error("Error sending password reset link:", error);
    throw new Error("Failed to send password reset link. Please try again.");
  }
}
