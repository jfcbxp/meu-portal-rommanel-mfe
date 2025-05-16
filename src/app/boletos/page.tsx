'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { Button as PrimeButton } from 'primereact/button';
import { mockBoletos } from '@/utils/mock';
import Boletos from '@/components/lists/boletos';

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

export default function BoletosPage() {
  const [filterActive, setFilterActive] = useState<'30dias' | null>(null);

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

        <Boletos filterActive={filterActive} boletos={mockBoletos} />
      </ContentWrapper>
    </PageContainer>
  );
}
