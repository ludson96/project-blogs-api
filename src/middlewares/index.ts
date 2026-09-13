import { Request, Response, NextFunction } from 'express';

export const validateEmailPwd = (req: Request, res: Response, next: NextFunction): any => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  return next();
};

export const validateInputUser = (req: Request, res: Response, next: NextFunction): any => {
  const { displayName, email, password } = req.body;
  if (!displayName || displayName.length < 8) {
    return res.status(400).json({ message: '"displayName" length must be at least 8 characters long' });
  }

  const isFormatEmail = /\S+@\S+\.\S+/;
  if (!email || !isFormatEmail.test(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ message: '"password" length must be at least 6 characters long' });
  }

  return next();
};

export const validateInputCategory = (req: Request, res: Response, next: NextFunction): any => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: '"name" is required' });

  return next();
};

export const validateInputNewBlogPost = (req: Request, res: Response, next: NextFunction): any => {
  try {
    const { title, content, categoryIds } = req.body;

    if (!title || !content || !categoryIds) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }
    return next();
  } catch (erro: any) {
    return res.status(500).json({
      message: 'Erro na validação do post',
      erro: erro.message,
    });
  }
};

export const validateInputBlogPostUpdated = (req: Request, res: Response, next: NextFunction): any => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  return next();
};

export default {
  validateEmailPwd,
  validateInputUser,
  validateInputCategory,
  validateInputNewBlogPost,
  validateInputBlogPostUpdated,
};
