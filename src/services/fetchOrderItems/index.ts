import { OrderItem } from '@/types/index';

export const fetchOrderItems = async (
  token: string,
  branch: string,
  document: string,
  version: string,
): Promise<OrderItem | string> => {
  let url = new URL(`http://25.36.229.72:3000/orders`);
  const params: Record<string, string> = {};
  params.branch = branch;
  params.document = document;
  params.version = version;

  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return `Request failed with status [${response.status}] : ${response.statusText}`;
    }

    const data = await response.json();

    if (data && typeof data === 'object' && Array.isArray(data.content)) {
      return data as OrderItem;
    } else {
      return `Erro: A resposta não contém um array válido de items!`;
    }
  } catch (error: any) {
    return error.message;
  }
};
