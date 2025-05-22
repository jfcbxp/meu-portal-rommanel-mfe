import Header from '@/components/header';
import FullScreenModal from '@/components/modals/fullscreen';
import { styled } from 'styled-components';
import { Button as PrimeButton } from 'primereact/button';
import Button from '@/components/buttons/button';
import useIsMobile from '@/hooks/useIsMobile';
import React from 'react';
import { PaymentTypes } from '@/types/index';
import { mockPaymentTypes, mockPeriods } from '@/utils/mock';
import DateInput from '@/components/inputs/date';

interface OrdersFilterProps {
  setVisible: (visible: boolean) => void;
  paymentTypeActive: PaymentTypes;
  setPaymentTypeActive: (paymentType: PaymentTypes) => void;
  periodActive: PaymentTypes;
  setPeriodActive: (period: PaymentTypes) => void;
}

export default function OrdersFilter({
  setVisible,
  paymentTypeActive,
  setPaymentTypeActive,
  periodActive,
  setPeriodActive,
}: Readonly<OrdersFilterProps>) {
  const paymentTypes = mockPaymentTypes;
  const periods = mockPeriods;
  const isMobile = useIsMobile();
  const [date, setDate] = React.useState<Date | undefined>();
  if (isMobile) {
    return (
      <FullScreenModal>
        <Header title="Filtrar" onClick={() => setVisible(false)} />
        <ContentWrapper>
          <h3>Tipo</h3>
          <FilterButtons>
            {paymentTypes?.map(paymentType => (
              <FilterButton
                key={paymentType.code}
                label={paymentType.description}
                $active={paymentTypeActive === paymentType}
                onClick={() => setPaymentTypeActive(paymentType)}
              />
            ))}
          </FilterButtons>
          <h3>Período</h3>
          <FilterButtons>
            {periods?.map(period => (
              <FilterButton
                key={period.code}
                label={period.description}
                $active={periodActive === period}
                onClick={() => setPeriodActive(period)}
              />
            ))}
          </FilterButtons>
          <FilterEndButtons>
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
          </FilterEndButtons>
        </ContentWrapper>
      </FullScreenModal>
    );
  } else {
    return (
      <ContentWrapper>
        {(paymentTypeActive || periodActive) && (
          <FilterButtons>
            <ClearButton
              label="Limpar"
              icon="pi pi-times"
              onClick={() => {
                setPaymentTypeActive(paymentTypes[0]);
                setPeriodActive(periods[0]);
                setVisible(false);
              }}
            />
          </FilterButtons>
        )}

        <h3>Tipo</h3>
        <FilterButtons>
          {paymentTypes?.map(paymentType => (
            <FilterButton
              key={paymentType.code}
              label={paymentType.description}
              $active={paymentTypeActive === paymentType}
              onClick={() => setPaymentTypeActive(paymentType)}
            />
          ))}
        </FilterButtons>
        <h3>Período</h3>
        <FilterButtons>
          {periods?.map(period => (
            <FilterButton
              key={period.code}
              label={period.description}
              $active={periodActive === period}
              onClick={() => setPeriodActive(period)}
            />
          ))}
        </FilterButtons>
        <DateInput
          value={date ? [date] : []}
          onChange={e => setDate(e.value[0])}
          onFocus={() => setDate(undefined)}
        />
      </ContentWrapper>
    );
  }
}

const ContentWrapper = styled.main`
  display: flex;
  gap: ${({ theme }) => theme.spacing.large};
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.large};
  height: 100%;
`;

const FilterEndButtons = styled.div`
  display: flex;
  width: 100%;
  gap: ${({ theme }) => theme.spacing.small};
  bottom: 0;
  left: 0;
  position: fixed;
  padding: ${({ theme }) => theme.spacing.large};
`;

const FilterButtons = styled.div`
  display: flex;
  flex-wrap: wrap; // Allow buttons to wrap on smaller screens
  gap: ${({ theme }) => theme.spacing.small};
`;

// Styled PrimeButton for filters
const FilterButton = styled(PrimeButton)<{ $active?: boolean }>`
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.secondary : theme.colors.background};
  color: ${({ theme }) => theme.colors.textLight};
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.small}
    ${({ theme }) => theme.spacing.medium};
  font-size: 0.875rem;
  height: auto;
  min-width: auto;

  .p-button-icon {
    font-size: 1rem; // Adjust icon size if needed
    margin-right: ${({ theme }) => theme.spacing.small};
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const ClearButton = styled(PrimeButton)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textLight};
  border: none;
  padding: ${({ theme }) => theme.spacing.small}
    ${({ theme }) => theme.spacing.small};
  font-size: 0.875rem;
  height: auto;
  min-width: auto;

  .p-button-icon {
    font-size: 0.75rem; // Smaller icon
    margin-right: 4px;
  }
`;
