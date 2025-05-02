'use client';

import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { Button as PrimeButton } from 'primereact/button';
import { Chip as PrimeChip } from 'primereact/chip';
import { useRouter } from 'next/navigation';
import { mockBoletos } from '@/utils/mock';
import { Boleto } from '@/types/index';
import { useAuth } from '@/contexts/AuthContext';

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const HeaderSim = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.headerBackground};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  width: 100%;

  .p-button {
    color: ${({ theme }) => theme.colors.iconColor};
  }
`;

const BreadcrumbSim = styled.div`
  padding: ${({ theme }) => theme.spacing.small}
    ${({ theme }) => theme.spacing.medium};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textLight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
`;

const ContentWrapper = styled.main`
  padding: ${({ theme }) => theme.spacing.large};
  flex-grow: 1;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const Title = styled.h1`
  font-size: 1.5rem; // 24px
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.large};
  flex-wrap: wrap; // Allow filters to wrap on smaller screens
`;

// Styled PrimeButton for filters
const FilterButton = styled(PrimeButton)<{ $active?: boolean }>`
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.secondary : theme.colors.background};
  color: ${({ theme }) => theme.colors.textLight};
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.small}
    ${({ theme }) => theme.spacing.medium};
  font-size: 0.875rem;
  height: auto;
  min-width: auto;

  .p-button-icon {
    font-size: 1rem; // Adjust icon size if needed
    margin-right: ${({ theme }) => theme.spacing.small};
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const ClearButton = styled(PrimeButton)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textLight};
  border: none;
  padding: ${({ theme }) => theme.spacing.small}
    ${({ theme }) => theme.spacing.small};
  font-size: 0.875rem;
  height: auto;
  min-width: auto;

  .p-button-icon {
    font-size: 0.75rem; // Smaller icon
    margin-right: 4px;
  }
`;

const AvisoContainer = styled.div`
  display: flex;
  align-items: flex-start; // Align icon and text to the top
  background-color: ${({ theme }) => theme.colors.info};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.large};
  border: 1px solid #bee5eb; // Slightly darker border for info color
`;

const AvisoIcon = styled.i`
  color: ${({ theme }) => theme.colors.infoText};
  font-size: 1.25rem; // Adjust icon size
  margin-right: ${({ theme }) => theme.spacing.medium};
  margin-top: 2px; // Align icon slightly better with text
  flex-shrink: 0;
`;

const AvisoText = styled.p`
  font-size: 0.875rem; // 14px
  color: ${({ theme }) => theme.colors.infoText};
  line-height: 1.4;
  margin: 0;
`;

const DateHeader = styled.h2`
  font-size: 1rem; // 16px
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-top: ${({ theme }) => theme.spacing.large};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out;
  gap: ${({ theme }) => theme.spacing.medium};

  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
  }
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
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`;

const CardSubtitle = styled.span`
  font-size: 0.75rem; // 12px
  color: ${({ theme }) => theme.colors.textLight};
`;

const CardValueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;
  margin-left: ${({ theme }) => theme.spacing.small};
`;

const CardAmount = styled.span`
  font-size: 0.875rem; // 14px
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`;

const CardItemCount = styled.span`
  font-size: 0.75rem; // 12px
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 4px;
`;

// Styled PrimeChip for status
const StatusChip = styled(PrimeChip)<{ status: Boleto['status'] }>`
  font-size: 0.75rem !important; // Use !important cautiously if needed
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

export default function BoletosPage() {
  const [filterActive, setFilterActive] = useState<'30dias' | null>(null);
  const router = useRouter();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      router.push('/login'); // Redireciona para a página de login se não houver token
    }
  }, [token, router]);

  const filteredBoletos = useMemo(() => {
    if (filterActive === '30dias') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return mockBoletos.filter(
        boleto => new Date(boleto.data + 'T00:00:00') >= thirtyDaysAgo,
      );
    }
    return mockBoletos; // No filter applied
  }, [filterActive]);

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
        return dateB.getTime() - dateA.getTime(); // Sort descending
      }),
    [groupedBoletos],
  );

  if (!token) {
    return null; // Evita renderizar a página enquanto redireciona
  }

  const handleCardClick = (id: string) => {
    router.push(`/detalhesBoleto?id=${id}`);
  };

  return (
    <PageContainer>
      {/* Simulated Header */}
      <HeaderSim>
        <PrimeButton
          icon="pi pi-bars"
          text
          rounded
          severity="secondary"
          aria-label="Menu"
        />
        <span className="font-medium text-lg">Meus Boletos</span>
        <PrimeButton
          icon="pi pi-shopping-cart"
          text
          rounded
          severity="secondary"
          aria-label="Cart"
        />
      </HeaderSim>

      <BreadcrumbSim>Início / Meus boletos</BreadcrumbSim>

      <ContentWrapper>
        <TitleRow>
          <Title>Boletos</Title>
          <PrimeButton
            icon="pi pi-question-circle"
            text
            rounded
            severity="secondary"
            aria-label="Help"
          />
        </TitleRow>

        <FilterContainer>
          <FilterButton label="Filtrar" icon="pi pi-filter" />
          <FilterButton
            label="30 dias"
            $active={filterActive === '30dias'}
            onClick={() => setFilterActive('30dias')}
          />
          {filterActive && (
            <ClearButton
              label="Limpar"
              icon="pi pi-times"
              onClick={() => setFilterActive(null)}
            />
          )}
        </FilterContainer>

        <AvisoContainer>
          <AvisoIcon className="pi pi-info-circle"></AvisoIcon>
          <AvisoText>
            Boletos pagos podem demorar até 3 dias para serem atualizados
          </AvisoText>
        </AvisoContainer>

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
                <CardIconWrapper>
                  <i className="pi pi-dollar"></i>
                </CardIconWrapper>
                <CardInfoWrapper>
                  <CardTitle>{boleto.compra}</CardTitle>
                  <CardSubtitle>{`nº ${boleto.id}`}</CardSubtitle>
                </CardInfoWrapper>
                <CardValueWrapper>
                  <CardAmount>{`R$ ${boleto.valor}`}</CardAmount>
                  <CardItemCount>{`${boleto.quantidadeItens} item${
                    boleto.quantidadeItens > 1 ? 's' : ''
                  }`}</CardItemCount>
                  <StatusChip label={boleto.status} status={boleto.status} />
                </CardValueWrapper>
                <ArrowIcon className="pi pi-chevron-right"></ArrowIcon>
              </CardWrapper>
            ))}
          </div>
        ))}
      </ContentWrapper>
    </PageContainer>
  );
}
