'use client';

import { Inter } from 'next/font/google';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@/styles/global';
import theme from '@/styles/theme';
import { AuthProvider } from '../providers/AuthProvider';
import StyledComponentsRegistry from 'src/lib/registry';
import useIsMobile from '@/hooks/useIsMobile';
import 'primereact/resources/themes/lara-light-purple/theme.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRef } from 'react';
import PrimeReactProvider from '../providers/PrimeReactProvider';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobile = useIsMobile();
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <html lang="en">
      <body
        className={`${inter.variable}`}
        style={{ marginInline: !isMobile ? '15vw' : undefined }}
      >
        <AuthProvider>
          <PrimeReactProvider>
            <StyledComponentsRegistry>
              <ThemeProvider theme={theme}>
                <GlobalStyle />
                <QueryClientProvider client={queryClientRef.current}>
                  {children}
                </QueryClientProvider>
              </ThemeProvider>
            </StyledComponentsRegistry>
          </PrimeReactProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
