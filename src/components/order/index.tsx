import { OrderContent } from '@/types/index';

import StatusChip from '../labels/statusChip';
import OrderItems from '../lists/orders/items';
import Button from '../buttons/button';
import {
  FaBarcode,
  FaClipboard,
  FaMoneyBill,
  FaQrcode,
  FaRegCreditCard,
} from 'react-icons/fa';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import toBRL from '@/utils/toBRL';
import {
  Container,
  DetailItem,
  DetailItemRight,
  DetailsRow,
  OrderInfoContainer,
  OrderNumber,
  OrderValue,
  PaymentMethodContainer,
  PaymentMethodRow,
  SectionTitle,
  StyledDivider,
} from './styles';

interface Properties {
  order: OrderContent;
  items?: OrderContent['items'];
}

export default function OrderContentComponent({
  order,
  items,
}: Readonly<Properties>) {
  const toast = useRef<Toast>(null);

  const handleCopy = () => {
    if (order?.barcode) {
      navigator.clipboard
        .writeText(order.barcode)
        .then(() => {
          toast.current?.show({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Código de barras copiado!',
            life: 3000,
          });
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
          toast.current?.show({
            severity: 'error',
            summary: 'Erro',
            detail: 'Falha ao copiar código de barras.',
            life: 3000,
          });
        });
    }
  };

  return (
    <Container>
      <OrderInfoContainer>
        <OrderNumber>{`Valor referente a parcela nº ${order.installment}`}</OrderNumber>
        <OrderValue>{`${toBRL(order.amount)}`}</OrderValue>
        <DetailsRow>
          <DetailItem>
            <p>Quantidade</p>
            <p>{`${order.quantity} item${order.quantity > 1 ? 's' : ''}`}</p>
          </DetailItem>
          <DetailItemRight>
            <p>Status</p>
            <StatusChip status={order.status} />
          </DetailItemRight>
        </DetailsRow>
        <StyledDivider />
      </OrderInfoContainer>

      <OrderItems order={order} items={items} />

      <PaymentMethodContainer>
        <SectionTitle>Forma de pagamento</SectionTitle>
        <PaymentMethodRow>
          {(() => {
            switch (order.type) {
              case 'BOL':
                return <FaBarcode size={24} />;
              case 'NP':
                return <FaQrcode size={24} />;
              default:
                return <FaMoneyBill size={24} />;
            }
          })()}
          <span>{order.typeDescription}</span>
        </PaymentMethodRow>
      </PaymentMethodContainer>

      <Button
        icon={<FaClipboard size={24} style={{ marginRight: '0.5rem' }} />}
        label="Copiar Código de Barras"
        disabled={!order.barcode}
        onClick={handleCopy}
      />
    </Container>
  );
}
