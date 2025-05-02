'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button as PrimeButton } from 'primereact/button';
import { Chip as PrimeChip } from 'primereact/chip';
import { Divider as PrimeDivider } from 'primereact/divider';
import { Image as PrimeImage } from 'primereact/image';
import { Toast } from 'primereact/toast';
import { mockBoletos } from '@/utils/mock';
import { Boleto, BoletoItem } from '@/types/index';
import { useAuth } from '@/contexts/AuthContext';

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const HeaderSim = styled.header`
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
  padding: ${({ theme }) => theme.spacing.large};
  flex-grow: 1;
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

// Styled PrimeChip for status
const StatusChip = styled(PrimeChip)<{ status: Boleto['status'] }>`
  font-size: 0.875rem !important; // 14px
  font-weight: 500 !important;
  height: 24px !important;
  padding: 2px 10px !important;
  border-radius: ${({ theme }) => theme.borderRadius.small} !important;
  background-color: ${({ theme, status }) =>
    status === 'Pago'
      ? '#E4F6E8'
      : theme.colors.secondary} !important; // Light green or gray
  color: ${({ theme, status }) =>
    status === 'Pago'
      ? theme.colors.success
      : theme.colors.textLight} !important;

  .p-chip-label {
    line-height: 1.2;
  }
`;

const StyledDivider = styled(PrimeDivider)`
  margin: ${({ theme }) => theme.spacing.large} 0;
  border-color: ${({ theme }) => theme.colors.secondary};
`;

const SectionTitle = styled.h2`
  font-size: 0.875rem; // 14px
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0 0 ${({ theme }) => theme.spacing.medium};
`;

const ItemListContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const StyledImage = styled(PrimeImage)`
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  overflow: hidden;
  width: 48px;
  height: 48px;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ItemInfo = styled.div`
  flex-grow: 1;
  p {
    margin: 0 0 4px;
    font-size: 0.875rem; // 14px
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.3;
  }
  p:first-child {
    // ID
    font-weight: 500;
  }
  p:nth-child(2) {
    // Descrição
    color: ${({ theme }) => theme.colors.textLight};
  }
  p:nth-child(3) {
    // Quantidade
    font-size: 0.75rem; // 12px
    color: ${({ theme }) => theme.colors.textLight};
  }
  p:last-child {
    // Valor
    font-weight: 500;
  }
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

const CopyButton = styled(PrimeButton)`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: ${({ theme }) => theme.spacing.small}
    ${({ theme }) => theme.spacing.medium};
  font-size: 0.875rem; // 14px
  font-weight: 500;
  height: auto;
  min-width: auto;
  transition: background-color 0.2s ease-in-out;

  .p-button-icon {
    font-size: 1rem;
    margin-right: ${({ theme }) => theme.spacing.small};
  }

  &:hover:not(:disabled) {
    background-color: #f8f5fa; // Very light purple
  }
`;

function BoletoDetailContent() {
  const params = useSearchParams();
  const id = params.get('id');
  const router = useRouter();
  const toast = useRef<Toast>(null);
  const [boleto, setBoleto] = useState(null);
  const { token } = useAuth();

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
        <HeaderSim>
          <PrimeButton
            icon="pi pi-arrow-left"
            text
            rounded
            severity="secondary"
            aria-label="Back"
            onClick={() => router.back()}
          />
          <HeaderTitle>Detalhe do Boleto</HeaderTitle>
          <PrimeButton
            icon="pi pi-times"
            text
            rounded
            severity="secondary"
            aria-label="Close"
            onClick={() => router.push('/boletos')}
          />
        </HeaderSim>
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
      <HeaderSim>
        <span style={{ width: '2.5rem' }}></span> {/* Spacer */}
        <HeaderTitle>Detalhe do boleto</HeaderTitle>
        <PrimeButton
          icon="pi pi-times"
          text
          rounded
          severity="secondary"
          aria-label="Close"
          onClick={() => router.push('/boletos')}
          style={{ fontSize: '1.25rem' }} // Increase icon size
        />
      </HeaderSim>

      <ContentWrapper>
        <BoletoInfoContainer>
          <BoletoNumber>{`Boleto nº ${boleto.id}`}</BoletoNumber>
          <BoletoValue>{`R$ ${boleto.valor}`}</BoletoValue>
          <DetailsRow>
            <DetailItem>
              <p>Quantidade</p>
              <p>{`${boleto.quantidadeItens} item${
                boleto.quantidadeItens > 1 ? 's' : ''
              }`}</p>
            </DetailItem>
            <DetailItemRight>
              <p>Status</p>
              <StatusChip label={boleto.status} status={boleto.status} />
            </DetailItemRight>
          </DetailsRow>
        </BoletoInfoContainer>

        <StyledDivider />

        <ItemListContainer>
          <SectionTitle>{`Fornecido por ${boleto.fornecedor}`}</SectionTitle>
          {boleto.itens.map((item: BoletoItem, index: number) => (
            <React.Fragment key={item.id}>
              <ItemContainer>
                <StyledImage
                  src={item.imagemUrl || '/placeholder-image.png'} // Use placeholder if no image
                  alt={item.descricao}
                  width="48px"
                  height="48px"
                />
                <ItemInfo>
                  <p>{item.id}</p>
                  <p>{item.descricao}</p>
                  <p>{`${item.quantidade} item${
                    item.quantidade > 1 ? 's' : ''
                  }`}</p>
                  <p>{`R$ ${item.valor}`}</p>
                </ItemInfo>
              </ItemContainer>
              {index < boleto.itens.length - 1 && (
                <StyledDivider style={{ margin: '1rem 0' }} />
              )}
            </React.Fragment>
          ))}
        </ItemListContainer>

        <StyledDivider />

        <PaymentMethodContainer>
          <SectionTitle>Forma de pagamento</SectionTitle>
          <PaymentMethodRow>
            {/* Placeholder Icon - Use appropriate PrimeIcon or SVG */}
            <i className="pi pi-ticket"></i>
            <span>{boleto.formaPagamento}</span>
          </PaymentMethodRow>
          <CopyButton
            label="Copiar Código de Barras"
            icon="pi pi-copy"
            onClick={handleCopy}
          />
        </PaymentMethodContainer>
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
