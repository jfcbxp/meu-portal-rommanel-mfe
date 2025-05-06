import { Boleto } from '@/types/index';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const groupBoletosByDate = (boletos: Boleto[]) => {
  return boletos.reduce((acc, boleto) => {
    const formattedDate = formatDate(boleto.data);
    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }
    acc[formattedDate].push(boleto);
    return acc;
  }, {} as Record<string, Boleto[]>);
};
