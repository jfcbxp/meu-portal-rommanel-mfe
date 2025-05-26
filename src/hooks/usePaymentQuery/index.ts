import { useQuery } from '@tanstack/react-query';
import { Order } from '@/types/index';
import { fetchOrders } from '../../services';

export function usePaymentsQuery({
  token,
  page,
  status,
  type,
  date,
}: {
  token: string;
  page: number;
  status?: string;
  type?: string;
  date?: Date[];
}) {
  return useQuery<Order, Error>({
    queryKey: [
      'payments',
      token,
      page,
      status,
      type,
      date?.[0]?.toISOString(),
      date?.[1]?.toISOString(),
    ],
    queryFn: async () => {
      const result = await fetchOrders(
        token,
        page,
        status,
        type,
        date?.[0]?.toISOString().split('T')[0],
        date?.[1]?.toISOString().split('T')[0],
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
