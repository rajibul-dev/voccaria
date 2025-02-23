"use client";

import { BlogPost, Category } from "@/models/blogInterfaces";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import * as Command from "cmdk";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { BsFileEarmarkText } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuText } from "react-icons/lu";
import { useSearch } from "../_context/SearchContext";
import useOutsideClick from "../_hooks/useOutsideClick";

// Define the shape for section matches
type MatchesObject = {
  heading?: string;
  text?: string;
};

function extractMatch(query: string, result: any): MatchesObject | null {
  if (!query || !result || !result.sections) return null;
  const matches: MatchesObject = {};

  // Check each section heading for a match
  for (const section of result.sections) {
    if (
      section.heading &&
      section.heading.toLowerCase().includes(query.toLowerCase())
    ) {
      matches.heading = section.heading;
    }
  }

  // Check section texts
  for (const section of result.sections) {
    if (section.text) {
      const index = section.text.toLowerCase().indexOf(query.toLowerCase());
      if (index !== -1) {
        const snippetStart = Math.max(0, index - 20);
        const snippetEnd = Math.min(
          section.text.length,
          index + query.length + 20,
        );
        matches.text =
          "..." + section.text.slice(snippetStart, snippetEnd) + "...";
      }
    }
  }

  return Object.keys(matches).length > 0 ? matches : null;
}

function highlightMatchedText(
  matches: MatchesObject | null,
  query: string,
): MatchesObject | null {
  if (!matches || !query) return matches;

  const boldify = (text: string) =>
    text.replace(new RegExp(`(${query})`, "gi"), "<strong>$1</strong>");

  return {
    heading: matches.heading ? boldify(matches.heading) : undefined,
    text: matches.text ? boldify(matches.text) : undefined,
  };
}

