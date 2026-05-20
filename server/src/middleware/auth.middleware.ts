import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest, IAuthPayload } from '../types/index';
import { sendError } from '../utils/apiResponse';

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    sendError(res, 401, 'Access denied. No token provided.');
    return;
  }

  const token = authHeader.split(' ')[1];
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    sendError(res, 500, 'Server configuration error.');
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as IAuthPayload;
    req.user = decoded;
    next();
  } catch {
    sendError(res, 401, 'Invalid or expired token.');
  }
};
