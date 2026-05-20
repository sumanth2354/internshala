export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost';
export type LeadSource = 'Website' | 'Instagram' | 'Referral';
export type UserRole = 'admin' | 'sales';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface ILead {
  _id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdBy: string | IUser;
  createdAt: string;
  updatedAt: string;
}

export interface IAuthPayload {
  userId: string;
  role: UserRole;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface ILeadFilters {
  status?: LeadStatus;
  source?: LeadSource;
  search?: string;
  sort?: 'latest' | 'oldest';
  page?: number;
  limit?: number;
}

export interface IPaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IPaginatedResponse<T> {
  data: T[];
  pagination: IPaginationMeta;
}

export interface IApiResponse<T = null> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Express augmentation for req.user
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: IAuthPayload;
}
