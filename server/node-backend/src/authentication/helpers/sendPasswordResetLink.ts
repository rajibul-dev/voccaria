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
    await resend.emails.send({
      from: "Voccaria <no-reply@voccaria.com>",
      to: email,
      subject: "Link to reset your password",
      react: PasswordResetLink({ name, passwordLink }),
    });
  } catch (error) {
    console.error("Error sending password reset link:", error);
    throw new Error("Failed to send password reset link. Please try again.");
  }
}
