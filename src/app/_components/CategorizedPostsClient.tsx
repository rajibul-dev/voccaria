"use client";

import { createContext, useContext } from "react";
import { BlogPost, Category } from "@/models/blogInterfaces";

interface CategorizedPostsData {
  data: { category: Category; posts: BlogPost[] }[];
}

const CategorizedPostsContext = createContext<CategorizedPostsData | undefined>(
  undefined,
);

export function CategorizedPostsClient({
  data,
  children,
}: CategorizedPostsData & { children: React.ReactNode }) {
  return (
    <CategorizedPostsContext.Provider value={{ data }}>
      {children}
    </CategorizedPostsContext.Provider>
  );
}

export function useCategorizedPosts() {
  const context = useContext(CategorizedPostsContext);
  if (!context) {
    throw new Error(
      "useCategorizedPosts must be used within a CategorizedPostsProvider",
    );
  }
  return context;
}
