import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { MongoServerError } from 'mongodb';
import { sendError } from '../utils/apiResponse';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const globalErrorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Zod Validation Errors
  if (err instanceof ZodError) {
    const errorMessages = err.errors
      .map((e) => `${e.path.join('.')}: ${e.message}`)
      .join(', ');
    sendError(res, 400, 'Validation failed', errorMessages);
    return;
  }

  // MongoDB Duplicate Key Error
  if (err instanceof MongoServerError && err.code === 11000) {
    const field = Object.keys(err.keyValue ?? {})[0] ?? 'field';
    sendError(res, 409, `A record with this ${field} already exists.`);
    return;
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    sendError(res, 400, 'Validation failed', err.message);
    return;
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    sendError(res, 401, 'Invalid token.');
    return;
  }

  if (err.name === 'TokenExpiredError') {
    sendError(res, 401, 'Token expired.');
    return;
  }

  // Operational Errors
  if (err.isOperational && err.statusCode) {
    sendError(res, err.statusCode, err.message);
    return;
  }

  // Unknown Errors
  sendError(res, 500, 'Internal server error. Please try again later.');
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  sendError(res, 404, `Route ${req.originalUrl} not found.`);
};
