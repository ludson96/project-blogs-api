export interface UserAttributes {
  id?: number;
  displayName?: string;
  email: string;
  password?: string;
  image?: string;
}

export interface UserLoginDTO {
  email: string;
  password?: string;
}

export interface CategoryAttributes {
  id?: number;
  name: string;
}

export interface BlogPostAttributes {
  id?: number;
  title: string;
  content: string;
  userId?: number;
  published?: Date;
  updated?: Date;
  user?: UserAttributes;
  categories?: CategoryAttributes[];
}

export interface CreatePostDTO {
  title: string;
  content: string;
  categoryIds: number[];
}

export interface PaginationOptions {
  limit?: string | number;
  page?: string | number;
}
