import { Response } from 'express';
import { IApiResponse } from '../types/index.js';

export const sendSuccess = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T
): Response => {
  const response: IApiResponse<T> = {
    success: true,
    message,
    ...(data !== undefined && { data }),
  };
  return res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  statusCode: number,
  message: string,
  error?: string
): Response => {
  const response: IApiResponse = {
    success: false,
    message,
    ...(error && { error }),
  };
  return res.status(statusCode).json(response);
};
