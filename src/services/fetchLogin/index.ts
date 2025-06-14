export const fetchLogin = async (
  cpf: string,
  senha: string,
): Promise<string> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/api/login`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cpf, senha }),
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
