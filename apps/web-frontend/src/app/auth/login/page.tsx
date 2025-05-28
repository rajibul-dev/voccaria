import FancyInput from "@/app/_components/FancyInput";
import GoogleOAuthButton from "@/app/_components/GoogleOAuthButton";
import LoginFormEmailPassword from "@/app/_components/LoginFormEmailPassword";
import OrDivider from "@/app/_components/OrDivider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="w-full">
      <h1 className="mb-8 text-center text-3xl font-bold text-slate-800 dark:text-slate-200">
        Login to your account
      </h1>
      <section>
        <GoogleOAuthButton />
        <OrDivider />
        <LoginFormEmailPassword />
      </section>
    </div>
  );
}
