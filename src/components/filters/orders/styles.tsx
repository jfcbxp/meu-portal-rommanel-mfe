import { styled } from 'styled-components';
import { Button as PrimeButton } from 'primereact/button';

export const Container = styled.main`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.medium};
  height: 100%;

  h5: {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const FooterContainer = styled.div`
  display: flex;
  width: 100%;
  gap: ${({ theme }) => theme.spacing.small};
  bottom: 0;
  left: 0;
  position: fixed;
  padding: ${({ theme }) => theme.spacing.large};
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.small};
`;

export const FilterButton = styled(PrimeButton)<{ $active?: boolean }>`
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.secondary};
  color: ${({ theme, $active }) =>
    $active ? 'white' : theme.colors.textLight};
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.small};
  font-size: smaller;
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

export const ClearButton = styled(PrimeButton)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textLight};
  border: none;
  padding: ${({ theme }) => theme.spacing.small}
    ${({ theme }) => theme.spacing.small};
  font-size: 0.875rem;
  height: auto;
  min-width: auto;

  .p-button-icon {
    font-size: 0.75rem;
    margin-right: 4px;
  }
`;
