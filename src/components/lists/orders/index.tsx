'use client';

import { Order, PaymentTypes, Period } from '@/types/index';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import styled from 'styled-components';
import useIsMobile from '@/hooks/useIsMobile';
import OrderItem from './item';

interface Properties {
  paymentTypeActive: PaymentTypes;
  periodActive: Period;
  orders?: Order[];
}

// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString + 'T00:00:00'); // Ensure correct date parsing
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

// Helper function to group orders by date
const groupOrdersByDate = (orders: Order[]) => {
  return orders.reduce((acc, order) => {
    const formattedDate = order.date;
    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }
    acc[formattedDate].push(order);
    return acc;
  }, {} as Record<string, Order[]>);
};

export default function Orders(properties: Readonly<Properties>) {
  const router = useRouter();
  const { token } = useAuth();
  const isMobile = useIsMobile();
  const [orderId, setOrderId] = useState<number>();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  // Always call hooks before any return
  const filteredOrders = useMemo(() => {
    const periodDays = parseInt(properties.periodActive.code, 10);
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - (isNaN(periodDays) ? 0 : periodDays));

    return properties.orders.filter(order => {
      const [day, month, year] = order.date.split('/').map(Number);
      const orderDate = new Date(year, month - 1, day);
      return (
        orderDate >= daysAgo && order.type === properties.paymentTypeActive.code
      );
    });
  }, [
    properties.periodActive.code,
    properties.orders,
    properties.paymentTypeActive.code,
  ]);

  const groupedOrders = useMemo(
    () => groupOrdersByDate(filteredOrders),
    [filteredOrders],
  );

  const sortedDates = useMemo(
    () =>
      Object.keys(groupedOrders).sort((a, b) => {
        const dateA = new Date(
          parseInt(a.split(' de ')[2], 10),
          new Date(Date.parse(a.split(' de ')[1] + ' 1, 2000')).getMonth(),
          parseInt(a.split(' de ')[0], 10),
        );
        const dateB = new Date(
          parseInt(b.split(' de ')[2], 10),
          new Date(Date.parse(b.split(' de ')[1] + ' 1, 2000')).getMonth(),
          parseInt(b.split(' de ')[0], 10),
        );
        return dateB.getTime() - dateA.getTime();
      }),
    [groupedOrders],
  );

  if (!token) {
    return null;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: isMobile ? 1 : 2,
      }}
    >
      {sortedDates.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666' }}>
          Nenhum order encontrado.
        </p>
      )}

      {sortedDates.map(date => (
        <div key={date}>
          <DateHeader>{date}</DateHeader>
          {groupedOrders[date].map(order => (
            <OrderItem
              key={order.id}
              order={order}
              orderId={orderId}
              setOrderId={setOrderId}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

const DateHeader = styled.h2`
  font-size: 1rem; // 16px
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-top: ${({ theme }) => theme.spacing.large};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;
