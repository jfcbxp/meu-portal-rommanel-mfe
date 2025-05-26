'use client';

import { Inter } from 'next/font/google';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@/styles/GlobalStyle';
import theme from '@/styles/theme';
import Provider from '@/contexts/PrimeReactContext';
import { AuthProvider } from '@/contexts/AuthContext';
import StyledComponentsRegistry from 'src/lib/registry';
import useIsMobile from '@/hooks/useIsMobile';
import 'primereact/resources/themes/lara-light-purple/theme.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRef } from 'react';

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
          <Provider>
            <StyledComponentsRegistry>
              <ThemeProvider theme={theme}>
                <GlobalStyle />
                <QueryClientProvider client={queryClientRef.current}>
                  {children}
                </QueryClientProvider>
              </ThemeProvider>
            </StyledComponentsRegistry>
          </Provider>
        </AuthProvider>
      </body>
    </html>
  );
}
