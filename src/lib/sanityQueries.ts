export const ALL_BLOG_POSTS = `
  *[_type == "blog"]{
    _id,
    title,
    "slug": slug.current,
    ofCategory->{
      title,
      "slug": slug.current
    },
    smallDescription,
    postTags[]->{
      title,
      "slug": slug.current
    },
    _createdAt
  } | order(_createdAt desc)
`;

export const ALL_BLOG_POSTS_PAGINATED = (start = 0, limit = 10) => `
  *[_type == "blog"] | order(_createdAt desc) [${start}...${start + limit}] {
    _id,
    title,
    "slug": slug.current,
    ofCategory->{
      title,
      slug
    },
    smallDescription,
    postTags[]->{
      title,
      slug
    },
    _createdAt,
    postIndexInCategory,
  }
`;

export const POSTS_IN_CATEGORY_SORTBY_INDEX = (categorySlug: string) => `
  *[_type == "blog" && ofCategory->slug.current == "${categorySlug}"] 
  | order(postIndexInCategory asc) {
    _id,
    title,
    "slug": slug.current,
    smallDescription,
    postIndexInCategory,
  }
`;

export const POSTS_IN_CATEGORY_SORTBY_TIME_ASC = (categorySlug: string) => `
  *[_type == "blog" && ofCategory->slug.current == "${categorySlug}"] 
  | order(_createdAt asc) {
    _id,
    title,
    "slug": slug.current,
    smallDescription,
    postIndexInCategory,
    _createdAt,
  }
`;

export const GET_POST = (slug: string) => `
  *[_type == "blog" && slug.current == "${slug}"][0] {
    _id,
    title,
    "slug": slug.current,
    ofCategory->{
      title,
      "slug": slug.current,
    },
    smallDescription,
    postTags[]->{
      title,
      "slug": slug.current,
    },
    postIndexInCategory,
    content,
    _createdAt,
  }
`;

export const TOTAL_BLOG_POSTS_COUNT = `count(*[_type == "blog"])`;

export const ALL_BLOG_POSTS_FOR_SEARCH = `
  *[_type == "blog"]{
    _id,
    title,
    "slug": slug.current,
    ofCategory->{
      title,
      "slug": slug.current
    },
    smallDescription,
    postTags[]->{
      title,
      "slug": slug.current
    },
    content
  } | order(_createdAt desc)
`;

export const GET_ALL_CATEGORIES = `*[_type == 'category'] {
  "slug": slug.current,
  title,
  order
} | order(order asc)`;

export const GET_FIRST_POST_SLUG_OF_CATEGORY = (category: string) => `
  *[_type == 'blog' && ofCategory->slug.current == "${category}"] {
    "slug": slug.current,
    postIndexInCategory,
    _createdAt
  } | order(defined(postIndexInCategory) desc, postIndexInCategory asc, _createdAt asc)[0].slug
`;
