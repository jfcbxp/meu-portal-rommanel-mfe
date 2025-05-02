export interface BoletoItem {
  id: string;
  descricao: string;
  quantidade: number;
  valor: string;
  imagemUrl?: string;
}

export interface Boleto {
  id: string;
  compra: string;
  valor: string;
  quantidadeItens: number;
  status: 'Pago' | 'Pendente' | 'Vencido';
  data: string;
  fornecedor: string;
  itens: BoletoItem[];
  formaPagamento: string;
  codigoBarras: string;
}
