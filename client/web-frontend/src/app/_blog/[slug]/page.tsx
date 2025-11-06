import BackButton from "@/app/_components/BackButton";
import BlogPost from "@/app/_components/BlogPost";
import KeepTrackOfLastRead from "@/app/_components/KeepTrackOfLastRead";
import Spinner from "@/app/_components/Spinner";
import { getAllBlogPosts, getPost } from "@/lib/sanityFetchers";
import { Metadata } from "next";
import { Suspense } from "react";

export const revalidate = 0; // no cache storing for now

export async function generateStaticParams() {
  const allPosts = await getAllBlogPosts();
  return allPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { slug } = params;
  const { title, smallDescription, postTags } = await getPost(slug);
  const keywords = postTags?.map((tagObj) => tagObj.tag) || [];
  keywords.push("learn singing");
  return {
    title: `${title}`,
    description: `${smallDescription}`,
    keywords,
  };
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;

  return (
    <>
      <KeepTrackOfLastRead slug={slug} />

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
