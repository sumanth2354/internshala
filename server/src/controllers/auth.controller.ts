import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { UserModel } from '../models/user.model';
import { AuthenticatedRequest, IAuthPayload } from '../types/index';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['admin', 'sales']).optional(),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const generateToken = (payload: IAuthPayload): string => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN ?? '7d';

  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }

  return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
};

export const register = asyncHandler(
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const validatedData = registerSchema.parse(req.body);

    const existingUser = await UserModel.findByEmail(validatedData.email);
    if (existingUser) {
      sendError(res, 409, 'A user with this email already exists.');
      return;
    }

    const user = await UserModel.create(validatedData);

    const payload: IAuthPayload = {
      userId: user._id.toString(),
      role: user.role,
    };

    const token = generateToken(payload);

    sendSuccess(res, 201, 'Account created successfully.', {
      token,
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt.toISOString(),
      },
    });
  }
);

export const login = asyncHandler(
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const validatedData = loginSchema.parse(req.body);

    const user = await UserModel.findOne({ email: validatedData.email }).select(
      '+password'
    );

    if (!user) {
      sendError(res, 401, 'Invalid email or password.');
      return;
    }

    const isPasswordValid = await user.comparePassword(validatedData.password);
    if (!isPasswordValid) {
      sendError(res, 401, 'Invalid email or password.');
      return;
    }

    const payload: IAuthPayload = {
      userId: user._id.toString(),
      role: user.role,
    };

    const token = generateToken(payload);

    sendSuccess(res, 200, 'Logged in successfully.', {
      token,
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt.toISOString(),
      },
    });
  }
);

export const getMe = asyncHandler(
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user) {
      sendError(res, 401, 'Not authenticated.');
      return;
    }

    const user = await UserModel.findById(req.user.userId);
    if (!user) {
      sendError(res, 404, 'User not found.');
      return;
    }

    sendSuccess(res, 200, 'User fetched successfully.', {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt.toISOString(),
    });
  }
);
