'use client';

import React, { Suspense, useRef } from 'react';

import { Toast } from 'primereact/toast';
import OrderContentComponent from '@/components/order';
import { OrderContent } from '@/types/index';
import FullScreenModal from '@/components/modals/fullscreen';
import Header from '@/components/header';
import { Container } from './styles';

interface OrderDetailContentProps {
  order?: OrderContent;
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
        <Container>
          <p style={{ textAlign: 'center', color: '#666' }}>
            Order não encontrado.
          </p>
        </Container>
      </FullScreenModal>
    );
  }

  return (
    <FullScreenModal>
      <Toast ref={toast} />
      <Header title="Detalhe do Boleto" onClick={setVisible} />

      <OrderContentComponent order={order} />
    </FullScreenModal>
  );
}

interface OrderDetailsProps {
  order?: OrderContent;
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
