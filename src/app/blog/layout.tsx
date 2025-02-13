import { getAllBlogPostsForSearch } from "@/lib/sanityFetchers";
import { SearchProvider } from "../_context/SearchContext";

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getAllBlogPostsForSearch();

  return <SearchProvider data={data}>{children}</SearchProvider>;
}
