import { Metadata } from "next";
import Image from "next/image";

import { Suspense } from "react";
import BlogSearchBar from "../_components/BlogSearchBar";
import LatestPosts from "../_components/LatestPosts";
import Spinner from "../_components/Spinner";
import blogIllustration from "/public/images/blog-illustration.jpg";
import CategorizedPostsProvider from "../_components/CategorizedPostsProvider";
import CategorizedPostsList from "../_components/CategorizedPostsList";
import BlogHeroButton from "../_components/BlogHeroButton";
import {
  getAllCategories,
  getFirstPostOfFirstCategory,
  getPaginatedBlogPosts,
  getPostsInCategoryByIndex,
  getTotalBlogPostsCount,
} from "@/lib/sanityFetchers";

export const revalidate = 0; // for now

export const metadata: Metadata = {
  title: "Blog",
};

export async function generateStaticParams() {
  await getFirstPostOfFirstCategory();
  await getPaginatedBlogPosts(0, 5);
  await getTotalBlogPostsCount();
  const categories = await getAllCategories();
  await Promise.all(
    categories.map(async (category) => {
      await getPostsInCategoryByIndex(category.slug);
    }),
  );
  return [];
}

export default function Page() {
  return (
    <main className="min-h-dvh pb-20 transition-colors dark:bg-gray-900">
      <section className="pt-32 pb-8 max-sm:pt-28 max-sm:pb-4">
        <div className="mx-auto flex max-w-[67rem] items-center justify-between gap-8 px-6 max-md:flex-col">
          <div className="">
            <h1 className="dark:text-my-pink-300 mb-4 text-5xl font-extrabold tracking-tight text-slate-600 max-sm:mb-3 max-sm:text-4xl">
              Voccaria Blog
            </h1>
            <p className="mb-8 max-w-[54ch] text-lg text-slate-800 max-sm:mb-5.5 max-sm:text-base max-sm:leading-7 dark:text-gray-50">
              This blog is a resource for teaching you singing / about the
              voice. I'm Mia and I am the founder of Voccaria, and the author of
              this blog. The posts will be structured sequentially like a
              course.
            </p>

            <div className="flex w-full gap-5">
              <BlogHeroButton />
              <BlogSearchBar />
            </div>
          </div>

          <div>
            <Image
              src={blogIllustration}
              priority
              alt="Voccaria blog illustration"
              className="h-80 w-70 rounded-full object-cover hue-rotate-[340deg] max-md:hidden"
            />
          </div>
        </div>
      </section>

      <section className="pt-8 pb-18 max-md:pb-16 max-sm:pt-4">
        <div className="mx-auto max-w-[67rem] px-6">
          <h2 className="dark:text-my-pink-300 mb-8 text-3xl font-bold text-slate-600 max-sm:mb-6 max-sm:text-2xl">
            Latest Posts
          </h2>
          <Suspense fallback={<Spinner />}>
            <LatestPosts />
          </Suspense>
        </div>
      </section>

      <section className="border-t border-t-gray-300 py-16 max-md:py-14 dark:border-t-gray-700">
        <div className="mx-auto max-w-[67rem] px-6">
          <Suspense fallback={<Spinner />}>
            <CategorizedPostsProvider>
              <CategorizedPostsList />
            </CategorizedPostsProvider>
          </Suspense>
        </div>
      </section>
    </main>
  );
}
