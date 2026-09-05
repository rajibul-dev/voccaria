"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  ReactNode,
} from "react";
import {
  getAllCategories,
  getPostsInCategoryByIndex,
} from "@/_libs/sanityFetchers";
import { BlogPost, Category } from "@/models/blogInterfaces";

interface SidebarData {
  data: { category: Category; posts: BlogPost[] }[];
  loading: boolean;
}

const SidebarContext = createContext<SidebarData | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<{ category: Category; posts: BlogPost[] }[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  // ✅ Persist fetched data across renders (prevents refetching)
  const dataCache = useRef<{ category: Category; posts: BlogPost[] }[] | null>(
    null,
  );

  useEffect(() => {
    async function fetchData() {
      if (dataCache.current) {
        setData(dataCache.current);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const categories = await getAllCategories();
        const fetchedData = await Promise.all(
          categories.map(async (category) => {
            const categoryPosts = await getPostsInCategoryByIndex(
              category.slug,
            );
            return { category, posts: categoryPosts };
          }),
        );

        dataCache.current = fetchedData; // Cache the data
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <SidebarContext.Provider value={{ data, loading }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
