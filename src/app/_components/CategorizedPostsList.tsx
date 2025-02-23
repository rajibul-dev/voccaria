"use client";

import { useCategorizedPosts } from "./CategorizedPostsClient";
import Link from "next/link";
import { formatDateTime } from "@/lib/dateFns";

export default function CategorizedPostsList() {
  const { data } = useCategorizedPosts();

  if (!data.length)
    return (
      <p className="text-center text-gray-500">No categorized posts found.</p>
    );

  return (
    <>
      {data.map(({ category, posts }) => {
        const hasPosts = posts.length > 0;

        if (hasPosts)
          return (
            <div key={category.slug} className="mb-12">
              {/* Category Title */}
              <h2 className="dark:text-my-pink-300 mb-8 text-3xl font-bold text-slate-600 max-sm:mb-4 max-sm:text-2xl">
                {category.title}
              </h2>

              {/* Posts List */}
              <ul className="flex flex-col items-center gap-5">
                {posts.map(
                  ({ title, smallDescription, slug, _id, _createdAt }) => (
                    <li key={_id} className="w-full">
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
                          <time dateTime={_createdAt}>
                            {formatDateTime(_createdAt)}
                          </time>
                        </div>
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          );
      })}
    </>
  );
}
