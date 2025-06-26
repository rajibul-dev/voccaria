"use client";
import { expressBackendBaseRESTOrigin } from "@/_constants/backendOrigins";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FancyInput from "./FancyInput";

export default function ResetPasswordForm() {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!email && !token) {
      toast.error("No email or token provided");
      console.error("No email or token provided");
      return;
    }

    if (!email) {
      toast.error("No email provided");
      console.error("No email provided");
      return;
    }

    if (!token) {
      toast.error("No token provided");
      console.error("No token provided");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      console.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    fetch(`${expressBackendBaseRESTOrigin}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, email, password: newPassword }),
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log(jsonResponse.data);
        toast.success(
          jsonResponse?.data?.message || "Password changed successfully!",
        );
        router.push("/auth/login");
      })
      .catch((error) => {
        toast.error(
          error.message || "An error occurred while resetting the password",
        );
        console.error(error);
      });

    setIsLoading(false);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");
    const emailFromUrl = urlParams.get("email");

    if (!tokenFromUrl && !emailFromUrl) {
      toast.error("No token or email found in the URL");
      console.error("No token or email found in the URL");
      return;
    }

    if (emailFromUrl) {
      setEmail(emailFromUrl);
    } else {
      toast.error("No email found in the URL");
      console.error("No email found in the URL");
    }

    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      toast.error("No token found in the URL");
      console.error("No token found in the URL");
    }
  }, []);

  return (
    <form
      className="mx-auto flex max-w-md flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <FancyInput
        value={newPassword}
        onChange={setNewPassword}
        name="password"
        type="password"
        required
      >
        New Password
      </FancyInput>

      <FancyInput
        name="confirm-password"
        type="password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        required
      >
        Confirm New Password
      </FancyInput>

      <button
        type="submit"
        className="manual-auth-btn attractive-text-shadow w-full disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
}
