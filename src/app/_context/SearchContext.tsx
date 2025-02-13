import { createContext, useReducer, useContext, ReactNode } from "react";
import Fuse from "fuse.js";

// Define the structure of state
interface SearchState {
  query: string;
  results: any[];
}

// Actions
type SearchAction =
  | { type: "SET_QUERY"; payload: string }
  | { type: "SET_RESULTS"; payload: any[] };

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
    default:
      return state;
  }
};

// Context creation
const SearchContext = createContext<{
  state: SearchState;
  handleSearch: (query: string) => void;
}>({
  state: { query: "", results: [] },
  handleSearch: () => {}, // Placeholder
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
  });

  // Setup Fuse.js for searching
  const fuse = new Fuse(data, {
    keys: ["title", "content"], // CHANGE: Customize for headings too
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

  return (
    <SearchContext.Provider value={{ state, handleSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook for using search
export const useSearch = () => {
  return useContext(SearchContext);
};
