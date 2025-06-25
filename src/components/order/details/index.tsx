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
  items?: OrderContent['items'];
  showPaginator: boolean;
  setShowPaginator: (show: boolean) => void;
  isMobile: boolean;
}

function OrderDetailContent(properties: Readonly<OrderDetailContentProps>) {
  const toast = useRef<Toast>(null);

  if (!properties.order) {
    return (
      <FullScreenModal>
        <Header
          title="Detalhes do Pagamento"
          onClick={properties.setVisible}
          showPaginator={properties.showPaginator}
          setShowPaginator={properties.setShowPaginator}
        />
        <Container>
          <p style={{ textAlign: 'center', color: '#666' }}>
            Pagamento não encontrado.
          </p>
        </Container>
      </FullScreenModal>
    );
  }

  return (
    <FullScreenModal>
      <Toast ref={toast} />
      <Header
        title="Detalhes do Pagamento"
        onClick={properties.setVisible}
        showPaginator={properties.showPaginator}
        setShowPaginator={properties.setShowPaginator}
      />

      <OrderContentComponent
        order={properties.order}
        items={properties.items}
        isMobile={properties.isMobile}
      />
    </FullScreenModal>
  );
}

interface OrderDetailsProps {
  order?: OrderContent;
  items?: OrderContent['items'];
  setVisible: (visible: boolean) => void;
  showPaginator: boolean;
  setShowPaginator: (show: boolean) => void;
  isMobile: boolean;
}

export default function OrderDetails(properties: Readonly<OrderDetailsProps>) {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <OrderDetailContent
        order={properties.order}
        items={properties.items}
        setVisible={properties.setVisible}
        showPaginator={properties.showPaginator}
        setShowPaginator={properties.setShowPaginator}
        isMobile={properties.isMobile}
      />
    </Suspense>
  );
}
