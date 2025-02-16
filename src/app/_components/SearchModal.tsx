"use client";

import { useEffect, useCallback } from "react";
import * as Command from "cmdk";
import { useSearch } from "../_context/SearchContext";
import useOutsideClick from "../_hooks/useOutsideClick";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { BlogPost, Category } from "@/models/blogInterfaces";
import { useRouter } from "next/navigation";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuText } from "react-icons/lu";

export default function SearchModal() {
  const {
    state: { isOpen, query, results },
    handleSearch,
    toggleSearch,
  } = useSearch();
  const modalRef = useOutsideClick<HTMLDivElement>(() => toggleSearch(false));
  const router = useRouter();

  // Memoized event handler to prevent unnecessary re-renders
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") toggleSearch(false);
    },
    [toggleSearch],
  );

  // Effect for handling keyboard events efficiently
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <Command.CommandDialog
      open={isOpen}
      onOpenChange={toggleSearch}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <DialogTitle className="sr-only">Blog Search</DialogTitle>
      <DialogDescription className="sr-only">
        This is Voccaria blog's search bar. What are you looking for?
      </DialogDescription>

      <div
        ref={modalRef}
        className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900"
      >
        <div className="relative">
          <Command.CommandInput
            value={query}
            onValueChange={handleSearch}
            placeholder="What are you looking for?"
            className="mb-7 w-full rounded-lg border border-slate-500 bg-slate-200 px-5 py-2.5 text-lg text-slate-600 outline-none placeholder:text-slate-500/80 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-slate-400/80"
          />
          <span
            onClick={() => toggleSearch(false)}
            className="absolute top-[50%] right-3 w-fit -translate-y-[27px] cursor-pointer rounded-sm border border-slate-400 bg-slate-200 px-2.5 py-1 text-xs font-bold text-slate-400 transition-colors group-hover:text-slate-500 hover:bg-slate-300 dark:bg-slate-700 group-hover:dark:text-slate-400 dark:hover:bg-slate-800"
          >
            Esc
          </span>
        </div>

        <Command.CommandList className="[&>div]:flex [&>div]:flex-col [&>div]:gap-1.5">
          {results.length > 0 ? (
            results.map((result: BlogPost & Category, index) => {
              const postUI = (
                <Command.CommandItem
                  key={index}
                  onSelect={() => {
                    router.push(`/blog/${result.slug}`);
                    toggleSearch(false);
                  }}
                  className="group cursor-pointer text-slate-700 dark:text-slate-100"
                >
                  <div className="flex items-baseline gap-3 rounded-md px-2 py-2 group-hover:bg-slate-200 dark:group-hover:bg-slate-700">
                    <LuText className="shrink-0 translate-y-0.5" />
                    <span>{result.title}</span>
                  </div>
                </Command.CommandItem>
              );

              const categoryUI = (
                <Command.CommandItem
                  key={index}
                  onSelect={() => {
                    router.push(`/blog/${result.firstPostSlug}`);
                    toggleSearch(false);
                  }}
                  className="group cursor-pointer text-slate-700 dark:text-slate-100"
                >
                  <div className="flex items-center gap-3 rounded-md px-2 py-2 group-hover:bg-slate-200 dark:group-hover:bg-slate-700">
                    <IoDocumentTextOutline
                      size={26}
                      className="-translate-y-0.5"
                    />
                    <span className="text-lg font-medium tracking-normal">
                      {result.title}
                    </span>
                  </div>
                </Command.CommandItem>
              );

              switch (result.typeOf) {
                case "post":
                  return postUI;
                case "category":
                  return categoryUI;
                default:
                  return postUI;
              }
            })
          ) : (
            <Command.CommandItem className="text-center text-slate-700 dark:text-slate-100">
              No results found.
            </Command.CommandItem>
          )}
        </Command.CommandList>
      </div>
    </Command.CommandDialog>
  );
}
