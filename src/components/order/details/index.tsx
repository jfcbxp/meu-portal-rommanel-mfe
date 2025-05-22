'use client';

import React, { Suspense, useRef } from 'react';
import styled from 'styled-components';
import { Toast } from 'primereact/toast';
import OrderContent from '@/components/order';
import { Order } from '@/types/index';
import FullScreenModal from '@/components/modals/fullscreen';
import Header from '@/components/header';

interface OrderDetailContentProps {
  order?: Order;
  setVisible: (visible: boolean) => void;
}

function OrderDetailContent({
  order,
  setVisible,
}: Readonly<OrderDetailContentProps>) {
  const toast = useRef<Toast>(null);

  if (!order) {
    return (
      <FullScreenModal>
        <Header title="Detalhe do Boleto" onClick={setVisible} />
        <ContentWrapper>
          <p style={{ textAlign: 'center', color: '#666' }}>
            Order não encontrado.
          </p>
        </ContentWrapper>
      </FullScreenModal>
    );
  }

  return (
    <FullScreenModal>
      <Toast ref={toast} />
      <Header title="Detalhe do Boleto" onClick={setVisible} />

      <OrderContent order={order} />
    </FullScreenModal>
  );
}

interface OrderDetailsProps {
  order?: Order;
  setVisible: (visible: boolean) => void;
}

export default function OrderDetails({
  order,
  setVisible,
}: Readonly<OrderDetailsProps>) {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <OrderDetailContent order={order} setVisible={setVisible} />
    </Suspense>
  );
}

// Styled Components
const ContentWrapper = styled.main`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.large};
`;
