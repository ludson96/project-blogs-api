import prisma from '../prisma';
import { CreatePostDTO, PaginationOptions } from '../types';

const postInclude = {
  user: {
    select: {
      id: true,
      displayName: true,
      email: true,
      image: true,
    },
  },
  categories: {
    select: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
};

const formatPost = (post: any) => {
  if (!post) return null;
  const { categories, ...rest } = post;
  return {
    ...rest,
    categories: categories ? categories.map((c: any) => c.category) : [],
  };
};

export const getAllBlogPost = async (options: PaginationOptions = {}): Promise<any[]> => {
  const queryOptions: any = {
    include: postInclude,
  };

  if (options.limit) {
    const limit = parseInt(String(options.limit), 10);
    const page = parseInt(String(options.page || 1), 10);
    if (!Number.isNaN(limit) && limit > 0) {
      queryOptions.take = limit;
      queryOptions.skip = (Math.max(page, 1) - 1) * limit;
    }
  }

  const posts = await prisma.blogPost.findMany(queryOptions);
  return posts.map(formatPost);
};

export const getBlogPostById = async (id: number | string): Promise<any> => {
  const post = await prisma.blogPost.findUnique({
    where: { id: Number(id) },
    include: postInclude,
  });

  return formatPost(post);
};

export const updateBlogPost = async (
  id: number | string,
  { title, content }: { title: string; content: string },
  req: any,
): Promise<any> => {
  const postId = Number(id);
  const blogPost = await prisma.blogPost.findUnique({
    where: { id: postId },
  });

  if (!blogPost) return null;

  const idUser = req.user.id;
  if (blogPost.userId === idUser) {
    await prisma.blogPost.update({
      where: { id: postId },
      data: { title, content },
    });

    return getBlogPostById(postId);
  }

  return null;
};

// Realiza a busca de posts aplicando filtro por título ou conteúdo
export const searchBlogPost = async (q: string): Promise<any[]> => {
  const posts = await prisma.blogPost.findMany({
    where: {
      OR: [
        { title: { contains: q } },
        { content: { contains: q } },
      ],
    },
    include: postInclude,
  });

  return posts.map(formatPost);
};

export const createPost = async ({ title, content, categoryIds }: CreatePostDTO, req: any): Promise<any> => {
  const categories = await prisma.category.findMany({
    where: { id: { in: categoryIds } },
  });

  if (categories.length !== categoryIds.length) return null;

  const userId = req.user.id;

  const newPost = await prisma.blogPost.create({
    data: {
      title,
      content,
      userId,
      categories: {
        create: categoryIds.map((categoryId) => ({
          category: { connect: { id: categoryId } },
        })),
      },
    },
  });

  return newPost;
};

export const deletePost = async (id: number | string, req: any): Promise<any> => {
  const postId = Number(id);
  const blogPost = await prisma.blogPost.findUnique({
    where: { id: postId },
  });

  if (!blogPost) return null;

  const idUser = req.user.id;
  if (blogPost.userId === idUser) {
    const postDeleted = await prisma.blogPost.delete({
      where: { id: postId },
    });
    return postDeleted;
  }

  return null;
};

export default {
  getAllBlogPost,
  getBlogPostById,
  updateBlogPost,
  searchBlogPost,
  createPost,
  deletePost,
};
