'use client';

import React, { lazy, Suspense } from 'react';

// Lazy load das páginas
const BoletosPage = lazy(() => import('./boletos/page'));
const DetalhesBoletoPage = lazy(() => import('./detalhesBoleto/page'));
const LoginPage = lazy(() => import('./login/page'));

interface DynamicRouterProps {
  page: 'login' | 'boletos' | 'detalhesBoleto';
}

export default function DynamicRouter({ page }: DynamicRouterProps) {
  const renderPage = () => {
    switch (page) {
      case 'login':
        return <LoginPage />;
      case 'boletos':
        return <BoletosPage />;
      case 'detalhesBoleto':
        return <DetalhesBoletoPage />;
      default:
        return <p>Página não encontrada</p>;
    }
  };

  return <Suspense fallback={<p>Carregando...</p>}>{renderPage()}</Suspense>;
}
