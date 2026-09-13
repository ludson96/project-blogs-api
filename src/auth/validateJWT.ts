import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';

const secret: string = process.env.JWT_SECRET || 'seusecretdetoken';

export interface AuthenticatedRequest extends Request {
  user?: any;
}

const validateJWT = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> => {
  let token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: 'Token not found' });

  if (token.startsWith('Bearer ')) {
    token = token.slice(7).trim();
  }

  try {
    const decoded = jwt.verify(token, secret) as { data: { id: number } };
    const user = await prisma.user.findUnique({
      where: { id: decoded.data.id },
    });

    if (!user) return res.status(401).json({ message: 'Erro ao procurar usuário do token' });

    req.user = user;
    return next();
  } catch (erro) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

export default validateJWT;
