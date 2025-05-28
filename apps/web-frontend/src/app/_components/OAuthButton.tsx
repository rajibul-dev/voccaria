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
    <button className="w-full" type="button">
      <div
        className={`attractive-drop-shadow-sm flex cursor-pointer items-center justify-center gap-2 rounded-full border border-gray-800 bg-white px-4 py-2.5 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none ${className}`}
        onClick={onClick}
      >
        {icon}
        <span>{label}</span>
      </div>
    </button>
  );
}
