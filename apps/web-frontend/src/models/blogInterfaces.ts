export interface Category {
  title: string;
  slug: string;
  order?: number;
  typeOf?: string;
  firstPostSlug?: string;
}

export interface PostTag {
  tag: string;
  slug: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  ofCategory?: Category;
  smallDescription?: string;
  postTags?: PostTag[];
  postIndexInCategory?: number;
  _createdAt: string;
  _updatedAt?: string;
  content?: string;
  typeOf?: string;
}
