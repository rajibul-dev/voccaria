"use client";

export default function OAuthButton({
  icon,
  label,
  onClick = () => {},
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button onClick={onClick} className="w-full">
      <div
        className={`flex cursor-pointer items-center justify-center gap-2 rounded-full border border-gray-800 bg-white px-4 py-2.5 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none dark:border-gray-500 dark:bg-gray-700 dark:text-gray-50 dark:hover:bg-gray-600 ${className}`}
      >
        {icon}
        <span>{label}</span>
      </div>
    </button>
  );
}
