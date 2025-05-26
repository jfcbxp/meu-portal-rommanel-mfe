import Header from '@/components/header';
import FullScreenModal from '@/components/modals/fullscreen';

import Button from '@/components/buttons/button';
import useIsMobile from '@/hooks/useIsMobile';
import React from 'react';
import { Cd } from '@/types/index';
import DateInput from '@/components/inputs/date';
import {
  ButtonsContainer,
  ClearButton,
  Container,
  FilterButton,
  FooterContainer,
} from './styles';

interface OrdersFilterProps {
  periods?: Cd[];
  paymentTypes?: Cd[];
  status?: Cd[];
  setVisible: (visible: boolean) => void;
  paymentTypeActive?: Cd;
  setPaymentTypeActive: (paymentType: Cd) => void;
  statusActive?: Cd;
  setStatusActive: (status: Cd) => void;
  periodActive?: Cd;
  setPeriodActive: (period: Cd) => void;
  date?: Date[];
  setDate?: (date: Date[]) => void;
}

export default function OrdersFilter({
  periods,
  paymentTypes,
  status,
  setVisible,
  paymentTypeActive,
  setPaymentTypeActive,
  statusActive,
  setStatusActive,
  periodActive,
  setPeriodActive,
  date,
  setDate,
}: Readonly<OrdersFilterProps>) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <FullScreenModal>
        <Header title="Filtrar" onClick={() => setVisible(false)} />
        <Container>
          <h3>Tipo</h3>
          <ButtonsContainer>
            {paymentTypes?.map(paymentType => (
              <FilterButton
                key={paymentType.code}
                label={paymentType.description}
                $active={paymentTypeActive === paymentType}
                onClick={() =>
                  paymentTypeActive?.code === paymentType.code
                    ? setPaymentTypeActive(undefined)
                    : setPaymentTypeActive(paymentType)
                }
              />
            ))}
          </ButtonsContainer>
          <h3>Situação</h3>
          <ButtonsContainer>
            {status?.map(item => (
              <FilterButton
                key={item.code}
                label={item.description}
                $active={statusActive === item}
                onClick={() =>
                  statusActive?.code === item.code
                    ? setStatusActive(undefined)
                    : setStatusActive(item)
                }
              />
            ))}
          </ButtonsContainer>
          <h3>Período</h3>
          <ButtonsContainer>
            {periods?.map(period => (
              <FilterButton
                key={period.code}
                label={period.description}
                $active={periodActive === period}
                onClick={() => setPeriodActive(period)}
              />
            ))}
          </ButtonsContainer>

          <DateInput
            value={date ?? []}
            onChange={e => setDate(e.value)}
            onFocus={() => setDate(undefined)}
          />
          <FooterContainer>
            <ClearButton
              label="Limpar"
              icon="pi pi-times"
              onClick={() => {
                setPaymentTypeActive(paymentTypes[0]);
                setPeriodActive(periods[0]);
                setVisible(false);
              }}
            />
            <Button label="Aplicar" onClick={() => setVisible(false)} />
          </FooterContainer>
        </Container>
      </FullScreenModal>
    );
  } else {
    return (
      <Container>
        <h3>Tipo</h3>
        <ButtonsContainer>
          {paymentTypes?.map(paymentType => (
            <FilterButton
              key={paymentType.code}
              label={paymentType.description}
              $active={paymentTypeActive === paymentType}
              onClick={() =>
                paymentTypeActive?.code === paymentType.code
                  ? setPaymentTypeActive(undefined)
                  : setPaymentTypeActive(paymentType)
              }
            />
          ))}
        </ButtonsContainer>
        <h3>Situação</h3>
        <ButtonsContainer>
          {status?.map(item => (
            <FilterButton
              key={item.code}
              label={item.description}
              $active={statusActive === item}
              onClick={() =>
                statusActive?.code === item.code
                  ? setStatusActive(undefined)
                  : setStatusActive(item)
              }
            />
          ))}
        </ButtonsContainer>
        <h3>Período</h3>
        <ButtonsContainer>
          {periods?.map(period => (
            <FilterButton
              key={period.code}
              label={period.description}
              $active={periodActive === period}
              onClick={() => setPeriodActive(period)}
            />
          ))}
        </ButtonsContainer>
        <DateInput
          value={date ?? []}
          onChange={e => setDate(e.value)}
          onFocus={() => setDate(undefined)}
        />
      </Container>
    );
  }
}
