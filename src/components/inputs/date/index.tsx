import { Calendar, CalendarProps } from 'primereact/calendar';
import { styled } from 'styled-components';

export default function DateInput(
  properties: Readonly<CalendarProps<'multiple', Date[]>>,
) {
  return (
    <StyledCalendar
      {...properties}
      placeholder="DD/MM/AAAA - DD/MM/AAAA"
      dateFormat="dd/mm/yy"
      selectionMode="range"
      readOnlyInput
      hideOnRangeSelection
      appendTo={'self'}
    />
  );
}

const StyledCalendar = styled(Calendar)`
  display: inline-block;
  position: relative;

  & input[type='text'] {
    width: 100%;
    box-sizing: border-box;
    padding: 8px 12px;
    border: 1px solid ${({ theme }) => theme.colors.inputBorder || '#ccc'};
    border-radius: ${({ theme }) => theme.borderRadius.medium || '8px'};
    font-size: 1rem;
    font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    transition: border-color 0.2s, box-shadow 0.2s;
    background: ${({ theme }) => theme.colors.background || '#fff'};
    color: ${({ theme }) => theme.colors.text || '#000'};
  }

  & input[type='text']:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary || '#888'};
    box-shadow: 0 0 0 0.2rem rgba(0, 0, 0, 0.1);
  }

  & [role='dialog'] {
    position: absolute;
    top: 110%;
    left: 0;
    z-index: 1000;
    background: ${({ theme }) => theme.colors.background || '#fff'};
    padding: 1rem;
    border-radius: ${({ theme }) => theme.borderRadius.medium || '8px'};
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  /* Header com navegação */
  & [role='dialog'] div[role='presentation'] {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  & [role='dialog'] div[role='presentation'] span {
    font-weight: 600;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text || '#333'};
  }

  & [role='dialog'] button[aria-label='Previous Month'],
  & [role='dialog'] button[aria-label='Next Month'] {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 4px;
    transition: transform 0.2s;
    color: ${({ theme }) => theme.colors.text || '#333'};
  }

  & [role='dialog'] button[aria-label='Previous Month']:hover,
  & [role='dialog'] button[aria-label='Next Month']:hover {
    transform: scale(1.1);
  }

  /* Tabela */
  & [role='dialog'] table {
    width: 100%;
    border-spacing: 8px;
    text-align: center;
  }

  & [role='dialog'] th {
    color: ${({ theme }) => theme.colors.placeholder || '#aaa'};
    font-weight: 500;
    font-size: 0.85rem;
  }

  /* Dias */
  & [role='dialog'] span[data-pc-section='daylabel'] {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.2s;
  }

  & [role='dialog'] span[data-pc-section='daylabel']:hover {
    background: #f5f5f5;
  }

  & [role='dialog'] span[aria-selected='true'] {
    background: #e6e6e6;
    color: ${({ theme }) => theme.colors.text || '#000'};
    font-weight: bold;
  }

  /* Hoje, opcional */
  & [role='dialog'] span[data-p-highlight='true'] {
    border: 1px solid #aaa;
  }
`;
