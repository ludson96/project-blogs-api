import models from '../models';

const { Category } = models;

export const createCategory = async (name: string): Promise<any> => {
  return Category.create({ name });
};

export const getAllCategory = async (): Promise<any[]> => {
  return Category.findAll();
};

export default {
  createCategory,
  getAllCategory,
};
