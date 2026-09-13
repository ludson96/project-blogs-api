import models from '../models';
import { createToken, verifyToken } from '../auth/jwtFunctions';
import { UserAttributes, UserLoginDTO } from '../types';

const { User } = models;

export const loginUser = async ({ email, password }: UserLoginDTO): Promise<{ user: any; token: string | null }> => {
  const user = await User.findOne({ where: { email, password } });
  if (!user) return { user: null, token: null };
  const { password: _password, ...userWithoutPassword } = user.dataValues;
  const token = createToken(userWithoutPassword);
  return { user, token };
};

export const createUser = async ({ displayName, email, password }: UserAttributes): Promise<{ user: any; token: string | null }> => {
  const result = await User.findOne({ where: { email } });
  if (result) return { user: null, token: null };
  const newUser = await User.create({ displayName, email, password });
  const { password: _password, ...userWithoutPassword } = newUser.dataValues;
  const token = createToken(userWithoutPassword);
  return { user: userWithoutPassword, token };
};

export const getAllUsers = async (): Promise<any[]> => {
  return User.findAll({ attributes: { exclude: ['password'] } });
};

export const getUserById = async (id: number | string): Promise<any> => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  if (!user) return null;
  return user;
};

export const deleteUser = async (authorization: string): Promise<any> => {
  const { data: { id } } = verifyToken(authorization);
  const user = await User.destroy({ where: { id } });
  return user;
};

export default {
  loginUser,
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
