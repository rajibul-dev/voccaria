import { formatDateTime } from "@/lib/dateFns";
import { getPost } from "@/lib/sanityFetchers";
import clsx from "clsx";
import { PortableText } from "next-sanity";
import { notFound } from "next/navigation";

const PREFER_SMALL_TEXTS = true; // Toggle this to true for smaller text

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

      const videoId =
        new URL(value.url).searchParams.get("v") || value.url.split("/").pop();

      return (
        <div className="my-9 aspect-video max-w-180">
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

export default async function BlogPost({ slug }: { slug: string }) {
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const { title, smallDescription, content, _createdAt } = post;

  const { readingTime } = getReadingStats(
    extractPlainText(content) + smallDescription || "",
  );

  return (
    <article className="mx-auto max-w-4xl px-5 pt-15 pb-15 max-sm:pt-10">
      <header
        className={clsx({
          "prose-h2:mt-10": !PREFER_SMALL_TEXTS,
          "prose-h2:mt-8": PREFER_SMALL_TEXTS,
        })}
      >
        <time
          dateTime={_createdAt}
          className="text-my-pink-600 dark:text-my-pink-300 mb-4 inline-block text-base font-medium"
        >
          {formatDateTime(_createdAt)}
        </time>
        <time
          dateTime={`PT${readingTime}M`}
          className="text-my-pink-600 dark:text-my-pink-300 mb-4 inline-block text-base font-medium"
        >
          &nbsp;&nbsp;•&nbsp;&nbsp;{readingTime} min read
        </time>
        <h1
          className={clsx("mb-4 font-bold text-slate-600 dark:text-slate-100", {
            "text-4xl leading-12.5 tracking-tighter max-sm:text-[1.625rem] max-sm:leading-9.5":
              !PREFER_SMALL_TEXTS, // Default (large)
            "text-3xl leading-11 tracking-tight max-sm:text-[1.625rem] max-sm:leading-9.5":
              PREFER_SMALL_TEXTS, // Smaller text
          })}
        >
          {title}
        </h1>
        <p
          className={clsx("text-slate-800 dark:text-slate-300", {
            "text-lg leading-8 max-sm:text-base max-sm:leading-7":
              !PREFER_SMALL_TEXTS, // Default (large)
            "text-base leading-7 max-sm:text-base max-sm:leading-7":
              PREFER_SMALL_TEXTS, // Smaller text
          })}
        >
          {smallDescription}
        </p>
      </header>

      <section
        className={clsx(
          "prose prose-slate prose-a:text-my-pink-600 dark:prose-a:text-my-pink-300 prose-li:marker:text-slate-700 dark:prose-li:marker:text-slate-200 prose-headings:tracking-tight prose-strong:text-slate-600 dark:prose-strong:text-slate-200 prose-headings:text-slate-600 dark:prose-headings:text-slate-100 prose-h2:mb-5 dark:prose-invert prose-h4:mt-4 w-full max-w-none",
          {
            "prose-lg max-sm:prose-base max-sm:prose-h2:leading-9 max-sm:prose-h2:mb-4 prose-h2:mt-10":
              !PREFER_SMALL_TEXTS, // Default (large)
            "prose-base max-sm:prose-base max-sm:prose-h2:leading-9 max-sm:prose-h2:mb-4 prose-h2:mt-8 max-sm:prose-p:my-3.5":
              PREFER_SMALL_TEXTS, // Smaller text
          },
        )}
      >
        <PortableText
          value={content as any}
          components={PortableTextComponents as any}
        />
      </section>
    </article>
  );
}
