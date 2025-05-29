import GoogleOAuthButton from "@/app/_components/GoogleOAuthButton";
import LoginFormEmailPassword from "@/app/_components/LoginFormEmailPassword";
import OrDivider from "@/app/_components/OrDivider";
import SignupFormEmailPassword from "@/app/_components/SignupFormEmailPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account to access the Voccaria platform.",
  keywords: ["signup", "register", "create account", "new user"],
};

export default function Page() {
  return (
    <div className="w-full">
      <h1 className="mb-8 text-center text-3xl font-bold text-slate-800 dark:text-slate-200">
        Create your account
      </h1>
      <section>
        <GoogleOAuthButton />
        <OrDivider />
        <SignupFormEmailPassword />
      </section>
    </div>
  );
}
