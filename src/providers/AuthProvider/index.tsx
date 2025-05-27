import React, { useState, useEffect, useCallback } from 'react';
import { fetchMe } from 'src/services/fetchMe';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/contexts/AuthContext/index';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('token');
    }
    return null;
  });

  const checkRequestError = useCallback(
    (error: Error) => {
      if (
        error &&
        typeof error.message === 'string' &&
        error.message.includes('401')
      ) {
        setToken(null);
      }
    },
    [setToken],
  );

  useEffect(() => {
    if (token) {
      sessionStorage.setItem('token', token);
      fetchMe(token).then(response => {
        if (response !== 'ok') {
          sessionStorage.removeItem('token');
          setToken(null);
        }
      });
    } else {
      router.push('/login');
      sessionStorage.removeItem('token');
      setToken(null);
    }
  }, [router, token]);

  const value = React.useMemo(
    () => ({ token, setToken, checkRequestError }),
    [token, setToken, checkRequestError],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
