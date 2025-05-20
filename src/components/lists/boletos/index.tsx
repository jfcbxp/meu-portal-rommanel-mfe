'use client';

import { Boleto } from '@/types/index';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import styled from 'styled-components';
import useIsMobile from '@/hooks/useIsMobile';
import BoletoItem from './item';

interface Properties {
  filterActive?: '30dias';
  boletos?: Boleto[];
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

// Helper function to group boletos by date
const groupBoletosByDate = (boletos: Boleto[]) => {
  return boletos.reduce((acc, boleto) => {
    const formattedDate = formatDate(boleto.data);
    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }
    acc[formattedDate].push(boleto);
    return acc;
  }, {} as Record<string, Boleto[]>);
};

export default function Boletos(properties: Properties) {
  const router = useRouter();
  const { token } = useAuth();
  const isMobile = useIsMobile();
  const [orderId, setOrderId] = useState<string>();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  // Always call hooks before any return
  const filteredBoletos = useMemo(() => {
    if (properties.filterActive === '30dias') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return (properties.boletos ?? []).filter(
        boleto => new Date(boleto.data + 'T00:00:00') >= thirtyDaysAgo,
      );
    }
    return properties.boletos ?? [];
  }, [properties.filterActive, properties.boletos]);

  const groupedBoletos = useMemo(
    () => groupBoletosByDate(filteredBoletos),
    [filteredBoletos],
  );

  const sortedDates = useMemo(
    () =>
      Object.keys(groupedBoletos).sort((a, b) => {
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
    [groupedBoletos],
  );

  if (!token) {
    return null;
  }

  const goToDetails = (id: string) => {
    router.push(`/detalhesBoleto?id=${id}`);
  };

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
          Nenhum boleto encontrado.
        </p>
      )}

      {sortedDates.map(date => (
        <div key={date}>
          <DateHeader>{date}</DateHeader>
          {groupedBoletos[date].map(boleto => (
            <BoletoItem
              goToDetails={goToDetails}
              key={boleto.id}
              boleto={boleto}
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
