'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Button as PrimeButton } from 'primereact/button';
import { useRouter } from 'next/navigation';
import { mockBoletos } from '@/utils/mock';
import { useAuth } from '@/contexts/AuthContext';
import {
  OrderHistoryArrowIcon,
  OrderHistoryBreadcrumb,
  OrderHistoryCardAmount,
  OrderHistoryCardIconWrapper,
  OrderHistoryCardInfoWrapper,
  OrderHistoryCardItemCount,
  OrderHistoryCardSubtitle,
  OrderHistoryCardTitle,
  OrderHistoryCardValueWrapper,
  OrderHistoryCardWrapper,
  OrderHistoryContainer,
  OrderHistoryFilterButton,
  OrderHistoryFilterClearButton,
  OrderHistoryFilterContainer,
  OrderHistoryGroupHeader,
  OrderHistoryHeader,
  OrderHistoryStatusChip,
  OrderHistoryTitle,
  OrderHistoryTitleContent,
  OrderHistoryToastContainer,
  OrderHistoryToastIcon,
  OrderHistoryToastText,
  OrderHistoryWrapper,
} from './styles';
import { groupBoletosByDate } from '@/utils/date';

export default function BoletosPage() {
  const [filterActive, setFilterActive] = useState<'30dias' | null>(null);
  const router = useRouter();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  const filteredBoletos = useMemo(() => {
    if (filterActive === '30dias') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return mockBoletos.filter(
        boleto => new Date(boleto.data + 'T00:00:00') >= thirtyDaysAgo,
      );
    }
    return mockBoletos;
  }, [filterActive]);

  const groupedBoletos = useMemo(
    () => groupBoletosByDate(filteredBoletos),
    [filteredBoletos],
  );

  const sortedDates = useMemo(
    () =>
      Object.keys(groupedBoletos).sort((a, b) => {
        const dateA = new Date(
          parseInt(a.split(' de ')[2], 10),
          new Date(Date.parse(a.split(' de ')[1] + ' 1, 2000')).getMonth(),
          parseInt(a.split(' de ')[0], 10),
        );
        const dateB = new Date(
          parseInt(b.split(' de ')[2], 10),
          new Date(Date.parse(b.split(' de ')[1] + ' 1, 2000')).getMonth(),
          parseInt(b.split(' de ')[0], 10),
        );
        return dateB.getTime() - dateA.getTime();
      }),
    [groupedBoletos],
  );

  if (!token) {
    return null;
  }

  const handleCardClick = (id: string) => {
    router.push(`/detalhesBoleto?id=${id}`);
  };

  return (
    <OrderHistoryContainer>
      <OrderHistoryHeader>
        <PrimeButton
          icon="pi pi-bars"
          text
          rounded
          severity="secondary"
          aria-label="Menu"
        />
        <span className="font-medium text-lg">Meus Boletos</span>
        <PrimeButton
          icon="pi pi-shopping-cart"
          text
          rounded
          severity="secondary"
          aria-label="Cart"
        />
      </OrderHistoryHeader>

      <OrderHistoryBreadcrumb>Início / Meus boletos</OrderHistoryBreadcrumb>

      <OrderHistoryWrapper>
        <OrderHistoryTitleContent>
          <OrderHistoryTitle>Boletos</OrderHistoryTitle>
          <PrimeButton
            icon="pi pi-question-circle"
            text
            rounded
            severity="secondary"
            aria-label="Help"
          />
        </OrderHistoryTitleContent>

        <OrderHistoryFilterContainer>
          <OrderHistoryFilterButton label="Filtrar" icon="pi pi-filter" />
          <OrderHistoryFilterButton
            label="30 dias"
            $active={filterActive === '30dias'}
            onClick={() => setFilterActive('30dias')}
          />
          {filterActive && (
            <OrderHistoryFilterClearButton
              label="Limpar"
              icon="pi pi-times"
              onClick={() => setFilterActive(null)}
            />
          )}
        </OrderHistoryFilterContainer>

        <OrderHistoryToastContainer>
          <OrderHistoryToastIcon className="pi pi-info-circle"></OrderHistoryToastIcon>
          <OrderHistoryToastText>
            Boletos pagos podem demorar até 3 dias para serem atualizados
          </OrderHistoryToastText>
        </OrderHistoryToastContainer>

        {sortedDates.length === 0 && (
          <p style={{ textAlign: 'center', color: '#666' }}>
            Nenhum boleto encontrado.
          </p>
        )}

        {sortedDates.map(date => (
          <div key={date}>
            <OrderHistoryGroupHeader>{date}</OrderHistoryGroupHeader>
            {groupedBoletos[date].map(boleto => (
              <OrderHistoryCardWrapper
                key={boleto.id}
                onClick={() => handleCardClick(boleto.id)}
              >
                <OrderHistoryCardIconWrapper>
                  <i className="pi pi-dollar"></i>
                </OrderHistoryCardIconWrapper>
                <OrderHistoryCardInfoWrapper>
                  <OrderHistoryCardTitle>{boleto.compra}</OrderHistoryCardTitle>
                  <OrderHistoryCardSubtitle>{`nº ${boleto.id}`}</OrderHistoryCardSubtitle>
                </OrderHistoryCardInfoWrapper>
                <OrderHistoryCardValueWrapper>
                  <OrderHistoryCardAmount>{`R$ ${boleto.valor}`}</OrderHistoryCardAmount>
                  <OrderHistoryCardItemCount>{`${boleto.quantidadeItens} item${
                    boleto.quantidadeItens > 1 ? 's' : ''
                  }`}</OrderHistoryCardItemCount>
                  <OrderHistoryStatusChip
                    label={boleto.status}
                    status={boleto.status}
                  />
                </OrderHistoryCardValueWrapper>
                <OrderHistoryArrowIcon className="pi pi-chevron-right"></OrderHistoryArrowIcon>
              </OrderHistoryCardWrapper>
            ))}
          </div>
        ))}
      </OrderHistoryWrapper>
    </OrderHistoryContainer>
  );
}
