import { Request, Response } from 'express';
import CategoryService from '../services/category.service';

export const createCategory = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name } = req.body;
    const newCategory = await CategoryService.createCategory(name);
    return res.status(201).json(newCategory);
  } catch (erro: any) {
    return res.status(500).json({
      message: 'Erro, não foi possivel criar categoria',
      error: erro.message,
    });
  }
};

export const getAllCategory = async (_req: Request, res: Response): Promise<any> => {
  try {
    const allCategory = await CategoryService.getAllCategory();
    return res.status(200).json(allCategory);
  } catch (erro: any) {
    return res.status(500).json({
      message: 'Não foi possivel listar todas as categorias',
      error: erro.message,
    });
  }
};

export default {
  createCategory,
  getAllCategory,
};
