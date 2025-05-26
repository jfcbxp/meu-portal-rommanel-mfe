'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchAuth } from 'src/app/services';

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('token');
    }
    return null;
  });

  useEffect(() => {
    if (token) {
      console.log(
        '%c[AuthProvider]%c Token atualizado!',
        'background: #a259d9; color: #fff; font-weight: bold; padding: 2px 6px; border-radius: 3px;',
        'color: #a259d9; font-weight: bold;',
      );
      sessionStorage.setItem('token', token);
      fetchAuth(token).then(response => {
        if (response !== 'ok') {
          sessionStorage.removeItem('token');
          setToken(null);
        }
      });
    } else {
      sessionStorage.removeItem('token');
    }
  }, [token]);

  const value = React.useMemo(() => ({ token, setToken }), [token, setToken]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
