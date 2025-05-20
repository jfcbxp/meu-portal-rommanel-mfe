'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useRouter, useSearchParams } from 'next/navigation';
import { Toast } from 'primereact/toast';
import { mockBoletos } from '@/utils/mock';
import { useAuth } from '@/contexts/AuthContext';
import {
  FaBarcode,
  FaRegCreditCard,
  FaQrcode,
  FaMoneyBill,
  FaClipboard,
  FaChevronLeft,
  FaTimes,
} from 'react-icons/fa';
import useIsMobile from '@/hooks/useIsMobile';
import Button from '@/components/buttons/button';
import BoletoItems from '@/components/lists/boletos/items';
import StatusChip from '@/components/labels/status-chip';

function BoletoDetailContent() {
  const params = useSearchParams();
  const id = params.get('id');
  const router = useRouter();
  const toast = useRef<Toast>(null);
  const [boleto, setBoleto] = useState(null);
  const { token } = useAuth();

  const isMobile = useIsMobile();

  useEffect(() => {
    if (!token) {
      router.push('/login'); // Redireciona para a página de login se não houver token
    }
  }, [token, router]);

  useEffect(() => {
    if (!id) {
      router.push('/boletos');
      return;
    }

    setBoleto(mockBoletos.find(b => b.id === id));
  }, [id, router]);

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

  if (!boleto) {
    return (
      <PageContainer>
        <Header>
          <FaChevronLeft
            onClick={() => router.back()}
            style={{ cursor: 'pointer' }}
          />
          <HeaderTitle>Detalhe do Boleto</HeaderTitle>
          <FaTimes style={{ cursor: 'pointer' }} />
        </Header>
        <ContentWrapper>
          <p style={{ textAlign: 'center', color: '#666' }}>
            Boleto não encontrado.
          </p>
        </ContentWrapper>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Toast ref={toast} />
      {isMobile ? (
        <Header>
          <span style={{ width: '2.5rem' }}></span> {/* Spacer */}
          <HeaderTitle>Detalhe do Boleto</HeaderTitle>
          <FaTimes
            size={24}
            color="purple"
            onClick={() => router.back()}
            style={{ cursor: 'pointer' }}
          />
        </Header>
      ) : (
        <Header>
          <FaChevronLeft
            size={24}
            color="purple"
            onClick={() => router.back()}
            style={{ cursor: 'pointer' }}
          />
          <HeaderTitle>Detalhe do Boleto</HeaderTitle>
          <span style={{ width: '2.5rem' }}></span> {/* Spacer */}
        </Header>
      )}

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
    </PageContainer>
  );
}

export default function BoletoDetailPage() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <BoletoDetailContent />
    </Suspense>
  );
}

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.headerBackground};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  width: 100%;

  .p-button {
    color: ${({ theme }) => theme.colors.iconColor};
  }
`;

const HeaderTitle = styled.span`
  font-size: 1.125rem; // 18px
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

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

const StyledDivider = styled.div`
  margin: ${({ theme }) => theme.spacing.large} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
`;

const SectionTitle = styled.h2`
  font-size: 0.875rem; // 14px
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0 0 ${({ theme }) => theme.spacing.medium};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  padding-bottom: ${({ theme }) => theme.spacing.small};
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
