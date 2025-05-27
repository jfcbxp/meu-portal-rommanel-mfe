import styled from 'styled-components';
import { Button as PrimeButton } from 'primereact/button';
import { Paginator } from 'primereact/paginator';

export const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const PaymentBreadcrumb = styled.div`
  padding: ${({ theme }) => theme.spacing.small}
    ${({ theme }) => theme.spacing.medium};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textLight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
`;

export const PaymentContentWrapper = styled.main`
  display: flex;
  padding: ${({ theme }) => theme.spacing.large};
  flex-grow: 1;
`;

export const PaymentFilterTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

export const PaymentFilterTitle = styled.h1`
  font-size: larger;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const PaymentFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

export const PaymentFilterButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.small};
`;

export const PaymentFilterButton = styled(PrimeButton)<{ $active?: boolean }>`
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
    font-size: 1rem;
    margin-right: ${({ theme }) => theme.spacing.small};
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const ToastContainer = styled.div`
  display: flex;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.colors.info};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.large};
  border: 1px solid #bee5eb;
  gap: ${({ theme }) => theme.spacing.small};
`;

export const ToastInfoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #bee5eb 0%, #bee5eb 100%);
  flex-shrink: 0;
  i {
    color: white;
    font-size: 1.25rem;
    font-weight: bolder;
  }
`;

export const ToastInfoText = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.infoText};
  line-height: 1.4;
  margin: 0;
`;

export const PaymentPaginator = styled(Paginator)`
  margin-top: 36px;
  .p-highlight {
    color: white !important;
    background: #a259d9 !important;
  }
`;
