import GoogleOAuthButton from "@/app/_components/GoogleOAuthButton";
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
      <h1 className="mb-8 text-center text-3xl font-bold text-slate-800 max-sm:text-2xl dark:text-slate-200">
        Create your account
      </h1>
      <section className="w-full">
        <GoogleOAuthButton />
        <OrDivider />
        <SignupFormEmailPassword />
      </section>
    </div>
  );
}
