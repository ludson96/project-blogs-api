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
    const token = authorization.startsWith('Bearer ') ? authorization.slice(7).trim() : authorization;
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (erro) {
    return { isError: true, erro };
  }
};

export default {
  createToken,
  verifyToken,
};
