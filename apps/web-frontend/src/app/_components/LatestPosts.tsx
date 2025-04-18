import { formatDateTime } from "@/lib/dateFns";
import {
  getPaginatedBlogPosts,
  getTotalBlogPostsCount,
} from "@/lib/sanityFetchers";
import Link from "next/link";
import LoadMoreButton from "./LoadMoreButton";

const INITIAL_LIMIT = 5;

export default async function LatestPosts() {
  const posts = await getPaginatedBlogPosts(0, INITIAL_LIMIT);
  const totalPosts = await getTotalBlogPostsCount();

  return (
    <ul className="flex flex-col items-center gap-5">
      {posts.map(
        ({ title, smallDescription, slug, _id, _createdAt, ofCategory }) => (
          <li className="w-full" key={_id}>
            <Link
              href={`/blog/${slug}`}
              className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-gray-100 p-6 shadow-sm hover:bg-gray-200 max-sm:px-3 max-sm:py-5 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <h3 className="text-2xl leading-9 font-bold text-slate-500 max-sm:text-xl max-sm:leading-7.5 dark:text-gray-100">
                {title}
              </h3>
              <p className="line-clamp-4 font-normal text-gray-700 dark:text-gray-300">
                {smallDescription}
              </p>
              <div className="mt-1 flex text-sm font-medium text-gray-500 dark:text-gray-400">
                <time>{formatDateTime(_createdAt)}</time>
                {ofCategory && <span>&nbsp;• {ofCategory.title}</span>}
              </div>
            </Link>
          </li>
        ),
      )}

      {totalPosts > INITIAL_LIMIT && (
        <LoadMoreButton initialLimit={INITIAL_LIMIT} totalPosts={totalPosts} />
      )}
    </ul>
  );
}
