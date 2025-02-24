export default function OldFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="flex items-center justify-center bg-gray-300 py-7">
      <p className="text-2xl font-medium text-slate-600">
        © {year} Voccaria. All rights reserved.
      </p>
    </footer>
  );
}
