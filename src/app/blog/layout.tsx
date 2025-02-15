import { getAllBlogPostsForSearch } from "@/lib/sanityFetchers";
import { SearchProvider } from "../_context/SearchContext";
import SearchModal from "../_components/SearchModal";

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getAllBlogPostsForSearch();

  return (
    <SearchProvider data={data}>
      {children}
      <SearchModal />
    </SearchProvider>
  );
}
