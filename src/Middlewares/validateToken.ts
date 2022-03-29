import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import Status from '../Enums/Status';

const validateToken:RequestHandler = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(Status.UNAUTHORIZED).json({ error: 'Token not found' });
  }
  try {
    jwt.verify(token, 'SECRET');
    next();
  } catch (_e) {
    return res.status(Status.UNAUTHORIZED).json({ error: 'Invalid token' });
  }
};

export default validateToken;
