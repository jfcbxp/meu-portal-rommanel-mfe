import { Button as PrimeButton, ButtonProps } from 'primereact/button';
import styled from 'styled-components';

// Style the PrimeReact Button using styled()
const StyledButton = styled(PrimeButton)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textWhite};
  padding: ${({ theme }) => theme.spacing.medium}
    ${({ theme }) => theme.spacing.large};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  width: 100%;
  display: flex; // Needed for PrimeButton loading icon alignment
  justify-content: center;
  align-items: center;
  min-height: 50px; // Match reference
  border: none;
  transition: background-color 0.2s ease-in-out;
  font-size: 1rem;
  font-weight: bolder;

  &:hover:not(:disabled) {
    background-color: #4a2d62; // Darker purple
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  // Style for loading icon (PrimeReact uses .p-button-loading-icon)
  .p-button-loading-icon {
    margin-right: ${({ theme }) => theme.spacing.small};
    font-size: 1.2rem; // Adjust size if needed
  }
`;

interface Properties extends ButtonProps {
  label: string;
  loading: boolean;
  disabled: boolean;
}

export default function Button(properties: Properties) {
  return (
    <StyledButton
      {...properties}
      label={properties.loading ? '' : properties.label}
      loading={properties.loading}
      disabled={properties.disabled}
    />
  );
}
