import BackButton from "@/app/_components/BackButton";
import BlogPost from "@/app/_components/BlogPost";
import Spinner from "@/app/_components/Spinner";
import { getPost } from "@/lib/sanityFetchers";
import { Metadata } from "next";
import { cache, Suspense } from "react";

export const revalidate = 0; // no cache storing for now

export const getPostNCache = cache(async (slug: string) => await getPost(slug));

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { title, smallDescription } = await getPostNCache(slug);
  return { title: `${title}`, description: `${smallDescription}` };
}

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return (
    <>
      <div className="mx-auto mt-10 -mb-8 max-w-4xl px-5 max-sm:mt-7 max-sm:-mb-4">
        <BackButton className="" path="/blog">
          Back to blog
        </BackButton>
      </div>

      <Suspense fallback={<Spinner />}>
        <BlogPost slug={slug} />
      </Suspense>
    </>
  );
}
