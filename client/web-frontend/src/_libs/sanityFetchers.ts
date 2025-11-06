import { BlogPost, Category } from "@/_models/blogInterfaces";
import { client } from "./sanityClient";
import * as queries from "./sanityQueries";
import { cache } from "react";

// Fetch all blog posts
export const getAllBlogPosts = cache(async (): Promise<BlogPost[]> => {
  return await client.fetch<BlogPost[]>(queries.ALL_BLOG_POSTS);
});

// Fetch paginated blog posts
export const getPaginatedBlogPosts = cache(
  async (start = 0, limit = 10): Promise<BlogPost[]> => {
    return await client.fetch(queries.ALL_BLOG_POSTS_PAGINATED(start, limit));
  },
);

// Fetch posts in a category sorted by index
export const getPostsInCategoryByIndex = cache(
  async (categorySlug: string): Promise<BlogPost[]> => {
    return await client.fetch(
      queries.POSTS_IN_CATEGORY_SORTBY_INDEX(categorySlug),
    );
  },
);

// Fetch posts in a category sorted by creation time
export const getPostsInCategoryByTimeAsc = cache(
  async (categorySlug: string): Promise<BlogPost[]> => {
    return await client.fetch(
      queries.POSTS_IN_CATEGORY_SORTBY_TIME_ASC(categorySlug),
    );
  },
);

// Fetch a single post by slug
export const getPost = cache(async (slug: string): Promise<BlogPost> => {
  return await client.fetch<BlogPost>(queries.GET_POST(slug));
});

// Get total post count
export const getTotalBlogPostsCount = cache(async (): Promise<number> => {
  return await client.fetch(queries.TOTAL_BLOG_POSTS_COUNT);
});

// Fetch all blog posts for search
export const getAllBlogPostsForSearch = cache(async () => {
  return await client.fetch(queries.ALL_BLOG_POSTS_FOR_SEARCH);
});

// Fetch all categories
export const getAllCategories = cache(async (): Promise<Category[]> => {
  return await client.fetch(queries.GET_ALL_CATEGORIES);
});

// Fetch the first post slug of a category
export const getFirstPostSlugOfCategory = cache(
  async (category: string): Promise<string> => {
    return await client.fetch(
      queries.GET_FIRST_POST_SLUG_OF_CATEGORY(category),
    );
  },
);

// Fetch the first post of the first category
export const getFirstPostOfFirstCategory = cache(async (): Promise<string> => {
  return await client.fetch(queries.GET_FIRST_POST_OF_FIRST_CATEGORY);
});
