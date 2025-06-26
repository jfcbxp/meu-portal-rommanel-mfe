import { OrderContent, Payment } from '@/types/index';
import { useRef, useState } from 'react';

import StatusChip from '../labels/statusChip';
import OrderItems from '../lists/orders/items';
import Button from '../buttons/button';
import {
  FaBarcode,
  FaCheckCircle,
  FaClipboard,
  FaMoneyBill,
  FaQrcode,
} from 'react-icons/fa';
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
import Image from 'next/image';
import pix from '@/public/pix-svgrepo-com.svg';
import theme from '@/styles/theme';
import { jwtDecode } from 'jwt-decode';

interface Properties {
  order: OrderContent;
  items?: OrderContent['items'];
  isMobile: boolean;
}

export default function OrderContentComponent({
  order,
  items,
  isMobile,
}: Readonly<Properties>) {
  const toast = useRef<Toast>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showInnerConfirmation, setShowInnerConfirmation] = useState(false);
  const [payment, setPayment] = useState<Payment | undefined>();
  const token = useAuthContext().token;
  const [payButtonDisabled, setPayButtonDisabled] = useState(false);

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
          summary: 'Erro ao criar o checkout de pagamento',
          detail: 'tente novamente mais tarde',
          life: 3000,
        });
      } else {
        setPayment(data);
        setShowDialog(!showDialog);
      }
    });
  };

  const handleCopy = () => {
    if (order?.barcode && order.type === 'BOL') {
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
      } catch (err) {
        if (err instanceof Error) {
          console.error('Erro ao copiar código de barras:', err.message);
        }
        toast.current?.show({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao copiar código de barras.',
          life: 3000,
        });
      }
      document.body.removeChild(textarea);
    } else {
      setShowConfirmation(true);
      const textarea = document.createElement('textarea');
      textarea.value = payment?.pix || '';
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
          detail: 'Chave Pix copiada!',
          life: 3000,
        });
      } catch (err) {
        if (err instanceof Error) {
          console.error('Erro ao copiar chave pix:', err.message);
        }
        toast.current?.show({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao copiar chave pix.',
          life: 3000,
        });
      }
      document.body.removeChild(textarea);
    }
  };

  const onPressWhatsApp = (phone: string, name?: string) => {
    phone = phone.trim().replace(/\s/g, '').replace('-', '');
    if (phone.startsWith('0')) {
      phone = phone.slice(1);
    }
    phone = `55${phone}`;
    let text = `Olá, eu sou cliente, me chamo ${name} e gostaria de enviar o comprovante de pagamento da parcela nº ${order.installment} do pedido ${order.document}.`;
    const encodedText = encodeURIComponent(text);
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedText}`;
    window.open(url, '_blank');
  };

  return (
    <Container>
      <Toast ref={toast} position="bottom-center" />
      <OrderInfoContainer>
        <OrderNumber>{`Valor referente a parcela nº ${order.installment}`}</OrderNumber>
        <DetailsRow>
          <OrderBalance>{`${toBRL(
            order.balance > 0 ? order.balance : order.amount,
          )}`}</OrderBalance>
          {order.status === 'Pago Parcialmente' && (
            <OrderAmount>{`${toBRL(order.amount)}`}</OrderAmount>
          )}
        </DetailsRow>
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
          icon={<FaMoneyBill size={24} style={{ marginRight: '0.5rem' }} />}
          label={'Pagar'}
          disabled={payButtonDisabled}
          loading={payButtonDisabled}
          onClick={() => {
            setPayButtonDisabled(true);
            if (order.type !== 'BOL') {
              showPayment(order);
            } else {
              setShowDialog(true);
            }
            setTimeout(() => setPayButtonDisabled(false), 3000);
          }}
        />
      )}
      {showDialog && (
        <Dialog
          visible={showDialog}
          blockScroll
          onHide={() => {
            setShowDialog(false);
            setShowConfirmation(false);
            setShowInnerConfirmation(false);
          }}
          maximized={isMobile}
          style={{ minWidth: isMobile ? '100%' : '50%' }}
          header={`Pagamento da Parcela nº ${order.installment}`}
          draggable={false}
          headerStyle={{
            width: '100%',
            padding: '16px',
            backgroundColor: 'whitesmoke',
          }}
          contentStyle={{ padding: '24px', backgroundColor: 'whitesmoke' }}
        >
          <DialogContent
            style={{ display: !showConfirmation ? 'flex' : 'none' }}
          >
            {payment && !showInnerConfirmation && (
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
                <div
                  style={{
                    borderBottom: '1px solid silver',
                  }}
                ></div>
                <div>
                  <h4 style={{ fontSize: 'large', fontWeight: 'bolder' }}>
                    Valor Total:
                  </h4>
                  <strong style={{ fontSize: 'x-large' }}>
                    {toBRL(payment.total)}
                  </strong>
                </div>
              </DialogPanel>
            )}
            {!showInnerConfirmation && <h4>Forma de Pagamento:</h4>}
            <DialogPanel
              style={{ display: showInnerConfirmation ? 'none' : 'flex' }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'initial',
                  gap: '0.5rem',
                }}
              >
                {order.type === 'BOL' ? (
                  <FaBarcode
                    size={24}
                    style={{ color: theme.colors.primary }}
                  />
                ) : (
                  <Image alt="pix" src={pix} width={24} height={24}></Image>
                )}
                <h2 style={{ color: theme.colors.primary }}>
                  {order.type == 'BOL' ? 'BOLETO' : 'PIX'}
                </h2>
              </div>
              <div>
                {order.type === 'BOL' ? (
                  <h4>Código de Barras (Copia e Cola):</h4>
                ) : (
                  <h4>Chave Pix (Copia e Cola):</h4>
                )}
              </div>
              <div
                style={{
                  border: '1px solid silver',
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  overflow: 'hidden',
                }}
              >
                {(() => {
                  let displayValue;
                  if (order.type == 'BOL') {
                    displayValue = order.barcode
                      ? order.barcode
                      : 'O boleto não possui código de barras cadastrado, entre em contato com o setor financeiro.';
                  } else {
                    displayValue = payment.pix;
                  }
                  return displayValue;
                })()}
              </div>
              <Button
                icon={
                  <FaClipboard size={24} style={{ marginRight: '0.5rem' }} />
                }
                label={
                  order.type == 'BOL'
                    ? 'Copiar Código de Barras'
                    : 'Copiar Chave Pix'
                }
                onClick={handleCopy}
              />
            </DialogPanel>
          </DialogContent>
          <DialogContent
            style={{
              display: showConfirmation ? 'flex' : 'none',
            }}
          >
            <FaCheckCircle
              size={64}
              style={{
                color: theme.colors.success,
                marginBottom: '1rem',
                alignSelf: 'center',
              }}
            />
            {order.type === 'BOL' ? (
              <>
                <h1 style={{ alignSelf: 'center' }}>
                  Código de barras copiado!
                </h1>
                <h3 style={{ alignSelf: 'center' }}>
                  O pagamento será processado automaticamente em 3 dias úteis
                  após o pagamento.
                </h3>
              </>
            ) : (
              <>
                <h1 style={{ alignSelf: 'center' }}>Chave PIX copiada!</h1>

                <Button
                  label="Já efetuei o pagamento"
                  onClick={() => {
                    setShowConfirmation(false);
                    setShowInnerConfirmation(true);
                  }}
                />
              </>
            )}
          </DialogContent>
          <DialogContent
            style={{
              display: showInnerConfirmation ? 'flex' : 'none',
            }}
          >
            <FaCheckCircle
              size={64}
              style={{
                color: theme.colors.success,
                marginBottom: '1rem',
                alignSelf: 'center',
              }}
            />
            <h1 style={{ alignSelf: 'center' }}>Pagamento concluído!</h1>
            <h3 style={{ alignSelf: 'center' }}>
              Envie o comprovante no WhatsApp
            </h3>
            <h4 style={{ alignSelf: 'center' }}>+55 91 99817-0054</h4>
            <Button
              label="Enviar comprovante no WhatsApp"
              onClick={() =>
                onPressWhatsApp('91 99817-0054', jwtDecode(token)['name'])
              }
            />
          </DialogContent>
        </Dialog>
      )}
    </Container>
  );
}
