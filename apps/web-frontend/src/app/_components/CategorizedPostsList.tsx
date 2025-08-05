"use client";

import { useState } from "react";
import { useCategorizedPosts } from "./CategorizedPostsClient";
import Link from "next/link";
import { formatDateTime } from "@/_libs/dateFns";

const INITIAL_LIMIT = 5;
const LOAD_MORE_LIMIT = 10;

export default function CategorizedPostsList() {
  const { data } = useCategorizedPosts();
  const [visiblePostsByCategory, setVisiblePostsByCategory] = useState(
    data.map(({ category, posts }) => ({
      category,
      visibleCount: INITIAL_LIMIT,
      posts,
    })),
  );
  const [loading, setLoading] = useState(false);

  const handleLoadMore = (categorySlug: string) => {
    setLoading(true);
    setTimeout(() => {
      setVisiblePostsByCategory((prev) =>
        prev.map((cat) =>
          cat.category.slug === categorySlug
            ? { ...cat, visibleCount: cat.visibleCount + LOAD_MORE_LIMIT }
            : cat,
        ),
      );
      setLoading(false);
    }, 500); // Fake delay for smoother UI
  };

  const handleShowLess = (categorySlug: string) => {
    setVisiblePostsByCategory((prev) =>
      prev.map((cat) =>
        cat.category.slug === categorySlug
          ? { ...cat, visibleCount: INITIAL_LIMIT }
          : cat,
      ),
    );
  };

  if (!data.length) {
    return (
      <p className="text-center text-gray-500">No categorized posts found.</p>
    );
  }

  return (
    <>
      {visiblePostsByCategory.map(({ category, posts, visibleCount }) => {
        const hasPosts = posts.length > 0;
        const canLoadMore = visibleCount < posts.length;

        return (
          hasPosts && (
            <div key={category.slug} className="mb-12">
              {/* Category Title */}
              <h2 className="dark:text-my-pink-300 mb-8 text-3xl font-bold text-slate-600 max-sm:mb-6 max-sm:text-2xl">
                {category.title}
              </h2>

              {/* Posts List */}
              <ul className="flex flex-col items-center gap-5">
                {posts
                  .slice(0, visibleCount)
                  .map(({ title, smallDescription, slug, _id, _createdAt }) => (
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
                  ))}
              </ul>

              {/* Load More / Show Less Buttons */}
              {canLoadMore ? (
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => handleLoadMore(category.slug)}
                    disabled={loading}
                    className="me-2 mt-1 mb-2 cursor-pointer rounded-full border border-gray-200 bg-white px-10 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    {loading ? "Loading..." : "Load More"}
                  </button>
                </div>
              ) : posts.length > INITIAL_LIMIT ? (
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => handleShowLess(category.slug)}
                    className="me-2 mt-1 mb-2 cursor-pointer rounded-full border border-gray-200 bg-white px-10 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Show less
                  </button>
                </div>
              ) : null}
            </div>
          )
        );
      })}
    </>
  );
}
