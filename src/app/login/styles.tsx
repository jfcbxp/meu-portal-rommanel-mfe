import styled from 'styled-components';
import { Button as PrimeButton } from 'primereact/button';
import { InputMask } from 'primereact/inputmask';

export const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.large};
`;

export const LoginContentWrapper = styled.div`
  width: 100%;
  max-width: 400px; // Limit form width on larger screens
`;

export const LoginLogoContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  text-align: center;
  // Placeholder for logo - using text for now
  span {
    font-size: 2.5rem; // Adjust size as needed
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
    // Add Rommanel specific styling if an SVG/Image is available
  }
`;

export const LoginTitle = styled.h1`
  text-align: center;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.logoText};
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
  font-weight: 400; // Match reference image
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

export const LoginInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LoginLabel = styled.label`
  font-size: 0.875rem; // 14px
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

export const LoginInput = styled(InputMask)`
  padding: ${({ theme }) => theme.spacing.medium};
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: 1rem; // 16px
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(93, 58, 123, 0.2); // Sombra roxa clara no foco
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
  }
`;

export const LoginHelperTextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem; // 12px
  color: ${({ theme }) => theme.colors.textLight};
  margin-top: ${({ theme }) => theme.spacing.small};
`;

export const LoginButton = styled(PrimeButton)`
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
  font-weight: 500;

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