export default function SearchModal() {
  const {
    state: { isOpen, query, results },
    handleSearch,
    toggleSearch,
  } = useSearch();
  const modalRef = useOutsideClick<HTMLDivElement>(() => toggleSearch(false));
  const router = useRouter();

  // Close search on Escape key press
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

  // Prevent browser back button from closing search unexpectedly
  useEffect(() => {
    if (isOpen) {
      history.pushState(null, document.title, location.href);
      window.addEventListener("popstate", function () {
        history.pushState(null, document.title, location.href);
        toggleSearch(false);
      });
    }
  }, [isOpen, toggleSearch]);

  return (
    <Command.CommandDialog
      open={isOpen}
      onOpenChange={toggleSearch}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 max-sm:items-end"
    >
      <DialogTitle className="sr-only">Blog Search</DialogTitle>
      <DialogDescription className="sr-only">
        This is Voccaria blog's search bar. What are you looking for?
      </DialogDescription>

      <div
        ref={modalRef}
        className="max-h-140 w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-lg max-sm:h-[120%] max-sm:rounded-none dark:bg-gray-900 [@media(max-height:600px)]:max-h-3/4"
      >
        <div className="relative">
          <Command.CommandInput
            value={query}
            onValueChange={handleSearch}
            placeholder="What are you looking for?"
            className="mb-7 w-full rounded-lg border border-slate-500 bg-slate-200 px-5 py-2.5 text-lg text-slate-600 outline-none placeholder:text-slate-500/80 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-slate-400/80"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.currentTarget.blur();
              }
            }}
          />
          <span
            onClick={() => toggleSearch(false)}
            className="absolute top-[50%] right-3 w-fit -translate-y-[27px] cursor-pointer rounded-sm border border-slate-400 bg-slate-200 px-2.5 py-1 text-xs font-bold text-slate-400 transition-colors hover:bg-slate-300 max-sm:hidden dark:bg-slate-700 dark:hover:bg-slate-800"
          >
            Esc
          </span>
        </div>

        <Command.CommandList className="[&>div]:flex [&>div]:flex-col [&>div]:gap-1.5">
          {results.length > 0 ? (
            results.map((result: (BlogPost & Category) | any) => {
              // Determine if the title itself matches
              const titleMatches = result.title
                .toLowerCase()
                .includes(query.toLowerCase());
              // Extract section matches from content
              const sectionMatches = extractMatch(query, result);
              const highlightedMatch = highlightMatchedText(
                sectionMatches,
                query,
              );

              // For "post" results, we want to possibly render two items:
              if (!result.typeOf || result.typeOf === "post") {
                const items = [];
                // Always render title match if found
                if (titleMatches) {
                  items.push(
                    <li
                      key={`${result.slug}-title`}
                      onClick={() => {
                        router.push(`/blog/${result.slug}`);
                        toggleSearch(false);
                      }}
                      className="group cursor-pointer list-none bg-gray-100 text-slate-700 dark:bg-gray-800 dark:text-slate-100"
                      value={result.slug}
                    >
                      <div className="flex items-baseline gap-3 rounded-md px-3 py-3 group-hover:bg-slate-200 dark:group-hover:bg-slate-700">
                        <BsFileEarmarkText
                          size={18}
                          className="shrink-0 translate-y-0.5"
                        />
                        <span
                          className="font-bold"
                          // Boldify the query in the title:
                          dangerouslySetInnerHTML={{
                            __html: result.title.replace(
                              new RegExp(`(${query})`, "gi"),
                              "<strong>$1</strong>",
                            ),
                          }}
                        />
                      </div>
                    </li>,
                  );
                }
                // Render content match if present
                if (
                  highlightedMatch &&
                  (highlightedMatch.heading || highlightedMatch.text)
                ) {
                  items.push(
                    <li
                      key={`${result.slug}-section`}
                      onClick={() => {
                        router.push(`/blog/${result.slug}`);
                        toggleSearch(false);
                      }}
                      className="group cursor-pointer list-none bg-gray-100 text-slate-700 dark:bg-gray-800 dark:text-slate-100"
                      value={result.slug}
                    >
                      <div className="flex items-baseline gap-3 rounded-md px-3 py-3 group-hover:bg-slate-200 dark:group-hover:bg-slate-700">
                        <LuText className="shrink-0 translate-y-0.5" />
                        <div className="flex flex-col">
                          {highlightedMatch.heading && (
                            <span
                              className="font-medium"
                              dangerouslySetInnerHTML={{
                                __html: highlightedMatch.heading,
                              }}
                            />
                          )}
                          {highlightedMatch.text && (
                            <span
                              className="font-light"
                              dangerouslySetInnerHTML={{
                                __html: highlightedMatch.text,
                              }}
                            />
                          )}
                          <span className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            {result.title}
                          </span>
                        </div>
                      </div>
                    </li>,
                  );
                }
                // Fallback: if no title or section matches, show a default item.
                if (items.length === 0) {
                  items.push(
                    <li
                      key={`${result.slug}-default`}
                      onClick={() => {
                        router.push(`/blog/${result.slug}`);
                        toggleSearch(false);
                      }}
                      className="group cursor-pointer list-none bg-gray-100 text-slate-700 dark:bg-gray-800 dark:text-slate-100"
                      value={result.slug}
                    >
                      <div className="flex items-baseline gap-3 rounded-md px-3 py-3 group-hover:bg-slate-200 dark:group-hover:bg-slate-700">
                        <BsFileEarmarkText
                          size={18}
                          className="shrink-0 translate-y-0.5"
                        />
                        <span className="font-medium">{result.title}</span>
                      </div>
                    </li>,
                  );
                }
                return items;
              } else if (result.typeOf === "category") {
                // For category results, render a single item.
                return (
                  <li
                    key={`${result.slug}-category`}
                    onClick={() => {
                      router.push(`/blog/${result.firstPostSlug}`);
                      toggleSearch(false);
                    }}
                    className="group cursor-pointer list-none bg-gray-100 text-slate-700 dark:bg-gray-800 dark:text-slate-100"
                  >
                    <div className="flex items-center gap-3 rounded-md px-3 py-3 group-hover:bg-slate-200 dark:group-hover:bg-slate-700">
                      <IoDocumentTextOutline
                        size={26}
                        className="-translate-y-0.5"
                      />
                      <span className="text-lg font-medium tracking-normal">
                        {result.title}
                      </span>
                    </div>
                  </li>
                );
              } else {
                // Default fallback (shouldn't happen)
                return (
                  <li
                    key={`${result.slug}-fallback`}
                    onClick={() => {
                      router.push(`/blog/${result.slug}`);
                      toggleSearch(false);
                    }}
                    className="group cursor-pointer list-none bg-gray-100 text-slate-700 dark:bg-gray-800 dark:text-slate-100"
                  >
                    <div className="flex items-baseline gap-3 rounded-md px-3 py-3 group-hover:bg-slate-200 dark:group-hover:bg-slate-700">
                      <BsFileEarmarkText
                        size={18}
                        className="shrink-0 translate-y-0.5"
                      />
                      <span className="font-medium">{result.title}</span>
                    </div>
                  </li>
                );
              }
            })
          ) : (
            <li className="list-none text-center text-slate-700 dark:text-slate-100">
              No results found.
            </li>
          )}
        </Command.CommandList>
      </div>
    </Command.CommandDialog>
  );
}
