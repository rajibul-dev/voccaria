import GoogleOAuthButton from "@/app/_components/GoogleOAuthButton";
import LoginFormEmailPassword from "@/app/_components/LoginFormEmailPassword";
import OrDivider from "@/app/_components/OrDivider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Access your Voccaria account to continue exploring.",
  keywords: ["login", "sign in", "access account", "existing user"],
};

export default function Page() {
  return (
    <div className="w-full">
      <h1 className="mb-8 text-center text-3xl font-bold text-slate-800 max-sm:text-2xl dark:text-slate-200">
        Login to your account
      </h1>
      <section className="w-full">
        <GoogleOAuthButton />
        <OrDivider />
        <LoginFormEmailPassword />
      </section>
    </div>
  );
}
