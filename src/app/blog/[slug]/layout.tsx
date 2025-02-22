import BlogSidebar from "@/app/_components/BlogSidebar";
import HeaderHeightSync from "@/app/_components/HeaderHeightSync";
import { DisableBodyScroll } from "@/app/_hooks/useDisableBodyScroll";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <DisableBodyScroll />
      <div className="flex h-full overflow-hidden">
        <HeaderHeightSync className="w-105 max-md:hidden">
          <aside className="h-full overflow-auto border-r-1 border-gray-200 bg-gray-50 text-white dark:border-r-2 dark:border-gray-800 dark:bg-gray-900">
            <BlogSidebar />
          </aside>
        </HeaderHeightSync>

        <HeaderHeightSync className="h-dvh w-full overflow-auto">
          <main className="md:px-6">{children}</main>
        </HeaderHeightSync>
      </div>
    </>
  );
}
