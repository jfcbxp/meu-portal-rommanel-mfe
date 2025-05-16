'use client';

import { Boleto } from '@/types/index';
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import styled from 'styled-components';
import { Chip as PrimeChip } from 'primereact/chip';

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

  const handleCardClick = (id: string) => {
    router.push(`/detalhesBoleto?id=${id}`);
  };

  return (
    <>
      {sortedDates.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666' }}>
          Nenhum boleto encontrado.
        </p>
      )}

      {sortedDates.map(date => (
        <div key={date}>
          <DateHeader>{date}</DateHeader>
          {groupedBoletos[date].map(boleto => (
            <CardWrapper
              key={boleto.id}
              onClick={() => handleCardClick(boleto.id)}
            >
              <CardHeader>
                <CardSubtitle>{`nº ${boleto.id}`}</CardSubtitle>
                <StatusChip label={boleto.status} status={boleto.status} />
              </CardHeader>
              <CardBody>
                <CardIconWrapper>
                  <i>{boleto.compra[0]}</i>
                </CardIconWrapper>
                <CardInfoWrapper>
                  <CardTitle>{boleto.compra}</CardTitle>
                  <CardValueWrapper>
                    <CardAmount>{`R$ ${boleto.valor}`}</CardAmount>
                    <CardItemCount>{`${boleto.quantidadeItens} item${
                      boleto.quantidadeItens > 1 ? 's' : ''
                    }`}</CardItemCount>
                  </CardValueWrapper>
                </CardInfoWrapper>
                <ArrowIcon>
                  <h2>{'>'}</h2>
                </ArrowIcon>
              </CardBody>
            </CardWrapper>
          ))}
        </div>
      ))}
    </>
  );
}

const DateHeader = styled.h2`
  font-size: 1rem; // 16px
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-top: ${({ theme }) => theme.spacing.large};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
  }
`;

const CardHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.medium};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
`;

const CardBody = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.medium};
  gap: ${({ theme }) => theme.spacing.medium};
`;

const CardIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    #a67dff 0%,
    #7e57c2 100%
  ); // Gradiente roxo similar ao ícone
  flex-shrink: 0;
  i {
    color: white;
    font-size: 1.25rem;
  }
`;

const CardInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const CardTitle = styled.span`
  font-size: 0.875rem; // 14px
  font-weight: bolder;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
  margin-left: ${({ theme }) => theme.spacing.small};
`;

const CardSubtitle = styled.span`
  font-size: 0.875rem; // 14px
  font-weight: bolder;
  color: ${({ theme }) => theme.colors.textLight};
`;

const CardValueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  margin-left: ${({ theme }) => theme.spacing.small};
`;

const CardAmount = styled.span`
  font-size: 0.875rem; // 14px
  font-weight: bolder;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`;

const CardItemCount = styled.span`
  font-size: 0.75rem; // 12px
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 4px;
`;

// Styled PrimeChip for status
const StatusChip = styled(PrimeChip)<{ status: Boleto['status'] }>`
  font-size: 0.85rem !important; // Use !important cautiously if needed
  font-weight: bolder !important;
  height: 20px !important;
  padding: 2px 8px !important;
  border-radius: ${({ theme }) => theme.borderRadius.small} !important;
  background-color: ${({ theme, status }) =>
    status === 'Pago'
      ? '#E4F6E8'
      : theme.colors.secondary} !important; // Light green or gray
  color: ${({ theme, status }) =>
    status === 'Pago'
      ? theme.colors.success
      : theme.colors.textLight} !important;
  font-weight: 500;

  .p-chip-label {
    line-height: 1.2; // Adjust line height if needed
  }
`;

const ArrowIcon = styled.i`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1rem;
  margin-left: ${({ theme }) => theme.spacing.small};
  flex-shrink: 0;
`;
