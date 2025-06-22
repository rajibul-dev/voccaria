import ResetPasswordForm from "@/app/_components/ResetPasswordForm";

export default function page() {
  return (
    <div className="w-full">
      <h1 className="mb-8 text-center text-3xl font-bold text-slate-800 max-sm:text-2xl dark:text-slate-200">
        Reset password
      </h1>
      <section className="w-full">
        <ResetPasswordForm />
      </section>
    </div>
  );
}
