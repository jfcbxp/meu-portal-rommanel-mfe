import { Button as PrimeButton, ButtonProps } from 'primereact/button';
import styled from 'styled-components';

const StyledButton = styled(PrimeButton)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textWhite};
  padding: ${({ theme }) => theme.spacing.medium}
    ${({ theme }) => theme.spacing.large};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50px;
  border: none;
  transition: background-color 0.2s ease-in-out;
  font-size: 1rem;
  font-weight: bolder;

  &:hover:not(:disabled) {
    background-color: #4a2d62;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .p-button-loading-icon {
    margin-right: ${({ theme }) => theme.spacing.small};
    font-size: 1.2rem;
  }
`;

interface Properties extends ButtonProps {
  label: string;
  loading?: boolean;
  disabled?: boolean;
}

export default function Button(properties: Readonly<Properties>) {
  return (
    <StyledButton
      {...properties}
      label={properties.loading ? '' : properties.label}
      loading={properties.loading}
      disabled={properties.disabled}
    />
  );
}
