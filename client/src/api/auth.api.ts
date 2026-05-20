import apiClient from './axios';
import {
  IApiResponse,
  IAuthResponse,
  ILoginRequest,
  IRegisterRequest,
  IUser,
} from '../types';

export const authApi = {
  login: async (data: ILoginRequest): Promise<IApiResponse<IAuthResponse>> => {
    const response = await apiClient.post<IApiResponse<IAuthResponse>>(
      '/auth/login',
      data
    );
    return response.data;
  },

  register: async (
    data: IRegisterRequest
  ): Promise<IApiResponse<IAuthResponse>> => {
    const response = await apiClient.post<IApiResponse<IAuthResponse>>(
      '/auth/register',
      data
    );
    return response.data;
  },

  getMe: async (): Promise<IApiResponse<IUser>> => {
    const response = await apiClient.get<IApiResponse<IUser>>('/auth/me');
    return response.data;
  },
};
