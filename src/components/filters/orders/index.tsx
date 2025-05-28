import Header from '@/components/header';
import FullScreenModal from '@/components/modals/fullscreen';

import Button from '@/components/buttons/button';
import useIsMobile from '@/hooks/useIsMobile';
import React from 'react';
import { CnD } from '@/types/index';
import DateInput from '@/components/inputs/date';
import {
  ButtonsContainer,
  ClearButton,
  Container,
  FilterButton,
  FooterContainer,
} from './styles';

interface OrdersFilterProps {
  periods?: CnD[];
  paymentTypes?: CnD[];
  status?: CnD[];
  setVisible: (visible: boolean) => void;
  paymentTypeActive?: CnD;
  setPaymentTypeActive: (paymentType: CnD) => void;
  statusActive?: CnD;
  setStatusActive: (status: CnD) => void;
  periodActive?: CnD;
  setPeriodActive: (period: CnD) => void;
  startDate?: Date;
  setStartDate?: (date: Date) => void;
  endDate?: Date;
  setEndDate?: (date: Date) => void;
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
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: Readonly<OrdersFilterProps>) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <FullScreenModal>
        <Header title="Filtrar" onClick={() => setVisible(false)} />
        <Container>
          <h5>Tipo</h5>
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
          <h5>Situação</h5>
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
          <h5>Período</h5>
          <ButtonsContainer>
            {periods?.map(period => (
              <FilterButton
                key={period.code}
                label={period.description}
                $active={periodActive === period}
                onClick={() =>
                  periodActive?.code === period.code
                    ? setPeriodActive(undefined)
                    : setPeriodActive(period)
                }
              />
            ))}
          </ButtonsContainer>

          <ButtonsContainer style={{ flexWrap: 'nowrap' }}>
            <DateInput
              value={startDate}
              onChange={e => setStartDate(e.value)}
              onFocus={() => setStartDate(undefined)}
            />
            <DateInput
              value={endDate}
              onChange={e => setEndDate(e.value)}
              onFocus={() => setEndDate(undefined)}
            />
          </ButtonsContainer>

          <FooterContainer>
            <ClearButton
              label="Limpar"
              icon="pi pi-times"
              onClick={() => {
                setPaymentTypeActive(undefined);
                setPeriodActive(undefined);
                setStatusActive(undefined);
                setStartDate(undefined);
                setEndDate(undefined);
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
        <h5>Tipo</h5>
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
        <h5>Situação</h5>
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
        <h5>Período</h5>
        <ButtonsContainer>
          {periods?.map(period => (
            <FilterButton
              key={period.code}
              label={period.description}
              $active={periodActive === period}
              onClick={() =>
                periodActive?.code === period.code
                  ? setPeriodActive(undefined)
                  : setPeriodActive(period)
              }
            />
          ))}
        </ButtonsContainer>

        <ButtonsContainer style={{ flexWrap: 'nowrap' }}>
          <DateInput
            value={startDate}
            onChange={e => setStartDate(e.value)}
            onFocus={() => setStartDate(undefined)}
          />
          <DateInput
            value={endDate}
            onChange={e => setEndDate(e.value)}
            onFocus={() => setEndDate(undefined)}
          />
        </ButtonsContainer>
      </Container>
    );
  }
}
