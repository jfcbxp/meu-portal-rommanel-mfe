'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { Button as PrimeButton } from 'primereact/button';
import { mockOrders, mockPaymentTypes, mockPeriods } from '@/utils/mock';
import Orders from '@/components/lists/orders';
import useIsMobile from '@/hooks/useIsMobile';
import Header from '@/components/header';
import OrdersFilter from '@/components/filters/orders';
import { PaymentTypes } from '@/types/index';

export default function OrdersPage() {
  const paymentTypes = mockPaymentTypes;
  const periods = mockPeriods;
  const [paymentTypeActive, setPaymentTypeActive] = useState<PaymentTypes>(
    paymentTypes[0],
  );
  const [periodActive, setPeriodActive] = useState<PaymentTypes>(periods[0]);
  const isMobile = useIsMobile();
  const [visible, setVisible] = useState(false);

  if (visible) {
    return (
      <OrdersFilter
        paymentTypeActive={paymentTypeActive}
        setPaymentTypeActive={setPaymentTypeActive}
        periodActive={periodActive}
        setPeriodActive={setPeriodActive}
        setVisible={setVisible}
      ></OrdersFilter>
    );
  }

  return (
    <PageContainer>
      <Header></Header>

      <Breadcrumb>Início / Meus boletos</Breadcrumb>

      <InfoContainer>
        <InfoIcon>
          <i>i</i>
        </InfoIcon>
        <InfoText>
          Boletos pagos podem demorar até 3 dias para serem atualizados
        </InfoText>
      </InfoContainer>

      <ContentWrapper style={{ flexDirection: isMobile ? 'column' : 'row' }}>
        <FilterContainer>
          <TitleRow>
            <Title>Filtros</Title>
          </TitleRow>

          {isMobile ? (
            <FilterButtons>
              <FilterButton
                label="Filtrar"
                icon="pi pi-filter"
                onClick={() => setVisible(true)}
              />
            </FilterButtons>
          ) : (
            <OrdersFilter
              paymentTypeActive={paymentTypeActive}
              setPaymentTypeActive={setPaymentTypeActive}
              periodActive={periodActive}
              setPeriodActive={setPeriodActive}
              setVisible={setVisible}
            ></OrdersFilter>
          )}
        </FilterContainer>

        <Orders
          paymentTypeActive={paymentTypeActive}
          periodActive={periodActive}
          orders={mockOrders}
        />
      </ContentWrapper>
    </PageContainer>
  );
}

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Breadcrumb = styled.div`
  padding: ${({ theme }) => theme.spacing.small}
    ${({ theme }) => theme.spacing.medium};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textLight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
`;

const ContentWrapper = styled.main`
  display: flex;
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
  flex-direction: column;
  flex: 1;
  gap: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const FilterButtons = styled.div`
  display: flex;
  flex-wrap: wrap; // Allow buttons to wrap on smaller screens
  gap: ${({ theme }) => theme.spacing.small};
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

const InfoContainer = styled.div`
  display: flex;
  align-items: flex-start; // Align icon and text to the top
  background-color: ${({ theme }) => theme.colors.info};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.large};
  border: 1px solid #bee5eb; // Slightly darker border for info color
  gap: ${({ theme }) => theme.spacing.small};
`;

const InfoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #bee5eb 0%, #bee5eb 100%);
  flex-shrink: 0;
  i {
    color: white;
    font-size: 1.25rem;
    font-weight: bolder;
  }
`;

const InfoText = styled.p`
  font-size: 0.875rem; // 14px
  color: ${({ theme }) => theme.colors.infoText};
  line-height: 1.4;
  margin: 0;
`;
