"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequestJson } from "@/lib/api-client";
import { useLocale } from "next-intl";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export function useAdminAPI() {
  const queryClient = useQueryClient();
  const locale = useLocale();

  // Get dashboard stats
  const useDashboardStats = () => {
    return useQuery({
      queryKey: ['admin', 'dashboard', 'stats'],
      queryFn: async () => {
        const data = await apiRequestJson<{
          success: boolean;
          data: {
            stats: {
              companies: { total: number; active: number; inactive: number };
              users: { total: number; active: number; inactive: number };
              stores: { total: number };
              products: { total: number };
              orders: { total: number; pending: number };
            };
          };
        }>(`${BACKEND_URL}/api/admin/dashboard/stats`, {
          locale,
          requireAuth: true,
        });
        return data.data.stats;
      },
      staleTime: 60000, // 1 minute
    });
  };

  // Get companies
  const useCompanies = (filters: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  } = {}) => {
    return useQuery({
      queryKey: ['admin', 'companies', filters],
      queryFn: async () => {
        const params = new URLSearchParams();
        if (filters.status) params.append('status', filters.status);
        if (filters.search) params.append('search', filters.search);
        if (filters.page) params.append('page', filters.page.toString());
        if (filters.limit) params.append('limit', filters.limit.toString());

        const data = await apiRequestJson<{
          success: boolean;
          data: {
            data: any[];
            pagination: {
              page: number;
              limit: number;
              total: number;
              totalPages: number;
            };
          };
        }>(`${BACKEND_URL}/api/admin/companies?${params.toString()}`, {
          locale,
          requireAuth: true,
        });
        return data.data;
      },
    });
  };

  // Suspend company
  const useSuspendCompany = () => {
    return useMutation({
      mutationFn: async ({ companyId, reason }: { companyId: string; reason: string }) => {
        const data = await apiRequestJson<{
          success: boolean;
          data: { company: any };
        }>(`${BACKEND_URL}/api/admin/companies/${companyId}/suspend`, {
          method: 'PUT',
          locale,
          requireAuth: true,
          body: JSON.stringify({ reason }),
        });
        return data.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['admin', 'companies'] });
        queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard', 'stats'] });
      },
    });
  };

  // Activate company
  const useActivateCompany = () => {
    return useMutation({
      mutationFn: async (companyId: string) => {
        const data = await apiRequestJson<{
          success: boolean;
          data: { company: any };
        }>(`${BACKEND_URL}/api/admin/companies/${companyId}/activate`, {
          method: 'PUT',
          locale,
          requireAuth: true,
        });
        return data.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['admin', 'companies'] });
        queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard', 'stats'] });
      },
    });
  };

  // Get users
  const useUsers = (filters: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  } = {}) => {
    return useQuery({
      queryKey: ['admin', 'users', filters],
      queryFn: async () => {
        const params = new URLSearchParams();
        if (filters.status) params.append('status', filters.status);
        if (filters.search) params.append('search', filters.search);
        if (filters.page) params.append('page', filters.page.toString());
        if (filters.limit) params.append('limit', filters.limit.toString());

        const data = await apiRequestJson<{
          success: boolean;
          data: {
            data: any[];
            pagination: {
              page: number;
              limit: number;
              total: number;
              totalPages: number;
            };
          };
        }>(`${BACKEND_URL}/api/admin/users?${params.toString()}`, {
          locale,
          requireAuth: true,
        });
        return data.data;
      },
    });
  };

  return {
    useDashboardStats,
    useCompanies,
    useSuspendCompany,
    useActivateCompany,
    useUsers,
  };
}

