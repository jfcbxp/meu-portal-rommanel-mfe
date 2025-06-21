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
  showPaginator: boolean;
  setShowPaginator: (show: boolean) => void;
}

export default function OrdersFilter(properties: Readonly<OrdersFilterProps>) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <FullScreenModal>
        <Header
          showPaginator={properties.showPaginator}
          setShowPaginator={properties.setShowPaginator}
          title="Filtrar"
          onClick={() => properties.setVisible(false)}
        />
        <Container>
          <h5>Tipo</h5>
          <ButtonsContainer>
            {properties.paymentTypes?.map(paymentType => (
              <FilterButton
                key={paymentType.code}
                label={paymentType.description}
                $active={
                  properties.paymentTypeActive?.code === paymentType.code
                }
                onClick={() =>
                  properties.paymentTypeActive?.code === paymentType.code
                    ? properties.setPaymentTypeActive(undefined)
                    : properties.setPaymentTypeActive(paymentType)
                }
              />
            ))}
          </ButtonsContainer>
          <h5>Situação</h5>
          <ButtonsContainer>
            {properties.status?.map(item => (
              <FilterButton
                key={item.code}
                label={item.description}
                $active={properties.statusActive?.code === item.code}
                onClick={() =>
                  properties.statusActive?.code === item.code
                    ? properties.setStatusActive(undefined)
                    : properties.setStatusActive(item)
                }
              />
            ))}
          </ButtonsContainer>
          <h5>Período</h5>
          <ButtonsContainer>
            {properties.periods?.map(period => (
              <FilterButton
                key={period.code}
                label={period.description}
                $active={properties.periodActive?.code === period.code}
                onClick={() =>
                  properties.periodActive?.code === period.code
                    ? properties.setPeriodActive(undefined)
                    : properties.setPeriodActive(period)
                }
              />
            ))}
          </ButtonsContainer>

          <ButtonsContainer style={{ flexWrap: 'nowrap' }}>
            <DateInput
              value={properties.startDate}
              onChange={e => properties.setStartDate(e.value)}
              onFocus={() => properties.setStartDate(undefined)}
            />
            <DateInput
              value={properties.endDate}
              onChange={e => properties.setEndDate(e.value)}
              onFocus={() => properties.setEndDate(undefined)}
            />
          </ButtonsContainer>

          <FooterContainer>
            <ClearButton
              label="Limpar"
              icon="pi pi-times"
              onClick={() => {
                properties.setPaymentTypeActive(undefined);
                properties.setPeriodActive(undefined);
                properties.setStatusActive(undefined);
                properties.setStartDate(undefined);
                properties.setEndDate(undefined);
              }}
            />
            <Button
              label="Aplicar"
              onClick={() => properties.setVisible(false)}
            />
          </FooterContainer>
        </Container>
      </FullScreenModal>
    );
  } else {
    return (
      <Container>
        <h5>Tipo</h5>
        <ButtonsContainer>
          {properties.paymentTypes?.map(paymentType => (
            <FilterButton
              key={paymentType.code}
              label={paymentType.description}
              $active={properties.paymentTypeActive?.code === paymentType.code}
              onClick={() =>
                properties.paymentTypeActive?.code === paymentType.code
                  ? properties.setPaymentTypeActive(undefined)
                  : properties.setPaymentTypeActive(paymentType)
              }
            />
          ))}
        </ButtonsContainer>
        <h5>Situação</h5>
        <ButtonsContainer>
          {properties.status?.map(item => (
            <FilterButton
              key={item.code}
              label={item.description}
              $active={properties.statusActive?.code === item.code}
              onClick={() =>
                properties.statusActive?.code === item.code
                  ? properties.setStatusActive(undefined)
                  : properties.setStatusActive(item)
              }
            />
          ))}
        </ButtonsContainer>
        <h5>Período</h5>
        <ButtonsContainer>
          {properties.periods?.map(period => (
            <FilterButton
              key={period.code}
              label={period.description}
              $active={properties.periodActive?.code === period.code}
              onClick={() =>
                properties.periodActive?.code === period.code
                  ? properties.setPeriodActive(undefined)
                  : properties.setPeriodActive(period)
              }
            />
          ))}
        </ButtonsContainer>

        <ButtonsContainer style={{ flexWrap: 'nowrap' }}>
          <DateInput
            value={properties.startDate}
            onChange={e => properties.setStartDate(e.value)}
            onFocus={() => properties.setStartDate(undefined)}
          />
          <DateInput
            value={properties.endDate}
            onChange={e => properties.setEndDate(e.value)}
            onFocus={() => properties.setEndDate(undefined)}
          />
        </ButtonsContainer>
      </Container>
    );
  }
}
