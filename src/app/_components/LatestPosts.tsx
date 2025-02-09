import { getAllBlogPosts } from "@/lib/sanityFetchers";

export default async function LatestPosts() {
  const posts = await getAllBlogPosts();
  console.log(posts);
  return <></>;
}
