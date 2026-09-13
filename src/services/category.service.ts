import prisma from '../prisma';

export const createCategory = async (name: string): Promise<any> => {
  return prisma.category.create({
    data: { name },
  });
};

export const getAllCategory = async (): Promise<any[]> => {
  return prisma.category.findMany();
};

export default {
  createCategory,
  getAllCategory,
};
