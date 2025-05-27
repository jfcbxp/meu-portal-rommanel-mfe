import { Cd, GroupedOrders } from '@/types/index';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';

import OrderItemComponent from './item';
import theme from '@/styles/theme';
import { DateHeader } from './styles';

interface Properties {
  paymentTypeActive: Cd;
  periodActive: Cd;
  orders?: GroupedOrders[];
  loading?: boolean;
}

export default function Orders(properties: Readonly<Properties>) {
  const router = useRouter();
  const { token } = useAuthContext();
  const [orderId, setOrderId] = useState<number>();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  if (!token) {
    return null;
  }

  return (
    <div style={{ width: '100%' }}>
      {properties.orders.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666' }}>
          Nenhum boleto encontrado.
        </p>
      )}

      {properties.orders.map(group => (
        <div key={group.groupId}>
          <DateHeader>{group.description}</DateHeader>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing.medium,
            }}
          >
            {group.orders.map(order => (
              <OrderItemComponent
                key={order.id}
                order={order}
                orderId={orderId}
                setOrderId={setOrderId}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
