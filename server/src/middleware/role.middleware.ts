import { Response, NextFunction, RequestHandler } from 'express';
import { AuthenticatedRequest, UserRole } from '../types/index';
import { sendError } from '../utils/apiResponse';

export const requireRole = (...roles: UserRole[]): RequestHandler => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      sendError(res, 401, 'Authentication required.');
      return;
    }

    if (!roles.includes(req.user.role)) {
      sendError(
        res,
        403,
        `Access denied. Required role: ${roles.join(' or ')}.`
      );
      return;
    }

    next();
  };
};
