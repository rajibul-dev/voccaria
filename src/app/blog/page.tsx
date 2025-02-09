import { Metadata } from "next";
import Image from "next/image";

import blogIllustration from "/public/images/blog-illustration.jpg";
import BlogSearchBar from "../_components/BlogSearchBar";
import LatestPosts from "../_components/LatestPosts";

export const metadata: Metadata = {
  title: "Blog",
};

export default function Page() {
  return (
    <main className="px-6 dark:bg-gray-900 min-h-screen transition-colors">
      <section className="pt-32 pb-8 max-sm:pt-28 max-sm:pb-6">
        <div className="flex max-w-6xl mx-auto items-center justify-between gap-8 max-md:flex-col">
          <div className="">
            <h1 className="mb-4 text-5xl font-extrabold text-slate-600 tracking-tight max-sm:text-4xl max-sm:mb-3 dark:text-my-pink-300">
              Voccaria Blog
            </h1>
            <p className="text-lg leading-8 text-slate-800 max-w-[54ch] mb-8 max-sm:text-base max-sm:leading-7.5 max-sm:mb-5.5 dark:text-gray-50">
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
              className="w-70 h-80 object-cover rounded-full hue-rotate-[340deg] max-md:hidden"
            />
          </div>
        </div>
      </section>

      <section className="py-8 max-sm:py-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl max-sm:text-2xl font-bold text-slate-600 dark:text-gray-50">
            Latest Posts
          </h2>

          <LatestPosts />
        </div>
      </section>
    </main>
  );
}
