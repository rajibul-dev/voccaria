import { BlogPost } from "@/models/blogInterfaces";
import { client } from "./sanityClient";
import * as queries from "./sanityQueries";

// Fetch all blog posts
export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  return await client.fetch<BlogPost[]>(queries.ALL_BLOG_POSTS);
};

// Fetch paginated blog posts
export const getPaginatedBlogPosts = async (
  start = 0,
  limit = 10,
): Promise<BlogPost[]> => {
  return await client.fetch(queries.ALL_BLOG_POSTS_PAGINATED(start, limit));
};

// Fetch posts in a category sorted by index
export const getPostsInCategoryByIndex = async (
  categorySlug: string,
): Promise<BlogPost[]> => {
  return await client.fetch(
    queries.POSTS_IN_CATEGORY_SORTBY_INDEX(categorySlug),
  );
};

// Fetch posts in a category sorted by creation time
export const getPostsInCategoryByTimeAsc = async (
  categorySlug: string,
): Promise<BlogPost[]> => {
  return await client.fetch(
    queries.POSTS_IN_CATEGORY_SORTBY_TIME_ASC(categorySlug),
  );
};

// Fetch a single post by slug
export const getPost = async (slug: string): Promise<BlogPost> => {
  return await client.fetch<BlogPost>(queries.GET_POST(slug));
};

// Get total post count
export const getTotalBlogPostsCount = async (): Promise<number> => {
  return await client.fetch(queries.TOTAL_BLOG_POSTS_COUNT);
};
