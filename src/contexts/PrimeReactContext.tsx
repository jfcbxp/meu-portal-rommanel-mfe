'use client';

import React from 'react';
import { PrimeReactProvider } from 'primereact/api';
// Remove Tailwind preset import

interface LayoutProps {
  children: React.ReactNode;
}

export default function Provider({ children }: Readonly<LayoutProps>) {
  return (
    // Set unstyled to true, remove pt: Tailwind
    <PrimeReactProvider value={{ unstyled: false }}>
      {children}
    </PrimeReactProvider>
  );
}
