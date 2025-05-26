export const fetchLogin = async (cpf: string): Promise<string> => {
  try {
    const response = await fetch(`http://25.36.229.72:3000/auth/login`, {
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
