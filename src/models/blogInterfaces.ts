export interface Category {
  title: string;
  currentSlug: string;
}

export interface PostTag {
  title: string;
  currentSlug: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  currentSlug: string;
  ofCategory?: Category;
  smallDescription?: string;
  postTags?: PostTag[];
  postIndexInCategory?: number;
  _createdAt: string;
  content?: string;
}
