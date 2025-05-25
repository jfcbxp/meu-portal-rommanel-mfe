import { Calendar, CalendarProps } from 'primereact/calendar';
import { styled } from 'styled-components';
import { addLocale } from 'primereact/api';

export default function DateInput(
  properties: Readonly<CalendarProps<'multiple', Date[]>>,
) {
  addLocale('pt-BR', {
    firstDayOfWeek: 0,
    dayNames: [
      'domingo',
      'segunda-feira',
      'terça-feira',
      'quarta-feira',
      'quinta-feira',
      'sexta-feira',
      'sábado',
    ],
    dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
    dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    monthNames: [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro',
    ],
    monthNamesShort: [
      'jan',
      'fev',
      'mar',
      'abr',
      'mai',
      'jun',
      'jul',
      'ago',
      'set',
      'out',
      'nov',
      'dez',
    ],
    today: 'Hoje',
    clear: 'Limpar',
  });

  return (
    <StyledCalendar
      {...properties}
      placeholder="DD/MM/AAAA - DD/MM/AAAA"
      dateFormat="dd/mm/yy"
      selectionMode="range"
      readOnlyInput
      hideOnRangeSelection
      locale="pt-BR"
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
`;
