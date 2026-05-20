import apiClient from './axios';
import {
  IApiResponse,
  ILead,
  ILeadFilters,
  ILeadFormValues,
  ILeadsResponse,
} from '../types';

export const leadsApi = {
  getLeads: async (
    filters: ILeadFilters
  ): Promise<IApiResponse<ILeadsResponse>> => {
    const params = new URLSearchParams();
    if (filters.status) params.set('status', filters.status);
    if (filters.source) params.set('source', filters.source);
    if (filters.search) params.set('search', filters.search);
    if (filters.sort) params.set('sort', filters.sort);
    if (filters.page) params.set('page', String(filters.page));
    if (filters.limit) params.set('limit', String(filters.limit));

    const response = await apiClient.get<IApiResponse<ILeadsResponse>>(
      '/leads',
      { params }
    );
    return response.data;
  },

  getLead: async (id: string): Promise<IApiResponse<ILead>> => {
    const response = await apiClient.get<IApiResponse<ILead>>(`/leads/${id}`);
    return response.data;
  },

  createLead: async (
    data: ILeadFormValues
  ): Promise<IApiResponse<ILead>> => {
    const response = await apiClient.post<IApiResponse<ILead>>('/leads', data);
    return response.data;
  },

  updateLead: async (
    id: string,
    data: Partial<ILeadFormValues>
  ): Promise<IApiResponse<ILead>> => {
    const response = await apiClient.put<IApiResponse<ILead>>(
      `/leads/${id}`,
      data
    );
    return response.data;
  },

  deleteLead: async (id: string): Promise<IApiResponse<null>> => {
    const response = await apiClient.delete<IApiResponse<null>>(`/leads/${id}`);
    return response.data;
  },

  exportCsv: async (filters: ILeadFilters): Promise<Blob> => {
    const params = new URLSearchParams();
    if (filters.status) params.set('status', filters.status);
    if (filters.source) params.set('source', filters.source);
    if (filters.search) params.set('search', filters.search);

    const response = await apiClient.get('/leads/export/csv', {
      params,
      responseType: 'blob',
    });
    return response.data as Blob;
  },
};
