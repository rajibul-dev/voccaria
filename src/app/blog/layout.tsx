import {
  getAllBlogPostsForSearch,
  getAllCategories,
  getFirstPostSlugOfCategory,
} from "@/lib/sanityFetchers";
import { SearchProvider } from "../_context/SearchContext";
import SearchModal from "../_components/SearchModal";
import { BlogPost, Category } from "@/models/blogInterfaces";

type StructuredContent = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[] | null;
  sections: { heading: string; text: string }[];
  content: string;
  typeOf: string;
};

function structureContent(data: any[]): StructuredContent[] {
  return data.map((post): StructuredContent => {
    let content = "";
    let sections: { heading: string; text: string }[] = [];
    let lastHeading = ""; // Track the last heading for paragraph grouping

    post.content.forEach((block: any) => {
      const text =
        block.children?.map((child: any) => child.text).join(" ") || "";

      if (block.style === "h2" || block.style === "h3") {
        lastHeading = text; // Store heading
        sections.push({ heading: text, text: "" }); // Create new section
      } else {
        if (sections.length === 0) {
          sections.push({ heading: "", text }); // Ensure a section exists for unheaded content
        } else {
          sections[sections.length - 1].text += text + " "; // Append to the last heading's text
        }
      }

      content += text + " "; // Collect all content for global search
    });

    return {
      id: post._id,
      title: post.title,
      slug: post.slug,
      description: post.smallDescription || "",
      category: post.ofCategory?.title || "",
      tags: post.postTags || null,
      sections,
      content: content.trim(),
      typeOf: "post",
    };
  });
}

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data: BlogPost[] = await getAllBlogPostsForSearch();
  const categories: Category[] = await getAllCategories();
  const categoriesWithMoreInfo: Category[] = (
    await Promise.all(
      categories.map(async (category) => {
        const firstPostSlug = await getFirstPostSlugOfCategory(category.slug);

        if (!firstPostSlug) return null; // Mark for removal
        return {
          ...category,
          typeOf: "category",
          firstPostSlug,
        };
      }),
    )
  ).filter((category) => category !== null); // Ensure only valid objects remain

  console.log(categoriesWithMoreInfo);

  const optimizedForSearchData = [
    ...structureContent(data),
    ...categoriesWithMoreInfo,
  ];

  return (
    <SearchProvider
      data={optimizedForSearchData}
      categories={categoriesWithMoreInfo}
    >
      {children}
      <SearchModal />
    </SearchProvider>
  );
}
