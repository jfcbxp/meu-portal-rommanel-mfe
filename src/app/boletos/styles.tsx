import { Chip as PrimeChip } from 'primereact/chip';
import styled from 'styled-components';
import { Button as PrimeButton } from 'primereact/button';
import { Boleto } from '@/types/index';

export const OrderHistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const OrderHistoryHeader = styled.header`
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

export const OrderHistoryBreadcrumb = styled.div`
  padding: ${({ theme }) => theme.spacing.small}
    ${({ theme }) => theme.spacing.medium};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textLight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
`;

export const OrderHistoryWrapper = styled.main`
  padding: ${({ theme }) => theme.spacing.large};
  flex-grow: 1;
`;

export const OrderHistoryTitleContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

export const OrderHistoryTitle = styled.h1`
  font-size: 1.5rem; // 24px
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const OrderHistoryFilterContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.large};
  flex-wrap: wrap; // Allow filters to wrap on smaller screens
`;

export const OrderHistoryFilterButton = styled(PrimeButton)<{
  $active?: boolean;
}>`
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

export const OrderHistoryFilterClearButton = styled(PrimeButton)`
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

export const OrderHistoryToastContainer = styled.div`
  display: flex;
  align-items: flex-start; // Align icon and text to the top
  background-color: ${({ theme }) => theme.colors.info};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.large};
  border: 1px solid #bee5eb; // Slightly darker border for info color
`;

export const OrderHistoryToastIcon = styled.i`
  color: ${({ theme }) => theme.colors.infoText};
  font-size: 1.25rem; // Adjust icon size
  margin-right: ${({ theme }) => theme.spacing.medium};
  margin-top: 2px; // Align icon slightly better with text
  flex-shrink: 0;
`;

export const OrderHistoryToastText = styled.p`
  font-size: 0.875rem; // 14px
  color: ${({ theme }) => theme.colors.infoText};
  line-height: 1.4;
  margin: 0;
`;

export const OrderHistoryGroupHeader = styled.h2`
  font-size: 1rem; // 16px
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-top: ${({ theme }) => theme.spacing.large};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

export const OrderHistoryCardWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out;
  gap: ${({ theme }) => theme.spacing.medium};

  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
  }
`;

export const OrderHistoryCardIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    #a67dff 0%,
    #7e57c2 100%
  ); // Gradiente roxo similar ao ícone
  flex-shrink: 0;

  i {
    color: white;
    font-size: 1.25rem;
  }
`;

export const OrderHistoryCardInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const OrderHistoryCardTitle = styled.span`
  font-size: 0.875rem; // 14px
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`;

export const OrderHistoryCardSubtitle = styled.span`
  font-size: 0.75rem; // 12px
  color: ${({ theme }) => theme.colors.textLight};
`;

export const OrderHistoryCardValueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;
  margin-left: ${({ theme }) => theme.spacing.small};
`;

export const OrderHistoryCardAmount = styled.span`
  font-size: 0.875rem; // 14px
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`;

export const OrderHistoryCardItemCount = styled.span`
  font-size: 0.75rem; // 12px
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 4px;
`;

export const OrderHistoryStatusChip = styled(PrimeChip)<{
  status: Boleto['status'];
}>`
  font-size: 0.75rem !important; // Use !important cautiously if needed
  height: 20px !important;
  padding: 2px 8px !important;
  border-radius: ${({ theme }) => theme.borderRadius.small} !important;
  background-color: ${({ theme, status }) =>
    status === 'Pago'
      ? '#E4F6E8'
      : theme.colors.secondary} !important; // Light green or gray
  color: ${({ theme, status }) =>
    status === 'Pago'
      ? theme.colors.success
      : theme.colors.textLight} !important;
  font-weight: 500;

  .p-chip-label {
    line-height: 1.2; // Adjust line height if needed
  }
`;

export const OrderHistoryArrowIcon = styled.i`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1rem;
  margin-left: ${({ theme }) => theme.spacing.small};
  flex-shrink: 0;
`;
