import BackButton from "@/app/_components/BackButton";
import { formatDateTime } from "@/lib/dateFns";
import { getPost } from "@/lib/sanityFetchers";
import { Metadata } from "next";
import { PortableText } from "next-sanity";

const extractPlainText = (blocks: any) => {
  return blocks.reduce((acc: any, block: any) => {
    if (block._type === "block" && block.children) {
      return (
        acc + block.children.map((child: any) => child.text).join(" ") + " "
      );
    }
    return acc;
  }, "");
};

const getReadingStats = (text: string, wordsPerMinute: number = 200) => {
  const wordCount = text.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return { wordCount, readingTime };
};

const PortableTextComponents = {
  types: {
    youtube: ({ value }: { value: { url: string } }) => {
      if (!value?.url) return null;

      // Extract YouTube video ID from URL
      const videoId =
        new URL(value.url).searchParams.get("v") || value.url.split("/").pop();

      return (
        <div className="mt-8 aspect-video">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video"
            allowFullScreen
          />
        </div>
      );
    },
  },
  marks: {
    link: ({
      value,
      children,
    }: {
      value: { href: string };
      children: React.ReactNode;
    }) => (
      <a {...value} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { slug } = params;
  const { title, smallDescription } = await getPost(slug);
  return { title: `${title}`, description: `${smallDescription}` };
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;
  const { title, smallDescription, content, _createdAt } = await getPost(slug);

  const { readingTime } = getReadingStats(
    extractPlainText(content) + smallDescription || "",
  );

  console.log(content);

  return (
    <>
      <div className="mx-auto max-w-4xl px-5">
        <BackButton className="">Back to blog</BackButton>
      </div>
      <article className="mx-auto max-w-4xl px-5 pt-15 pb-15 max-sm:pt-10">
        <header className="mb-10">
          <time
            dateTime={_createdAt}
            className="text-my-pink-600 dark:text-my-pink-300 mb-4 inline-block text-base font-bold"
          >
            {formatDateTime(_createdAt)}
          </time>
          <time
            dateTime={`PT${readingTime}M`}
            className="text-my-pink-600 dark:text-my-pink-300 mb-4 inline-block text-base font-bold"
          >
            &nbsp;&nbsp;•&nbsp;&nbsp;{readingTime} min read
          </time>
          <h1 className="mb-4 text-4xl leading-12.5 font-bold tracking-tighter text-slate-600 max-sm:text-[1.625rem] max-sm:leading-9.5 dark:text-slate-100">
            {title}
          </h1>
          <p className="text-lg leading-8 text-slate-800 max-sm:text-base max-sm:leading-7 dark:text-slate-300">
            {smallDescription}
          </p>
        </header>

        <section className="prose prose-slate max-sm:prose-base max-sm:prose-h2:leading-9 max-sm:prose-h2:mb-4 prose-a:text-my-pink-600 dark:prose-a:text-my-pink-300 prose-li:marker:text-slate-700 dark:prose-li:marker:text-slate-200 prose-headings:tracking-tight prose-strong:text-slate-600 prose-h2:mt-10 dark:prose-strong:text-slate-200 prose-headings:text-slate-600 dark:prose-headings:text-slate-100 prose-lg prose-h2:mb-5 dark:prose-invert w-full max-w-none">
          <PortableText
            value={content as any}
            components={PortableTextComponents as any}
          />
        </section>
      </article>
    </>
  );
}
