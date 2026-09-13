import { Request, Response } from 'express';
import UserService from '../services/user.service';

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const login = req.body;
  const { user, token } = await UserService.loginUser(login);
  if (user) return res.status(200).json({ token });
  return res.status(400).json({ message: 'Invalid fields' });
};

export const createUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const newUser = req.body;
    const { user, token } = await UserService.createUser(newUser);
    if (!user) return res.status(409).json({ message: 'User already registered' });
    return res.status(201).json({ token });
  } catch (erro: any) {
    return res.status(500).json({
      message: 'Erro ao salvar o usuário no banco',
      error: erro.message,
    });
  }
};

export const getAllUsers = async (_req: Request, res: Response): Promise<any> => {
  try {
    const user = await UserService.getAllUsers();
    return res.status(200).json(user);
  } catch (erro: any) {
    return res.status(500).json({
      message: 'Erro ao buscar usuários',
      error: erro.message,
    });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = req.params.id as string;
    const user = await UserService.getUserById(id);
    if (!user) return res.status(404).json({ message: 'User does not exist' });
    return res.status(200).json(user);
  } catch (erro: any) {
    return res.status(500).json({
      message: 'Erro ao buscar usuário pelo id',
      error: erro.message,
    });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { authorization } = req.headers;
    await UserService.deleteUser(authorization as string);
    return res.status(204).end();
  } catch (erro: any) {
    return res.status(500).json({
      message: 'Erro ao deletar usuário',
      error: erro.message,
    });
  }
};

export default {
  loginUser,
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
