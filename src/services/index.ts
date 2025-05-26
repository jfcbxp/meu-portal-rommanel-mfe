import { Order, OrderItem } from '@/types/index';

const baseUrl = `http://25.36.229.72:3000`;

export const fetchLogin = async (cpf: string): Promise<string> => {
  try {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: cpf,
      }),
    });

    if (!response.ok) {
      return `Request failed with status [${response.status}] : ${response.statusText}`;
    } else {
      const data = await response.json();
      return data.accessToken ?? '';
    }
  } catch (error: any) {
    return error.message;
  }
};

export const fetchAuth = async (token: string): Promise<string> => {
  try {
    const response = await fetch(`${baseUrl}/auth/me`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return `Request failed with status [${response.status}] : ${response.statusText}`;
    } else {
      return 'ok';
    }
  } catch (error: any) {
    return error.message;
  }
};

export const fetchOrders = async (
  token: string,
  page?: number,
  status?: string,
  type?: string,
  startDate?: string,
  endDate?: string,
): Promise<Order | string> => {
  try {
    let url = new URL(
      `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/api/payments`,
      window.location.origin,
    );
    const params: Record<string, string> = {};
    if (startDate && endDate) {
      params.dateStart = startDate;
      params.dateEnd = endDate;
    }
    if (type) {
      params.type = type;
    }
    if (status) {
      params.status = status;
    }
    if (page) {
      params.page = page.toString();
    }

    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key]),
    );
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token, // ou `Bearer ${token}` se preferir
      },
    });

    if (!response.ok) {
      return `Request failed with status [${response.status}] : ${response.statusText}`;
    }

    const data = await response.json();

    if (data && typeof data === 'object' && Array.isArray(data.content)) {
      return data as Order;
    } else {
      return `Erro: A resposta não contém um array válido de boletos!`;
    }
  } catch (error: any) {
    return error.message;
  }
};

export const fetchOrderItems = async (
  token: string,
  branch: string,
  document: string,
  version: string,
): Promise<OrderItem | string> => {
  let url = new URL(`${baseUrl}/orders`);
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
