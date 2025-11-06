export default function Spinner() {
  return (
    <div
      className="mx-auto flex h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-slate-600 motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-gray-100"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !border-0 !p-0 !whitespace-nowrap ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
}
