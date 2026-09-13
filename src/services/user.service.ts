import prisma from '../prisma';
import { createToken, verifyToken } from '../auth/jwtFunctions';
import { UserAttributes, UserLoginDTO } from '../types';

export const loginUser = async ({ email, password }: UserLoginDTO): Promise<{ user: any; token: string | null }> => {
  const user = await prisma.user.findFirst({
    where: { email, password },
  });

  if (!user) return { user: null, token: null };

  const { password: _password, ...userWithoutPassword } = user;
  const token = createToken(userWithoutPassword);
  return { user, token };
};

export const createUser = async ({ displayName, email, password, image }: UserAttributes): Promise<{ user: any; token: string | null }> => {
  const result = await prisma.user.findUnique({
    where: { email },
  });

  if (result) return { user: null, token: null };

  const newUser = await prisma.user.create({
    data: {
      displayName: displayName || '',
      email,
      password: password || '',
      image: image || null,
    },
  });

  const { password: _password, ...userWithoutPassword } = newUser;
  const token = createToken(userWithoutPassword);
  return { user: userWithoutPassword, token };
};

export const getAllUsers = async (): Promise<any[]> => {
  return prisma.user.findMany({
    select: {
      id: true,
      displayName: true,
      email: true,
      image: true,
    },
  });
};

export const getUserById = async (id: number | string): Promise<any> => {
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      displayName: true,
      email: true,
      image: true,
    },
  });

  if (!user) return null;
  return user;
};

export const deleteUser = async (authorization: string): Promise<any> => {
  const { data: { id } } = verifyToken(authorization);
  const user = await prisma.user.delete({
    where: { id: Number(id) },
  });
  return user;
};

export default {
  loginUser,
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
