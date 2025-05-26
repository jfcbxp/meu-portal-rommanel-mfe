export const fetchMe = async (token: string): Promise<string> => {
  try {
    const response = await fetch(`http://25.36.229.72:3000/auth/me`, {
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
