import BlogSidebar from "@/app/_components/BlogSidebar";
import BlogSidebarScrollManager from "@/app/_components/BlogSidebarScrollManager";
import Footer from "@/app/_components/Footer";
import HeaderHeightSync from "@/app/_components/HeaderHeightSync";
import { DisableBodyScroll } from "@/app/_hooks/useDisableBodyScroll";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <DisableBodyScroll />
      <div className="flex h-full overflow-hidden">
        <HeaderHeightSync className="w-105 max-md:hidden">
          <aside
            className="h-full overflow-auto border-r-1 border-gray-200 bg-gray-50 text-white dark:border-r-2 dark:border-gray-800 dark:bg-gray-900"
            id="blogSidebar"
          >
            <BlogSidebar />
            <BlogSidebarScrollManager sidebarId="blogSidebar" />
          </aside>
        </HeaderHeightSync>

        <HeaderHeightSync className="flex h-dvh w-full flex-col overflow-auto">
          <main className="mb-auto pb-6 max-sm:pb-0 md:px-3">{children}</main>
          <Footer />
        </HeaderHeightSync>
      </div>
    </>
  );
}
