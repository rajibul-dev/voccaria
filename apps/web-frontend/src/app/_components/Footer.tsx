import TwoLogosAndSlash from "./TwoLogosAndSlash";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-300 py-8 dark:bg-gray-700">
      <div className="grid grid-cols-3 items-center justify-center px-3">
        <div className="flex flex-col gap-3 border-b border-b-gray-700 pb-2">
          <TwoLogosAndSlash />
          <p className="text-end text-gray-700">
            © {year} Voccaria. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
