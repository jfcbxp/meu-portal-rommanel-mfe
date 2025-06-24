import { OrderContent, Payment } from '@/types/index';
import { useRef, useState } from 'react';

import StatusChip from '../labels/statusChip';
import OrderItems from '../lists/orders/items';
import Button from '../buttons/button';
import { FaBarcode, FaClipboard, FaMoneyBill, FaQrcode } from 'react-icons/fa';
import { Toast } from 'primereact/toast';
import toBRL from '@/utils/toBRL';
import {
  Container,
  DetailItem,
  DetailItemRight,
  DetailsRow,
  DialogContent,
  DialogPanel,
  OrderAmount,
  OrderBalance,
  OrderInfoContainer,
  OrderNumber,
  PaymentMethodContainer,
  PaymentMethodRow,
  SectionTitle,
  StyledDivider,
} from './styles';
import { Dialog } from 'primereact/dialog';
import { fecthPayment } from 'src/services/fetchPayment';
import { useAuthContext } from '@/contexts/AuthContext';

interface Properties {
  order: OrderContent;
  items?: OrderContent['items'];
}

export default function OrderContentComponent({
  order,
  items,
}: Readonly<Properties>) {
  const toast = useRef<Toast>(null);
  const buttonDisabled_ =
    (order.type == 'BOL' && order.barcode !== '') || order.type !== 'BOL';
  const [buttonDisabled, setButtonDisabled] = useState(!buttonDisabled_);
  const [showDialog, setShowDialog] = useState(false);
  const [payment, setPayment] = useState<Payment | undefined>();
  const token = useAuthContext().token;

  const showPayment = async (order: OrderContent) => {
    await fecthPayment(
      token,
      order.branch,
      order.document,
      order.version,
      order.type,
      order.installment,
    ).then(data => {
      if (typeof data === 'string') {
        toast.current?.show({
          severity: 'error',
          summary: 'Erro',
          detail: data,
          life: 3000,
        });
      } else {
        setPayment(data);
        setShowDialog(!showDialog);
      }
    });
  };

  const handleCopy = () => {
    if (order?.barcode) {
      const textarea = document.createElement('textarea');
      textarea.value = order.barcode;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand('copy');
        toast.current?.show({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Código de barras copiado!',
          life: 3000,
        });
        setButtonDisabled(true);
        setTimeout(() => setButtonDisabled(false), 5000);
      } catch (err) {
        toast.current?.show({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao copiar código de barras.',
          life: 3000,
        });
      }
      document.body.removeChild(textarea);
    }
  };

  return (
    <Container>
      <Toast ref={toast} position="bottom-center" />
      <OrderInfoContainer>
        <OrderNumber>{`Valor referente a parcela nº ${order.installment}`}</OrderNumber>
        <OrderBalance>{`${toBRL(
          order.balance > 0 ? order.balance : order.amount,
        )}`}</OrderBalance>
        {order.status === 'Pago Parcialmente' && (
          <OrderAmount>{`${toBRL(order.amount)}`}</OrderAmount>
        )}
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

      {order.status !== 'Pago' && (
        <Button
          icon={
            order.type == 'BOL' ? (
              <FaClipboard size={24} style={{ marginRight: '0.5rem' }} />
            ) : (
              <FaMoneyBill size={24} style={{ marginRight: '0.5rem' }} />
            )
          }
          label={order.type == 'BOL' ? 'Copiar Código de Barras' : 'Pagar'}
          disabled={buttonDisabled}
          onClick={() => showPayment(order)}
        />
      )}

      {showDialog && payment && (
        <Dialog
          visible={showDialog}
          onHide={() => setShowDialog(false)}
          header={`Pagamento da Parcela nº ${order.installment}`}
          draggable={false}
          style={{ margin: '1rem' }}
        >
          <DialogContent>
            <DialogPanel>
              <div>
                <h4>Valor original</h4>
                <strong>{toBRL(payment.amount)}</strong>
              </div>
              <div>
                <h4>Juros</h4>
                <strong>{toBRL(payment.tax)}</strong>
              </div>
              <div>
                <h4>Multa</h4>
                <strong>{toBRL(payment.fee)}</strong>
              </div>
            </DialogPanel>
            <Button
              icon={<FaClipboard size={24} style={{ marginRight: '0.5rem' }} />}
              label={'Copiar Chave Pix'}
              onClick={handleCopy}
            />
          </DialogContent>
        </Dialog>
      )}
    </Container>
  );
}
