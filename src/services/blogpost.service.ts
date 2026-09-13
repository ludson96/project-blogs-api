import Sequelize from 'sequelize';
import models from '../models';
import { CreatePostDTO, PaginationOptions } from '../types';

const { BlogPost, User, Category, PostCategory } = models;

const buildPagination = ({ limit, page = 1 }: PaginationOptions): { limit?: number; offset?: number } => {
  const parsedLimit = parseInt(String(limit), 10);
  const parsedPage = parseInt(String(page), 10);
  if (!Number.isNaN(parsedLimit) && parsedLimit > 0) {
    return {
      limit: parsedLimit,
      offset: (Math.max(parsedPage, 1) - 1) * parsedLimit,
    };
  }
  return {};
};

export const getAllBlogPost = async (options: PaginationOptions = {}): Promise<any[]> => {
  const pagination = options.limit ? buildPagination(options) : {};
  return BlogPost.findAll({
    ...pagination,
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
};

export const getBlogPostById = async (id: number | string): Promise<any> => {
  return BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
};

export const updateBlogPost = async (id: number | string, { title, content }: { title: string; content: string }, req: any): Promise<any> => {
  const blogPost = await getBlogPostById(id);
  if (!blogPost) return null;

  const idUser = req.user.id;
  if (blogPost.userId === idUser) {
    await BlogPost.update({ title, content }, { where: { id } });
    const blogUpdated = await getBlogPostById(id);
    return blogUpdated;
  }

  return null;
};

// Realiza a busca de posts aplicando o operador LIKE no título ou conteúdo
export const searchBlogPost = async (q: string): Promise<any[]> => {
  const { Op } = Sequelize;
  const query = `${q}%`;
  const searchedPost = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: query } },
        { content: { [Op.like]: query } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return searchedPost;
};

export const createPost = async ({ title, content, categoryIds }: CreatePostDTO, req: any): Promise<any> => {
  const { rows } = await Category.findAndCountAll();
  const isIdValid = rows.every(({ dataValues: { id } }: any) => categoryIds.includes(id));

  if (!isIdValid) return null;

  const userId = req.user.id;
  const newPost = await BlogPost.create({ title, content, userId });

  const newPostCategory = categoryIds.map((id) =>
    PostCategory.create({ postId: newPost.id, categoryId: id }));

  await Promise.all(newPostCategory);

  return newPost;
};

export const deletePost = async (id: number | string, req: any): Promise<any> => {
  const blogPost = await getBlogPostById(id);
  if (!blogPost) return null;

  const idUser = req.user.id;
  if (blogPost.userId === idUser) {
    const postDeleted = await BlogPost.destroy({ where: { id } });
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
