import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from '@tanstack/react-query';
import { leadsApi } from '../api/leads.api';
import {
  IApiResponse,
  ILead,
  ILeadFilters,
  ILeadFormValues,
  ILeadsResponse,
} from '../types';

const LEADS_QUERY_KEY = 'leads';

export const useGetLeads = (
  filters: ILeadFilters
): UseQueryResult<IApiResponse<ILeadsResponse>> => {
  return useQuery({
    queryKey: [LEADS_QUERY_KEY, filters],
    queryFn: () => leadsApi.getLeads(filters),
    placeholderData: (prev) => prev,
  });
};

export const useGetLead = (
  id: string | null
): UseQueryResult<IApiResponse<ILead>> => {
  return useQuery({
    queryKey: [LEADS_QUERY_KEY, id],
    queryFn: () => leadsApi.getLead(id!),
    enabled: !!id,
  });
};

export const useCreateLead = (): UseMutationResult<
  IApiResponse<ILead>,
  Error,
  ILeadFormValues
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: leadsApi.createLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LEADS_QUERY_KEY] });
    },
  });
};

export const useUpdateLead = (): UseMutationResult<
  IApiResponse<ILead>,
  Error,
  { id: string; data: Partial<ILeadFormValues> }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => leadsApi.updateLead(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LEADS_QUERY_KEY] });
    },
  });
};

export const useDeleteLead = (): UseMutationResult<
  IApiResponse<null>,
  Error,
  string
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: leadsApi.deleteLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LEADS_QUERY_KEY] });
    },
  });
};
