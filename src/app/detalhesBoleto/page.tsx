'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button as PrimeButton } from 'primereact/button';

import { Toast } from 'primereact/toast';
import { mockBoletos } from '@/utils/mock';
import { BoletoItem } from '@/types/index';
import { useAuth } from '@/contexts/AuthContext';
import {
  OrderSummaryContainer,
  OrderSummaryContentWrapper,
  OrderSummaryCopyButton,
  OrderSummaryDetailItem,
  OrderSummaryDetailItemRight,
  OrderSummaryDetailsRow,
  OrderSummaryDivider,
  OrderSummaryHeader,
  OrderSummaryHeaderTitle,
  OrderSummaryImage,
  OrderSummaryInfoContainer,
  OrderSummaryItemContainer,
  OrderSummaryItemInfo,
  OrderSummaryItemListContainer,
  OrderSummaryNumber,
  OrderSummaryPaymentMethodContainer,
  OrderSummaryPaymentMethodRow,
  OrderSummarySectionTitle,
  OrderSummaryStatusChip,
  OrderSummaryValue,
} from './styles';

function BoletoDetailContent() {
  const params = useSearchParams();
  const id = params.get('id');
  const router = useRouter();
  const toast = useRef<Toast>(null);
  const [boleto, setBoleto] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      router.push('/login');
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
      <OrderSummaryContainer>
        <OrderSummaryHeader>
          <PrimeButton
            icon="pi pi-arrow-left"
            text
            rounded
            severity="secondary"
            aria-label="Back"
            onClick={() => router.back()}
          />
          <OrderSummaryHeaderTitle>Detalhe do Boleto</OrderSummaryHeaderTitle>
          <PrimeButton
            icon="pi pi-times"
            text
            rounded
            severity="secondary"
            aria-label="Close"
            onClick={() => router.push('/boletos')}
          />
        </OrderSummaryHeader>
        <OrderSummaryContentWrapper>
          <p style={{ textAlign: 'center', color: '#666' }}>
            Boleto não encontrado.
          </p>
        </OrderSummaryContentWrapper>
      </OrderSummaryContainer>
    );
  }

  return (
    <OrderSummaryContainer>
      <Toast ref={toast} />
      <OrderSummaryHeader>
        <span style={{ width: '2.5rem' }}></span>
        <OrderSummaryHeaderTitle>Detalhe do boleto</OrderSummaryHeaderTitle>
        <PrimeButton
          icon="pi pi-times"
          text
          rounded
          severity="secondary"
          aria-label="Close"
          onClick={() => router.push('/boletos')}
          style={{ fontSize: '1.25rem' }}
        />
      </OrderSummaryHeader>

      <OrderSummaryContentWrapper>
        <OrderSummaryInfoContainer>
          <OrderSummaryNumber>{`Boleto nº ${boleto.id}`}</OrderSummaryNumber>
          <OrderSummaryValue>{`R$ ${boleto.valor}`}</OrderSummaryValue>
          <OrderSummaryDetailsRow>
            <OrderSummaryDetailItem>
              <p>Quantidade</p>
              <p>{`${boleto.quantidadeItens} item${
                boleto.quantidadeItens > 1 ? 's' : ''
              }`}</p>
            </OrderSummaryDetailItem>
            <OrderSummaryDetailItemRight>
              <p>Status</p>
              <OrderSummaryStatusChip
                label={boleto.status}
                status={boleto.status}
              />
            </OrderSummaryDetailItemRight>
          </OrderSummaryDetailsRow>
        </OrderSummaryInfoContainer>

        <OrderSummaryDivider />

        <OrderSummaryItemListContainer>
          <OrderSummarySectionTitle>{`Fornecido por ${boleto.fornecedor}`}</OrderSummarySectionTitle>
          {boleto.itens.map((item: BoletoItem, index: number) => (
            <React.Fragment key={item.id}>
              <OrderSummaryItemContainer>
                <OrderSummaryImage
                  src={item.imagemUrl || '/placeholder-image.png'}
                  alt={item.descricao}
                  width="48px"
                  height="48px"
                />
                <OrderSummaryItemInfo>
                  <p>{item.id}</p>
                  <p>{item.descricao}</p>
                  <p>{`${item.quantidade} item${
                    item.quantidade > 1 ? 's' : ''
                  }`}</p>
                  <p>{`R$ ${item.valor}`}</p>
                </OrderSummaryItemInfo>
              </OrderSummaryItemContainer>
              {index < boleto.itens.length - 1 && (
                <OrderSummaryDivider style={{ margin: '1rem 0' }} />
              )}
            </React.Fragment>
          ))}
        </OrderSummaryItemListContainer>

        <OrderSummaryDivider />

        <OrderSummaryPaymentMethodContainer>
          <OrderSummarySectionTitle>
            Forma de pagamento
          </OrderSummarySectionTitle>
          <OrderSummaryPaymentMethodRow>
            <i className="pi pi-ticket"></i>
            <span>{boleto.formaPagamento}</span>
          </OrderSummaryPaymentMethodRow>
          <OrderSummaryCopyButton
            label="Copiar Código de Barras"
            icon="pi pi-copy"
            onClick={handleCopy}
          />
        </OrderSummaryPaymentMethodContainer>
      </OrderSummaryContentWrapper>
    </OrderSummaryContainer>
  );
}

export default function BoletoDetailPage() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <BoletoDetailContent />
    </Suspense>
  );
}
