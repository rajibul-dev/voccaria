"use client";

import { BlogPost, Category } from "@/models/blogInterfaces";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BlogSideDrawerProps {
  data: { category: Category; posts: BlogPost[] }[];
}

export default function BlogSideDrawer({ data }: BlogSideDrawerProps) {
  const [openCategories, setOpenCategories] = useState<{
    [key: string]: boolean;
  }>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("openCategories") || "{}");
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem("openCategories", JSON.stringify(openCategories));
  }, [openCategories]);

  const toggleCategory = (slug: string) => {
    setOpenCategories((prev) => {
      const newState = { ...prev, [slug]: !prev[slug] };
      localStorage.setItem("openCategories", JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <nav className="flex flex-col px-4">
      {data.map(({ category, posts }) => (
        <div key={category.slug}>
          {/* Category Header */}
          <button
            className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left font-medium hover:bg-gray-800"
            onClick={() => toggleCategory(category.slug)}
          >
            {category.title}
            {openCategories[category.slug] ? <span>▲</span> : <span>▼</span>}
          </button>

          {/* Posts inside category */}
          {openCategories[category.slug] && posts.length > 0 && (
            <ul className="mt-1 ml-4">
              {posts.map((post) => (
                <li key={post.slug} className="text-sm">
                  <Link
                    href={`/blog/${post.slug}`}
                    shallow
                    className="block rounded-md px-3 py-1 hover:bg-gray-700"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </nav>
  );
}
