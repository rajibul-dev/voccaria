import BlogSidebar from "@/app/_components/BlogSidebar";
import HeaderHeightSync from "@/app/_components/HeaderHeightSync";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex h-full overflow-hidden">
        <HeaderHeightSync className="w-1/4">
          <aside className="h-full overflow-auto border-r-1 border-gray-200 bg-gray-50 text-white dark:border-r-2 dark:border-gray-800 dark:bg-gray-900">
            <BlogSidebar />
          </aside>
        </HeaderHeightSync>

        <HeaderHeightSync className="h-screen w-full overflow-auto">
          <main className="">{children}</main>
        </HeaderHeightSync>
      </div>
    </>
  );
}
