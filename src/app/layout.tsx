'use client';

import { Inter } from 'next/font/google';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@/styles/global';
import theme from '@/styles/theme';
import Provider from '@/contexts/PrimeReactContext';
import { AuthProvider } from '@/contexts/AuthContext';
import StyledComponentsRegistry from 'src/lib/registry';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <AuthProvider>
          <Provider>
            <StyledComponentsRegistry>
              <ThemeProvider theme={theme}>
                <GlobalStyle />
                {children}
              </ThemeProvider>
            </StyledComponentsRegistry>
          </Provider>
        </AuthProvider>
      </body>
    </html>
  );
}
