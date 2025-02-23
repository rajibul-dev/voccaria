export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="flex items-center justify-center bg-gray-300 py-4 dark:bg-gray-700">
      <p className="text-base font-medium text-slate-600 dark:text-slate-300">
        © {year} Voccaria. All rights reserved.
      </p>
    </footer>
  );
}
