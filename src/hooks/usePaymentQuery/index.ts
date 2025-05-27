import { useQuery } from '@tanstack/react-query';
import { Order } from '@/types/index';
import { fetchPayments } from 'src/services/fetchPayments';

export function usePaymentsQuery({
  token,
  page,
  status,
  type,
  startDate,
  endDate,
}: {
  token: string;
  page: number;
  status?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
}) {
  return useQuery<Order, Error>({
    queryKey: ['payments', token, page, status, type, startDate, endDate],
    queryFn: async () => {
      const result = await fetchPayments(
        token,
        page,
        status,
        type,
        startDate,
        endDate,
      );
      if (typeof result === 'string') {
        throw new Error(result);
      }
      return result;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
}
