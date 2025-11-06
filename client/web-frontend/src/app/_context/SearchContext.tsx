"use client";

import {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import Fuse from "fuse.js";
import { Category } from "@/models/blogInterfaces";
import { usePathname } from "next/navigation";

// Define the structure of state
interface SearchState {
  query: string;
  results: any[];
  isOpen: boolean;
}

// Actions
type SearchAction =
  | { type: "SET_QUERY"; payload: string }
  | { type: "SET_RESULTS"; payload: any[] }
  | { type: "TOGGLE_SEARCH"; payload?: boolean };

// Reducer function
const searchReducer = (
  state: SearchState,
  action: SearchAction,
): SearchState => {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.payload };
    case "SET_RESULTS":
      return { ...state, results: action.payload };
    case "TOGGLE_SEARCH":
      return { ...state, isOpen: action.payload ?? !state.isOpen };
    default:
      return state;
  }
};

// Context creation
const SearchContext = createContext<{
  state: SearchState;
  handleSearch: (query: string) => void;
  toggleSearch: (forceState?: boolean) => void;
}>({
  state: { query: "", results: [], isOpen: false },
  handleSearch: () => {},
  toggleSearch: () => {},
});

// Provider component
export const SearchProvider = ({
  children,
  data,
  categories,
}: {
  children: ReactNode;
  data: any;
  categories?: Category[];
}) => {
  const [state, dispatch] = useReducer(searchReducer, {
    query: "",
    results: [],
    isOpen: false,
  });
  const pathname = usePathname();
  const isBlogPage = pathname.startsWith("/blog");

  const fuse = new Fuse(data, {
    keys: [
      { name: "title", weight: 0.8 }, // Prioritize title
      { name: "sections.heading", weight: 0.5 },
      { name: "sections.text", weight: 0.4 },
    ],
    threshold: 0.35,
    includeMatches: true,
    minMatchCharLength: 1,
    ignoreLocation: true,
  });

  // Handle search function
  const handleSearch = (query: string) => {
    dispatch({ type: "SET_QUERY", payload: query });
    if (query.trim() === "") {
      dispatch({ type: "SET_RESULTS", payload: categories || [] });
      return;
    }
    const results = fuse.search(query).map((res) => res.item);
    dispatch({ type: "SET_RESULTS", payload: results });
  };

  // Toggle search popup
  const toggleSearch = useCallback(
    (forceState?: boolean) => {
      dispatch({ type: "TOGGLE_SEARCH", payload: forceState ?? !state.isOpen });
    },
    [dispatch, state.isOpen],
  );

  // Listen for Ctrl + K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isBlogPage) {
        if (e.ctrlKey && e.key === "k") {
          e.preventDefault();
          toggleSearch(!state.isOpen);
        } else if (e.key === "Escape") {
          toggleSearch(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleSearch, state.isOpen, isBlogPage]);

  useEffect(() => {
    dispatch({ type: "SET_RESULTS", payload: categories || [] });
  }, [categories]);

  return (
    <SearchContext.Provider value={{ state, handleSearch, toggleSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook for using search
export const useSearch = () => {
  return useContext(SearchContext);
};
