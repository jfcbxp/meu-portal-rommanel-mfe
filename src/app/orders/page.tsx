'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button as PrimeButton } from 'primereact/button';
import Orders from '@/components/lists/orders';
import useIsMobile from '@/hooks/useIsMobile';
import Header from '@/components/header';
import OrdersFilter from '@/components/filters/orders';
import { Cd, Order } from '@/types/index';
import { fetchOrders } from '../services';
import { useAuth } from '@/contexts/AuthContext';
import { Paginator } from 'primereact/paginator';

export default function OrdersPage() {
  const [paymentTypes, setPaymentTypes] = useState<Cd[]>([]);
  const [status, setStatus] = useState<Cd[]>([]);
  const [periods, setPeriods] = useState<Cd[]>([]);
  const [order, setOrder] = useState<Order>(undefined);
  const [paymentTypeActive, setPaymentTypeActive] = useState<Cd>();
  const [statusActive, setStatusActive] = useState<Cd>();
  const [periodActive, setPeriodActive] = useState<Cd>();
  const isMobile = useIsMobile();
  const [visible, setVisible] = useState(false);
  const { token } = useAuth();
  const [date, setDate] = React.useState<Date[] | undefined>();

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const initialized = useRef(false);

  const fetchData = useCallback(
    async (
      token?: string,
      page?: number,
      status?: string,
      type?: string,
      date?: Date[],
    ) => {
      if (token) {
        const response = await fetchOrders(
          token,
          page,
          status,
          type,
          date?.[0]?.toISOString().split('T')[0],
          date?.[1]?.toISOString().split('T')[0],
        );

        if (
          response &&
          typeof response === 'object' &&
          Array.isArray(response.content)
        ) {
          setOrder(response);
          if (!initialized.current) {
            setPaymentTypes(response.types);
            setStatus(response.status);
            setPeriods(response.days);
            initialized.current = true;
          }
        } else if (typeof response === 'string') {
          alert(response);
        }
      }
    },
    [],
  );

  const onPageChange = async event => {
    setFirst(event.first);
    setRows(event.rows);
  };

  useEffect(() => {
    fetchData(
      token,
      Math.floor(first / rows) + 1,
      statusActive?.code,
      paymentTypeActive?.code,
      date,
    );
  }, [token, date, statusActive, paymentTypeActive, fetchData, first, rows]);

  if (visible) {
    return (
      <OrdersFilter
        status={status}
        statusActive={statusActive}
        setStatusActive={setStatusActive}
        periods={periods}
        paymentTypes={paymentTypes}
        paymentTypeActive={paymentTypeActive}
        setPaymentTypeActive={setPaymentTypeActive}
        periodActive={periodActive}
        setPeriodActive={setPeriodActive}
        setVisible={setVisible}
        date={date}
        setDate={setDate}
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
              status={status}
              statusActive={statusActive}
              setStatusActive={setStatusActive}
              periods={periods}
              paymentTypes={paymentTypes}
              paymentTypeActive={paymentTypeActive}
              setPaymentTypeActive={setPaymentTypeActive}
              periodActive={periodActive}
              setPeriodActive={setPeriodActive}
              setVisible={setVisible}
              date={date}
              setDate={setDate}
            />
          )}
        </FilterContainer>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: isMobile ? 1 : 2,
          }}
        >
          {order && (
            <Orders
              paymentTypeActive={paymentTypeActive}
              periodActive={periodActive}
              orders={order.content}
            />
          )}

          {token && order && (
            <StyledPaginator
              first={first}
              rows={rows}
              totalRecords={order.totalElements}
              onPageChange={onPageChange}
            />
          )}
        </div>
      </ContentWrapper>
    </PageContainer>
  );
}

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
  font-size: 1.5rem;
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
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.small};
`;

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
    font-size: 1rem;
    margin-right: ${({ theme }) => theme.spacing.small};
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.colors.info};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.large};
  border: 1px solid #bee5eb;
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
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.infoText};
  line-height: 1.4;
  margin: 0;
`;

const StyledPaginator = styled(Paginator)`
  margin-top: 36px;
  .p-highlight {
    color: white !important;
    background: #a259d9 !important;
  }
`;
