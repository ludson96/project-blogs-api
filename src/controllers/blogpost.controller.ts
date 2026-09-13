import { Request, Response } from 'express';
import blogPostService from '../services/blogpost.service';

export const getAllBlogPost = async (req: Request, res: Response): Promise<any> => {
  try {
    const { page, limit } = req.query;
    const allPosts = await blogPostService.getAllBlogPost({ page: page as string, limit: limit as string });
    return res.status(200).json(allPosts);
  } catch (erro: any) {
    return res.status(500).json({
      message: 'Erro ao buscar todos os posts',
      erro: erro.message,
    });
  }
};

export const getBlogPostById = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = req.params.id as string;
    const blogPost = await blogPostService.getBlogPostById(id);
    if (!blogPost) return res.status(404).json({ message: 'Post does not exist' });
    return res.status(200).json(blogPost);
  } catch (erro: any) {
    return res.status(500).json({
      message: 'Não foi possivel buscar o post com id especifico',
      erro: erro.message,
    });
  }
};

export const updateBlogPost = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = req.params.id as string;
    const conteudo = req.body;
    const postUpdated = await blogPostService.updateBlogPost(id, conteudo, req);
    if (postUpdated) return res.status(200).json(postUpdated);  
    return res.status(401).json({ message: 'Unauthorized user' });
  } catch (erro: any) {
    return res.status(500).json({
      message: 'Não foi possivel atualizar o post',
      erro: erro.message,
    });
  }
};

export const searchBlogPost = async (req: Request, res: Response): Promise<any> => {
  try {
    const { q } = req.query;
    const searchedPost = await blogPostService.searchBlogPost(q as string);
    return res.status(200).json(searchedPost);
  } catch (erro: any) {
    return res.status(500).json({
      message: 'Não foi possivel pesquisar pelo titulo',
      erro: erro.message,
    });
  }
};

export const createPost = async (req: Request, res: Response): Promise<any> => {
  try {
    const insert = req.body;
    const newPost = await blogPostService.createPost(insert, req);
    if (!newPost) return res.status(400).json({ message: 'one or more "categoryIds" not found' });
    return res.status(201).json(newPost);
  } catch (erro: any) {
    return res.status(500).json({
      message: 'Erro ao tentar criar um post',
      erro: erro.message,
    });
  }
};

export const deletePost = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = req.params.id as string;

    const blogPost = await blogPostService.getBlogPostById(id);
    if (!blogPost) return res.status(404).json({ message: 'Post does not exist' });

    const postDeleted = await blogPostService.deletePost(id, req);
    if (postDeleted) return res.status(204).end();  

    return res.status(401).json({ message: 'Unauthorized user' });
  } catch (erro: any) {
    return res.status(500).json({
      message: 'Erro ao tentar deletar um post',
      erro: erro.message,
    });
  }
};

export default {
  getAllBlogPost,
  getBlogPostById,
  updateBlogPost,
  searchBlogPost,
  createPost,
  deletePost,
};
