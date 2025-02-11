import BlogSidebar from "@/app/_components/BlogSidebar";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <aside className="bg-gray-600 pt-27 text-white">
        <BlogSidebar />
      </aside>
      <main className="pt-27">{children}</main>
    </div>
  );
}
