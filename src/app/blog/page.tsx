import { Metadata } from "next";
import Image from "next/image";

import { Suspense } from "react";
import BlogSearchBar from "../_components/BlogSearchBar";
import LatestPosts from "../_components/LatestPosts";
import Spinner from "../_components/Spinner";
import blogIllustration from "/public/images/blog-illustration.jpg";

export const revalidate = 0; // for now

export const metadata: Metadata = {
  title: "Blog",
};

export default function Page() {
  return (
    <main className="min-h-screen px-6 pb-20 transition-colors dark:bg-gray-900">
      <section className="pt-32 pb-8 max-sm:pt-28 max-sm:pb-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-8 max-md:flex-col">
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

            <BlogSearchBar />
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

      <section className="py-8 max-sm:py-4">
        <div className="mx-auto max-w-5xl">
          <h2 className="dark:text-my-pink-300 mb-8 text-3xl font-bold text-slate-600 max-sm:mb-6 max-sm:text-2xl">
            Latest Posts
          </h2>
          <Suspense fallback={<Spinner />}>
            <LatestPosts />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
