'use client';

import { Inter } from 'next/font/google';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@/styles/GlobalStyle';
import theme from '@/styles/theme';
import Provider from '@/contexts/PrimeReactContext';
import { AuthProvider } from '@/contexts/AuthContext';
import StyledComponentsRegistry from 'src/lib/registry';
import { useState } from 'react';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobile, setMobile] = useState(
    window.matchMedia('(max-width: 768px)').matches,
  );
  window.addEventListener('resize', () => {
    if (window.matchMedia('(max-width: 768px)').matches) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  });
  return (
    <html lang="en">
      <body
        className={`${inter.variable}`}
        style={{ marginInline: !mobile ? '15vw' : undefined }}
      >
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
