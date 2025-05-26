'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import Orders from '@/components/lists/orders';
import useIsMobile from '@/hooks/useIsMobile';
import Header from '@/components/header';
import OrdersFilter from '@/components/filters/orders';
import { Cd, Order } from '@/types/index';
import { fetchOrders } from '../services';
import { useAuth } from '@/contexts/AuthContext';
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
