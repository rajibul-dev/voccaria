"use client";

import {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import Fuse from "fuse.js";

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
}: {
  children: ReactNode;
  data: any[];
}) => {
  const [state, dispatch] = useReducer(searchReducer, {
    query: "",
    results: [],
    isOpen: false,
  });

  // Setup Fuse.js for searching
  const fuse = new Fuse(data, {
    keys: ["title", "content"], // Customize for headings too
    threshold: 0.3,
    includeMatches: true,
  });

  // Handle search function
  const handleSearch = (query: string) => {
    dispatch({ type: "SET_QUERY", payload: query });
    if (query.trim() === "") {
      dispatch({ type: "SET_RESULTS", payload: [] });
      return;
    }
    const results = fuse.search(query).map((res) => res.item);
    dispatch({ type: "SET_RESULTS", payload: results });
  };

  // Toggle search popup
  const toggleSearch = (forceState?: boolean) => {
    dispatch({ type: "TOGGLE_SEARCH", payload: forceState });
  };

  // Listen for Ctrl + K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        toggleSearch(true);
      } else if (e.key === "Escape") {
        toggleSearch(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
