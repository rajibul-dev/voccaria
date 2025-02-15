"use client";
import { useEffect, useCallback } from "react";
import * as Command from "cmdk";
import { useSearch } from "../_context/SearchContext";
import useOutsideClick from "../_hooks/useOutsideClick";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

export default function SearchModal() {
  const { state, handleSearch, toggleSearch } = useSearch();
  const modalRef = useOutsideClick<HTMLDivElement>(() => toggleSearch(false));

  // Memoize keydown handler to prevent re-renders
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") toggleSearch(false);
    },
    [toggleSearch],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <Command.CommandDialog
      open={state.isOpen}
      onOpenChange={toggleSearch}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <DialogTitle className="sr-only">Blog Search</DialogTitle>
      <DialogDescription className="sr-only">
        This is Voccaria blog's search bar. What are you looking for?
      </DialogDescription>

      <div
        className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900"
        ref={modalRef}
      >
        <div className="relative">
          <Command.CommandInput
            value={state.query}
            onValueChange={handleSearch}
            placeholder="What are you looking for?"
            className="mb-5 w-full rounded-lg border border-slate-500 bg-slate-200 px-5 py-2.5 text-lg text-slate-600 outline-none placeholder:text-slate-500/80 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-slate-400/80"
          />
          <span
            className="absolute top-[50%] right-3 w-fit -translate-y-[90%] cursor-pointer rounded-sm border border-slate-400 bg-slate-200 px-2.5 py-1 text-xs font-bold text-slate-400 transition-colors group-hover:text-slate-500 hover:bg-slate-300 dark:bg-slate-700 group-hover:dark:text-slate-400 dark:hover:bg-slate-800"
            onClick={() => toggleSearch(false)}
          >
            Esc
          </span>
        </div>

        <Command.CommandList>
          {state.results.length > 0 ? (
            state.results.map((post, index) => (
              <Command.CommandItem
                key={index}
                onSelect={() => (window.location.href = `/blog/${post.slug}`)}
                className="group cursor-pointer text-slate-700 dark:text-slate-100"
              >
                <div className="rounded-md px-2 py-2 group-hover:bg-slate-200 dark:group-hover:bg-slate-700">
                  {post.title}
                </div>
              </Command.CommandItem>
            ))
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
