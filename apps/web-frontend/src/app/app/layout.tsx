import clsx from "clsx";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`grid h-screen grid-cols-[260px_1fr] grid-rows-[auto_1fr] overflow-hidden border-gray-300 [grid-template-areas:'header_header'_'sidebar_content'] dark:border-gray-800`}
    >
      <header
        className={`h-18 border-b border-inherit bg-white [grid-area:header] max-xl:h-16.5 max-sm:h-14.5 dark:bg-gray-800`}
      >
        Header
      </header>
      <aside
        className={`border-r border-inherit bg-white [grid-area:sidebar] dark:bg-gray-800`}
      >
        Sidebar
      </aside>

      <div className={`overflow-y-auto [grid-area:content]`}>
        <main className={clsx(``, "h-400")}>{children}</main>
        <footer className="border-t border-gray-300 dark:border-gray-800">
          Footer
        </footer>
      </div>
    </div>
  );
}
