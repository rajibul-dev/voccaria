"use client";

import { BlogPost, Category } from "@/models/blogInterfaces";
import clsx from "clsx";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";

interface BlogSideDrawerProps {
  data: { category: Category; posts: BlogPost[] }[];
  isMobile?: boolean;
  toggleDrawer?: any;
}

export default function BlogSideDrawer({
  data,
  isMobile = false,
  toggleDrawer,
}: BlogSideDrawerProps) {
  const [openCategories, setOpenCategories] = useState<{
    [key: string]: boolean;
  }>(() => {
    if (typeof window !== "undefined") {
      const storedState = localStorage.getItem("openCategories");
      if (storedState) return JSON.parse(storedState);
    }
    // Default all categories to open
    return Object.fromEntries(
      data.map(({ category }) => [category.slug, true]),
    );
  });

  const router = useRouter();
  const params = useParams();
  const currentSlug = params?.slug;

  const handleNavigation = (slug: string) => {
    if (isMobile && toggleDrawer) {
      toggleDrawer(); // Close drawer first
      router.push(`/blog/${slug}`);
    } else {
      router.push(`/blog/${slug}`);
    }
  };

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
    <nav className="flex flex-col gap-3 px-4">
      {data.map(({ category, posts }) => (
        <div key={category.slug}>
          {/* Category Header */}
          <button
            className="flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-2 text-left text-sm font-bold tracking-wide text-slate-600 uppercase [word-spacing:3pt] hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            onClick={() => toggleCategory(category.slug)}
          >
            {category.title}
            {openCategories[category.slug] ? (
              <FaChevronDown size={14} className="-translate-y-[0.2px]" />
            ) : (
              <FaChevronRight size={14} className="-translate-y-[0.2px]" />
            )}
          </button>

          {/* Posts inside category */}
          {openCategories[category.slug] && posts.length > 0 && (
            <ul className="flex w-full flex-col">
              {posts.map((post) => (
                <li key={post.slug}>
                  <button
                    onClick={() => handleNavigation(post.slug)}
                    className={clsx(
                      "block w-full cursor-pointer rounded-md py-2 pr-2 pl-4 text-left text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-slate-100",
                      {
                        "bg-slate-200 text-slate-900! hover:bg-slate-200 hover:text-slate-900! dark:bg-slate-700! dark:text-slate-50! dark:hover:bg-slate-700! dark:hover:text-slate-50!":
                          currentSlug === post.slug,
                      },
                    )}
                  >
                    {post.title}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </nav>
  );
}
