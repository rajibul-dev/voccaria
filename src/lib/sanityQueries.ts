export const ALL_BLOG_POSTS = `
  *[_type == "blog"]{
    _id,
    title,
    "currentSlug": slug.current,
    ofCategory->{
      title,
      "currentSlug": slug.current
    },
    smallDescription,
    postTags[]->{
      title,
      "currentSlug": slug.current
    },
    _createdAt
  } | order(postIndexInCategory asc)
`;

export const ALL_BLOG_POSTS_PAGINATED = (start = 0, limit = 10) => `
  *[_type == "blog"] | order(postIndexInCategory asc) [${start}...${
    start + limit
  }] {
    _id,
    title,
    "currentSlug": slug.current,
    ofCategory->{
      title,
      slug
    },
    smallDescription,
    postTags[]->{
      title,
      slug
    },
    postIndexInCategory,
    content
  }
`;

export const POSTS_IN_CATEGORY_SORTBY_INDEX = (categorySlug: string) => `
  *[_type == "blog" && ofCategory->slug.current == "${categorySlug}"] 
  | order(postIndexInCategory asc) {
    _id,
    title,
    "currentSlug": slug.current,
    smallDescription,
    postIndexInCategory,
  }
`;

export const POSTS_IN_CATEGORY_SORTBY_TIME_ASC = (categorySlug: string) => `
  *[_type == "blog" && ofCategory->slug.current == "${categorySlug}"] 
  | order(_createdAt asc) {
    _id,
    title,
    "currentSlug": slug.current,
    smallDescription,
    postIndexInCategory,
    _createdAt,
  }
`;

export const GET_POST = (slug: string) => `
  *[_type == "blog" && slug.current == "${slug}"][0] {
    _id,
    title,
    "currentSlug": slug.current,
    ofCategory->{
      title,
      slug
    },
    smallDescription,
    postTags[]->{
      title,
      "currentSlug": slug.current,
    },
    postIndexInCategory,
    content
  }
`;
