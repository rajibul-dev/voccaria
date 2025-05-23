"use client";

import { useSearch } from "../_context/SearchContext";

export default function BlogSearchBar() {
  const { toggleSearch } = useSearch();

  return (
    <div
      className="group grow [@media(max-width:27em)]:grow-0"
      onClick={() => toggleSearch(true)}
    >
      <div className="mx-auto flex w-full cursor-pointer items-center overflow-hidden rounded-md border-2 border-slate-400 bg-slate-100 px-4 py-2.5 transition-colors group-hover:border-slate-500 max-sm:border-1 dark:border-slate-600 dark:bg-slate-800 group-hover:dark:border-slate-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 192.904 192.904"
          width="16px"
          className="mr-3.5 w-5.5 fill-slate-400 transition-colors group-hover:fill-slate-300 max-sm:w-4.5 dark:fill-slate-500 group-hover:dark:fill-slate-400"
        >
          <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
        </svg>
        <div className="">
          <span className="[@media line-clamp-1 text-lg text-slate-400 transition-colors group-hover:text-slate-400 max-sm:text-base dark:text-slate-500">
            Search blog posts
          </span>
        </div>
        <span className="me-2 ml-auto w-fit rounded-sm bg-slate-200 px-2.5 py-1 text-xs font-bold text-slate-400 transition-colors group-hover:text-slate-500 max-sm:hidden dark:bg-slate-700 group-hover:dark:text-slate-400">
          CTRL+K
        </span>
      </div>
    </div>
  );
}
