import styled from 'styled-components';

export const AvisoWrapper = styled.div`
  display: flex;
  align-items: flex-start; // Align icon and text to the top
  background-color: ${({ theme }) => theme.colors.info};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.large};
  border: 1px solid #bee5eb; // Slightly darker border for info color
`;

export const IconWrapper = styled.div`
  margin-right: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.infoText};
  flex-shrink: 0; // Prevent icon from shrinking
  margin-top: 2px; // Align icon slightly better with text

  svg {
    width: 20px;
    height: 20px;
    fill: ${({ theme }) => theme.colors.infoText};
  }
`;

export const Text = styled.p`
  font-size: 0.875rem; // 14px
  color: ${({ theme }) => theme.colors.infoText};
  line-height: 1.4;
`;
