import ForgotPasswordForm from "@/app/_components/ForgotPasswordForm";

export default function page() {
  return (
    <div className="w-full">
      <h1 className="mb-4 text-center text-3xl font-bold text-slate-800 max-sm:text-2xl dark:text-slate-200">
        Forgot Password
      </h1>
      <section className="w-full">
        <p className="mb-6 text-center text-gray-700 dark:text-gray-300">
          Please enter your email address to receive a password reset link.
        </p>
        <ForgotPasswordForm />
      </section>
    </div>
  );
}
