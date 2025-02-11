import BlogSidebar from "@/app/_components/BlogSidebar";
import HeaderHeightSync from "@/app/_components/HeaderHeightSync";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex h-full overflow-hidden">
        <HeaderHeightSync className="">
          <aside className="h-full bg-gray-500 text-white">
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
