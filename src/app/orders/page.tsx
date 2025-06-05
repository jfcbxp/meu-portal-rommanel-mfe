'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

import Orders from '@/components/lists/orders';
import useIsMobile from '@/hooks/useIsMobile';
import Header from '@/components/header';
import OrdersFilter from '@/components/filters/orders';
import { CnD } from '@/types/index';
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
import LoadingComponent from '@/components/loading';
import useIsOpened from '@/hooks/useIsOpened';

export default function OrdersPage() {
  const [paymentTypes, setPaymentTypes] = useState<CnD[]>([]);
  const [status, setStatus] = useState<CnD[]>([]);
  const [periods, setPeriods] = useState<CnD[]>([]);
  const [paymentTypeActive, setPaymentTypeActive] = useState<CnD>();
  const [statusActive, setStatusActive] = useState<CnD>();
  const [periodActive, setPeriodActive] = useState<CnD>();
  const isMobile = useIsMobile();
  const isOpened = useIsOpened();
  const [visible, setVisible] = useState(false);
  const { token, checkRequestError } = useAuthContext();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const initialized = useRef(false);

  const filters = useMemo(
    () => ({
      period: periodActive?.code,
      type: paymentTypeActive?.code,
      status: statusActive?.code,
      start: startDate?.toISOString().split('T')[0],
      end: endDate?.toISOString().split('T')[0],
    }),
    [periodActive, paymentTypeActive, statusActive, startDate, endDate],
  );

  const [activeFilters, setActiveFilters] = useState(filters);

  const {
    data: order,
    isLoading,
    error,
  } = usePaymentsQuery({
    token,
    page: Math.floor(first / rows) + 1,
    status: activeFilters.status,
    type: activeFilters.type,
    startDate: activeFilters.start,
    endDate: activeFilters.end,
  });

  useEffect(() => {
    checkRequestError(error);
  }, [error, checkRequestError]);

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

  useEffect(() => {
    if (periodActive?.code) {
      const days = parseInt(periodActive.code, 10);
      const today = new Date();
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - days);

      const endDate = new Date(today);
      endDate.setDate(today.getDate() + days);

      setStartDate(startDate);
      setEndDate(endDate);
    } else {
      setStartDate(undefined);
      setEndDate(undefined);
    }
  }, [periodActive]);

  useEffect(() => {
    if (
      (filters.start && !filters.end) ||
      (!filters.start && filters.end) ||
      (isMobile && visible)
    ) {
      return;
    }
    if (JSON.stringify(filters) !== JSON.stringify(activeFilters)) {
      setFirst(0);
      setActiveFilters(filters);
    }
  }, [filters, activeFilters, isMobile, visible]);

  const onPageChange = async event => {
    setFirst(event.first);
    setRows(event.rows);
  };

  if (!token || isLoading) return <LoadingComponent />;

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
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
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
          Pagamentos podem demorar até 3 dias para serem atualizados
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
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
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

          {token && order && !(isMobile && isOpened) && (
            <PaymentPaginator
              first={first}
              rows={rows}
              totalRecords={order.totalElements}
              onPageChange={onPageChange}
              pageLinkSize={isMobile ? 3 : 5}
            />
          )}
        </div>
      </PaymentContentWrapper>
    </PaymentContainer>
  );
}
