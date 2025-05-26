'use client';

import React, { useEffect, useRef, useState } from 'react';

import Orders from '@/components/lists/orders';
import useIsMobile from '@/hooks/useIsMobile';
import Header from '@/components/header';
import OrdersFilter from '@/components/filters/orders';
import { Cd } from '@/types/index';
import { useAuthContext } from '@/contexts/AuthContext';
import {
  PaymentBreadcrumb,
  PaymentContainer,
  PaymentContentWrapper,
  PaymentFilterButton,
  PaymentFilterButtonsContainer,
  PaymentFilterContainer,
  PaymentFilterTitle,
  PaymentFilterTitleContainer,
  PaymentPaginator,
  ToastContainer,
  ToastInfoIcon,
  ToastInfoText,
} from './styles';
import { usePaymentsQuery } from '../../hooks/usePaymentQuery';

export default function OrdersPage() {
  const [paymentTypes, setPaymentTypes] = useState<Cd[]>([]);
  const [status, setStatus] = useState<Cd[]>([]);
  const [periods, setPeriods] = useState<Cd[]>([]);
  const [paymentTypeActive, setPaymentTypeActive] = useState<Cd>();
  const [statusActive, setStatusActive] = useState<Cd>();
  const [periodActive, setPeriodActive] = useState<Cd>();
  const isMobile = useIsMobile();
  const [visible, setVisible] = useState(false);
  const { token } = useAuthContext();
  const [date, setDate] = React.useState<Date[] | undefined>();

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const initialized = useRef(false);

  const {
    data: order,
    isLoading,
    isError,
  } = usePaymentsQuery({
    token,
    page: Math.floor(first / rows) + 1,
    status: statusActive?.code,
    type: paymentTypeActive?.code,
    date,
  });

  useEffect(() => {
    if (
      order &&
      typeof order === 'object' &&
      Array.isArray(order.content) &&
      !initialized.current
    ) {
      setPaymentTypes(order.types);
      setStatus(order.status);
      setPeriods(order.days);
      initialized.current = true;
    }
  }, [order]);

  const onPageChange = async event => {
    setFirst(event.first);
    setRows(event.rows);
  };

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

  if (isLoading) return <div>Carregando pedidos...</div>;
  if (isError) return <div>Erro ao carregar pedidos.</div>;

  return (
    <PaymentContainer>
      <Header></Header>

      <PaymentBreadcrumb>Início / Meus Pagamentos</PaymentBreadcrumb>

      <ToastContainer>
        <ToastInfoIcon>
          <i>i</i>
        </ToastInfoIcon>
        <ToastInfoText>
          Boletos pagos podem demorar até 3 dias para serem atualizados
        </ToastInfoText>
      </ToastContainer>

      <PaymentContentWrapper
        style={{ flexDirection: isMobile ? 'column' : 'row' }}
      >
        <PaymentFilterContainer>
          <PaymentFilterTitleContainer>
            <PaymentFilterTitle>Filtros</PaymentFilterTitle>
          </PaymentFilterTitleContainer>

          {isMobile ? (
            <PaymentFilterButtonsContainer>
              <PaymentFilterButton
                label="Filtrar"
                icon="pi pi-filter"
                onClick={() => setVisible(true)}
              />
            </PaymentFilterButtonsContainer>
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
        </PaymentFilterContainer>
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
            <PaymentPaginator
              first={first}
              rows={rows}
              totalRecords={order.totalElements}
              onPageChange={onPageChange}
            />
          )}
        </div>
      </PaymentContentWrapper>
    </PaymentContainer>
  );
}
