"use client";

import { useSearch } from "../_context/SearchContext";

export default function BlogSearchBarOnNav() {
  const { toggleSearch } = useSearch();

  return (
    <div
      className="group w-80 max-md:w-auto max-md:whitespace-nowrap"
      onClick={() => toggleSearch(true)}
    >
      <div className="mx-auto flex cursor-pointer items-center overflow-hidden rounded-md border-2 border-slate-200 bg-slate-100 px-4 py-1 transition-colors group-hover:border-slate-300 max-sm:border-none max-sm:bg-transparent max-sm:p-2 max-sm:hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 group-hover:dark:border-slate-500 dark:max-sm:bg-transparent max-sm:hover:dark:bg-slate-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 192.904 192.904"
          width="16px"
          className="mr-3.5 w-4 fill-slate-400 transition-colors group-hover:fill-slate-400 max-sm:mr-0 max-sm:w-5.5 max-sm:fill-slate-600 max-sm:group-hover:fill-slate-600 dark:fill-slate-500 group-hover:dark:fill-slate-400 dark:max-sm:fill-slate-200 max-sm:group-hover:dark:fill-slate-200"
        >
          <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
        </svg>
        <div className="max-sm:hidden">
          <span className="text-base text-slate-400 transition-colors group-hover:text-slate-400 max-sm:text-base dark:text-slate-500">
            Search blog posts
          </span>
        </div>
        <span className="ml-auto w-fit rounded-sm bg-transparent px-1.5 py-0.5 text-xs font-bold text-slate-400 transition-colors group-hover:text-slate-400 max-md:hidden dark:bg-slate-700 group-hover:dark:text-slate-400">
          CTRL+K
        </span>
      </div>
    </div>
  );
}
