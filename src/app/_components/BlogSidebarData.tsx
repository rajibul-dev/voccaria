import { useSidebar } from "@/app/_context/SidebarContext";
import BlogSideDrawer from "./BlogSideDrawer";

export default function BlogSidebarData() {
  const { data, loading } = useSidebar();

  if (loading) {
    return <p className="px-4 text-gray-400">Loading categories...</p>;
  }

  return <BlogSideDrawer data={data} />;
}
