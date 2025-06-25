import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.large};
`;

export const OrderInfoContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

export const OrderNumber = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0 0 ${({ theme }) => theme.spacing.small};
`;

export const OrderBalance = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing.medium};
`;

export const OrderAmount = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0 0 ${({ theme }) => theme.spacing.medium};
  font-style: italic;
  text-decoration: line-through;
`;

export const DetailsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DetailItem = styled.div`
  p:first-child {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.textLight};
    margin: 0 0 4px;
  }
  p:last-child {
    font-size: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
  }
`;

export const DetailItemRight = styled(DetailItem)`
  text-align: right;
`;

export const SectionTitle = styled.h2`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0 0 ${({ theme }) => theme.spacing.medium};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  padding-bottom: ${({ theme }) => theme.spacing.small};
`;

export const StyledDivider = styled.div`
  margin: ${({ theme }) => theme.spacing.small} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
`;

export const PaymentMethodContainer = styled.div``;

export const PaymentMethodRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.medium};

  i {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.25rem;
  }

  span {
    font-size: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const DialogContent = styled.div`
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: whitesmoke;
  justify-content: center;
  align-items: flex-start;
`;

export const DialogPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
  width: 100%;
  background-color: white;
  padding: ${({ theme }) => theme.spacing.medium};
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    h4 {
      font-size: 1rem;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.textLight};
      margin: 0;
    }

    p {
      font-size: 1.25rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.text};
      margin: 0;
    }
  }
`;
