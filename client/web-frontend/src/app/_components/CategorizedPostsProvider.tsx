import {
  getAllCategories,
  getPostsInCategoryByIndex,
} from "@/_libs/sanityFetchers";
import { CategorizedPostsClient } from "./CategorizedPostsClient";

export default async function CategorizedPostsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    // Fetch categories and associated posts on the server
    const categories = await getAllCategories();
    const categorizedPosts = await Promise.all(
      categories.map(async (category) => {
        const posts = await getPostsInCategoryByIndex(category.slug);
        return { category, posts };
      }),
    );

    return (
      <CategorizedPostsClient data={categorizedPosts}>
        {children}
      </CategorizedPostsClient>
    );
  } catch (error) {
    console.error("Error fetching categorized posts:", error);
    return <>{children}</>; // Fail gracefully
  }
}
