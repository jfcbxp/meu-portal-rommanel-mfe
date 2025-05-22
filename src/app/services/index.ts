export const fetchLogin = async (cpf: string) => {
  const baseUrl = `http://localhost:8080/v2/customers/login`;

  try {
    const mergedOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ cpf }),
    };
    const response = await fetch(baseUrl, mergedOptions);

    if (!response.ok) {
      console.error(
        `Request failed with status ${response.status} ${response.statusText}`,
      );
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.message === 'Invalid or unsafe URL') {
      throw error;
    }
    console.error(`Error fetching order: ${error}`);
    return {};
  }
};

export const fetchOrders = async (
  accessToken: string,
  currentPage: number,
  requestQueryParam: string,
) => {
  const requestPage = currentPage > 0 ? currentPage - 1 : currentPage;

  const pageParam = `page=${requestPage}`;

  const baseUrl = `http://localhost:8080/v2/customers/100114305889/orders?${pageParam.concat(
    requestQueryParam,
  )}`;

  try {
    const mergedOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    };
    const response = await fetch(baseUrl, mergedOptions);

    if (!response.ok) {
      console.error(
        `Request failed with status ${response.status} ${response.statusText}`,
      );
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.message === 'Invalid or unsafe URL') {
      throw error;
    }
    console.error(`Error fetching order: ${error}`);
    return {};
  }
};

export const fetchOrderItems = async (
  accessToken: string,
  orderId: string,
  requestQueryParam: string,
) => {
  const baseUrl = `http://localhost:8080/v2/customers/100114305889/orders/${orderId}/items${requestQueryParam}`;

  try {
    const mergedOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    };
    const response = await fetch(baseUrl, mergedOptions);

    if (!response.ok) {
      console.error(
        `Request failed with status ${response.status} ${response.statusText}`,
      );
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.message === 'Invalid or unsafe URL') {
      throw error;
    }
    console.error(`Error fetching order: ${error}`);
    return {};
  }
};

export const fetchPaymentTypes = async (accessToken: string) => {
  const baseUrl = `http://localhost:8080/v2/customers/100114305889/payment-types`;

  try {
    const mergedOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    };
    const response = await fetch(baseUrl, mergedOptions);

    if (!response.ok) {
      console.error(
        `Request failed with status ${response.status} ${response.statusText}`,
      );
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.message === 'Invalid or unsafe URL') {
      throw error;
    }
    console.error(`Error fetching order: ${error}`);
    return {};
  }
};

export const fetchPeriods = async (accessToken: string) => {
  const baseUrl = `http://localhost:8080/v2/customers/100114305889/periods`;

  try {
    const mergedOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    };
    const response = await fetch(baseUrl, mergedOptions);

    if (!response.ok) {
      console.error(
        `Request failed with status ${response.status} ${response.statusText}`,
      );
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.message === 'Invalid or unsafe URL') {
      throw error;
    }
    console.error(`Error fetching order: ${error}`);
    return {};
  }
};
