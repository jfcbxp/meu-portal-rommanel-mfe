import styled from 'styled-components';

export interface Properties {
  status: string;
}

export default function StatusChip(properties: Readonly<Properties>) {
  return (
    <Chip status={properties.status}>
      <span>{properties.status}</span>
    </Chip>
  );
}

const Chip = styled.div<{ status: string }>`
  font-size: 0.85rem;
  font-weight: bolder;
  height: 20px;
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.small} !important;
  background-color: ${({ theme, status }) =>
    status === 'Pago' ? '#E4F6E8' : theme.colors.secondary};
  color: ${({ theme, status }) =>
    status === 'Pago' ? theme.colors.success : theme.colors.textLight};

  .p-chip-label {
    line-height: 1.2;
  }
`;
