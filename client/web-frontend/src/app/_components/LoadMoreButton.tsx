"use client";

import { useState } from "react";
import { getPaginatedBlogPosts } from "@/_libs/sanityFetchers";
import { BlogPost } from "@/_models/blogInterfaces";
import Link from "next/link";
import { formatDateTime } from "@/_libs/dateFns";

// Define the prop type
interface LoadMoreButtonProps {
  initialLimit: number;
  totalPosts: number;
}

const LOAD_LIMIT = 10;

export default function LoadMoreButton({
  initialLimit,
  totalPosts,
}: LoadMoreButtonProps) {
  const [loadMoreStep, setLoadMoreStep] = useState(0);
  const [clientRenderedPosts, setClientRenderedPosts] = useState<BlogPost[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const postIndexToLoadFrom =
    loadMoreStep === 0
      ? initialLimit
      : loadMoreStep * LOAD_LIMIT + initialLimit;
  const canLoadMore = postIndexToLoadFrom < totalPosts;

  const loadMore = async () => {
    setLoading(true);

    try {
      const newPosts = await getPaginatedBlogPosts(
        postIndexToLoadFrom,
        LOAD_LIMIT,
      );
      setClientRenderedPosts((prev) => [...prev, ...newPosts]);
      setLoadMoreStep((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching more posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoadMoreStep(0);
    setClientRenderedPosts([]);
  };

  return (
    <>
      {clientRenderedPosts.length
        ? clientRenderedPosts.map(
            ({
              title,
              smallDescription,
              slug,
              _id,
              _createdAt,
              ofCategory,
            }) => (
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
                    <span>{formatDateTime(_createdAt)}</span>
                    {ofCategory && <span>&nbsp;• {ofCategory.title}</span>}
                  </div>
                </Link>
              </li>
            ),
          )
        : null}

      {canLoadMore ? (
        <button
          onClick={loadMore}
          disabled={loading}
          className="me-2 mt-1 mb-2 cursor-pointer rounded-full border border-gray-200 bg-white px-10 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      ) : totalPosts > initialLimit ? (
        <button
          onClick={reset}
          disabled={loading}
          className="me-2 mt-1 mb-2 cursor-pointer rounded-full border border-gray-200 bg-white px-10 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Show less
        </button>
      ) : null}
    </>
  );
}
