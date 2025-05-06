import { Boleto } from '@/types/index';
import { Chip as PrimeChip } from 'primereact/chip';
import { Divider as PrimeDivider } from 'primereact/divider';
import { Image as PrimeImage } from 'primereact/image';
import styled from 'styled-components';
import { Button as PrimeButton } from 'primereact/button';

export const OrderSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const OrderSummaryHeader = styled.header`
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

export const OrderSummaryHeaderTitle = styled.span`
  font-size: 1.125rem; // 18px
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

export const OrderSummaryContentWrapper = styled.main`
  padding: ${({ theme }) => theme.spacing.large};
  flex-grow: 1;
`;

export const OrderSummaryInfoContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

export const OrderSummaryNumber = styled.p`
  font-size: 0.875rem; // 14px
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0 0 ${({ theme }) => theme.spacing.small};
`;

export const OrderSummaryValue = styled.p`
  font-size: 1.5rem; // 24px
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing.medium};
`;

export const OrderSummaryDetailsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const OrderSummaryDetailItem = styled.div`
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

export const OrderSummaryDetailItemRight = styled(OrderSummaryDetailItem)`
  text-align: right;
`;

export const OrderSummaryStatusChip = styled(PrimeChip)<{
  status: Boleto['status'];
}>`
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

export const OrderSummaryDivider = styled(PrimeDivider)`
  margin: ${({ theme }) => theme.spacing.large} 0;
  border-color: ${({ theme }) => theme.colors.secondary};
`;

export const OrderSummarySectionTitle = styled.h2`
  font-size: 0.875rem; // 14px
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0 0 ${({ theme }) => theme.spacing.medium};
`;

export const OrderSummaryItemListContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

export const OrderSummaryItemContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.medium};
`;

export const OrderSummaryImage = styled(PrimeImage)`
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

export const OrderSummaryItemInfo = styled.div`
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

export const OrderSummaryPaymentMethodContainer = styled.div``;

export const OrderSummaryPaymentMethodRow = styled.div`
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

export const OrderSummaryCopyButton = styled(PrimeButton)`
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
