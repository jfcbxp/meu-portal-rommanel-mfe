import { CalendarProps } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import { StyledCalendar } from './styles';

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
      placeholder="Data (De - Até)"
      dateFormat="dd/mm/yy"
      selectionMode="range"
      readOnlyInput
      hideOnRangeSelection
      locale="pt-BR"
    />
  );
}
