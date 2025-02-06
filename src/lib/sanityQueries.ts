export const ALL_BLOG_POSTS = `
  *[_type == "blog"]{
    _id,
    title,
    slug,
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
  } | order(postIndexInCategory asc)
`;

export const ALL_BLOG_POSTS_PAGINATED = (start = 0, limit = 10) => `
  *[_type == "blog"] | order(postIndexInCategory asc) [${start}...${
  start + limit
}] {
    _id,
    title,
    slug,
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
    slug,
    smallDescription,
    postIndexInCategory,
    content
  }
`;

export const POSTS_IN_CATEGORY_SORTBY_TIME_ASC = (categorySlug: string) => `
  *[_type == "blog" && ofCategory->slug.current == "${categorySlug}"] 
  | order(_createdAt asc) {
    _id,
    title,
    slug,
    smallDescription,
    postIndexInCategory,
    _createdAt,
    content
  }
`;
