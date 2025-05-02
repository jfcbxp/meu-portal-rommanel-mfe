import styled, { css } from 'styled-components';

interface StyledButtonProps {
  variant?: 'primary' | 'secondary' | 'filter' | 'copy';
  isLoading?: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.medium}
    ${({ theme }) => theme.spacing.large};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  width: 100%; // Default to full width, can be overridden
  min-height: 50px; // Ensure consistent height
  position: relative;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  ${({ variant, theme }) => {
    switch (variant) {
      case 'secondary':
        return css`
          background-color: ${theme.colors.secondary};
          color: ${theme.colors.text};
          border: 1px solid ${theme.colors.inputBorder};
          &:hover:not(:disabled) {
            background-color: #f1f1f1; // Slightly darker gray
          }
        `;
      case 'filter':
        return css`
          background-color: ${theme.colors.background};
          color: ${theme.colors.textLight};
          border: 1px solid ${theme.colors.inputBorder};
          border-radius: ${theme.borderRadius.medium};
          padding: ${theme.spacing.small} ${theme.spacing.medium};
          font-size: 0.875rem;
          width: auto; // Auto width for filter buttons
          min-height: auto;
          &:hover:not(:disabled) {
            background-color: #f8f8f8; // Light hover
          }
        `;
      case 'copy':
        return css`
          background-color: ${theme.colors.background};
          color: ${theme.colors.primary};
          border: 1px solid ${theme.colors.primary};
          border-radius: ${theme.borderRadius.large};
          padding: ${theme.spacing.small} ${theme.spacing.medium};
          font-size: 0.875rem;
          width: auto; // Auto width
          min-height: auto;
          svg {
            margin-right: ${theme.spacing.small};
            fill: ${theme.colors.primary};
          }
          &:hover:not(:disabled) {
            background-color: rgba(93, 58, 123, 0.05); // Light purple hover
          }
        `;
      case 'primary':
      default:
        return css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.textWhite};
          &:hover:not(:disabled) {
            background-color: #4a2d62; // Darker purple
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
        `;
    }
  }}

  // Style for loading state
  ${({ isLoading }) =>
    isLoading &&
    css`
      color: transparent !important; // Hide text
      pointer-events: none; // Disable clicks
    `}
`;

export const LoadingSpinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #ffffff;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;
