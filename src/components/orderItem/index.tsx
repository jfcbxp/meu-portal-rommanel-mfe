import { Boleto } from '@/types/index';
import styled from 'styled-components';
import StatusChip from '../labels/status-chip';
import BoletoItems from '../lists/boletos/items';
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

interface Properties {
  boleto: Boleto;
}

export default function OrderItem({ boleto }: Readonly<Properties>) {
  const toast = useRef<Toast>(null);
  const handleCopy = () => {
    if (boleto?.codigoBarras) {
      navigator.clipboard
        .writeText(boleto.codigoBarras)
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
    <ContentWrapper>
      <BoletoInfoContainer>
        <BoletoNumber>{`Boleto nº ${boleto.id}`}</BoletoNumber>
        <BoletoValue>{`R$ ${boleto.valor}`}</BoletoValue>
        <DetailsRow>
          <DetailItem>
            <p>Quantidade</p>
            <p>{`${boleto.itens.length} item${
              boleto.itens.length > 1 ? 's' : ''
            }`}</p>
          </DetailItem>
          <DetailItemRight>
            <p>Status</p>
            <StatusChip status={boleto.status} />
          </DetailItemRight>
        </DetailsRow>
        <StyledDivider />
      </BoletoInfoContainer>

      <BoletoItems boleto={boleto} />

      <PaymentMethodContainer>
        <SectionTitle>Forma de pagamento</SectionTitle>
        <PaymentMethodRow>
          {(() => {
            switch (boleto.formaPagamento) {
              case 'Boleto':
                return <FaBarcode size={24} />;
              case 'Cartão de Crédito':
                return <FaRegCreditCard size={24} />;
              case 'Pix':
                return <FaQrcode size={24} />;
              default:
                return <FaMoneyBill size={24} />;
            }
          })()}
          <span>{boleto.formaPagamento}</span>
        </PaymentMethodRow>
      </PaymentMethodContainer>

      <Button
        icon={<FaClipboard size={24} style={{ marginRight: '0.5rem' }} />}
        label="Copiar Código de Barras"
        onClick={handleCopy}
      />
    </ContentWrapper>
  );
}

const ContentWrapper = styled.main`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.large};
`;

const BoletoInfoContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const BoletoNumber = styled.p`
  font-size: 0.875rem; // 14px
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0 0 ${({ theme }) => theme.spacing.small};
`;

const BoletoValue = styled.p`
  font-size: 1.5rem; // 24px
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing.medium};
`;

const DetailsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DetailItem = styled.div`
  p:first-child {
    font-size: 0.875rem; // 14px
    color: ${({ theme }) => theme.colors.textLight};
    margin: 0 0 4px;
  }
  p:last-child {
    font-size: 1rem; // 16px
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
  }
`;

const DetailItemRight = styled(DetailItem)`
  text-align: right;
`;

const SectionTitle = styled.h2`
  font-size: 0.875rem; // 14px
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0 0 ${({ theme }) => theme.spacing.medium};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  padding-bottom: ${({ theme }) => theme.spacing.small};
`;

const StyledDivider = styled.div`
  margin: ${({ theme }) => theme.spacing.large} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
`;

const PaymentMethodContainer = styled.div``;

const PaymentMethodRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.medium};

  i {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.25rem;
  }

  span {
    font-size: 1rem; // 16px
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
  }
`;
