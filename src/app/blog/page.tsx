import { Metadata } from "next";
import Image from "next/image";

import blogIllustration from "/public/images/blog-illustration.jpg";
import BlogSearchBar from "../_components/BlogSearchBar";

export const metadata: Metadata = {
  title: "Blog",
};

export default function Page() {
  return (
    <main>
      <section className="pt-32">
        <div className="flex max-w-5xl mx-auto items-center justify-between">
          <div className="">
            <h1 className="mb-4 text-5xl font-bold text-slate-600 tracking-tight">
              Voccaria Blog
            </h1>
            <p className="text-lg text-slate-800 max-w-[54ch] mb-8">
              This blog is a resource for teaching you singing / about the
              voice. I'm Mia and I am the founder of Voccaria, and the author of
              this blog. The posts will be structred sequentially like a course.
            </p>

            <BlogSearchBar />
          </div>

          <div>
            <Image
              src={blogIllustration}
              priority
              alt="Voccaria blog illustration"
              className="w-70 h-80 object-cover rounded-full hue-rotate-[340deg]"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
