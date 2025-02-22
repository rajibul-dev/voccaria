import { useSidebar } from "@/app/_context/SidebarContext";
import BlogSideDrawer from "./BlogSideDrawer";

export default function BlogSidebarData() {
  const { data, loading } = useSidebar();

  if (loading) {
    return <p className="text-gray-400">Loading categories...</p>;
  }

  return <BlogSideDrawer data={data} />;
}
