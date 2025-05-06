'use client';

import React from 'react';
import { PrimeReactProvider } from 'primereact/api';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Provider({ children }: LayoutProps) {
  return (
    <PrimeReactProvider value={{ unstyled: true }}>
      {children}
    </PrimeReactProvider>
  );
}
