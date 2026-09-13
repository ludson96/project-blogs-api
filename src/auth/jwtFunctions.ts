import jwt, { SignOptions } from 'jsonwebtoken';

const secret: string = process.env.JWT_SECRET || 'seusecretdetoken';

const jwtConfig: SignOptions = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

export const createToken = (userWithoutPassword: Record<string, any>): string => {
  const token = jwt.sign({ data: userWithoutPassword }, secret, jwtConfig);
  return token;
};

export const verifyToken = (authorization: string): any => {
  try {
    const payload = jwt.verify(authorization, secret);
    return payload;
  } catch (erro) {
    return { isError: true, erro };
  }
};

export default {
  createToken,
  verifyToken,
};
