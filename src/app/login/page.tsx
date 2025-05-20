'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';
import logo_grande from '../../../public/logo_grande.png';
import CPF from '@/components/inputs/cpf';
import Button from '@/components/buttons/button';
import useIsMobile from '@/hooks/useIsMobile';

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.large};
`;

const LogoContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  text-align: center;
  // Placeholder for logo - using text for now
  span {
    font-size: 2.5rem; // Adjust size as needed
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
    // Add Rommanel specific styling if an SVG/Image is available
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.logoText};
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
  font-weight: bolder; // Match reference image
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

export default function LoginPage() {
  const [cpf, setCpf] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setToken } = useAuth();
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    // Simula autenticação
    setTimeout(() => {
      setToken('fake-token'); // Define o token no contexto
      setIsLoading(false);
      router.push('/boletos'); // Redireciona para a página de boletos
    }, 1500);
  };

  const isMobile = useIsMobile();

  return (
    <PageContainer>
      <div style={{ width: isMobile ? '100%' : '400px' }}>
        <LogoContainer>
          <Image alt="logo_grande" src={logo_grande} height={75}></Image>
        </LogoContainer>
        <Title>Portal do Revendedor Rommanel-PA</Title>

        <Form onSubmit={handleSubmit}>
          <CPF value={cpf} onChange={e => setCpf(e.value)} />
          <Button
            label="Entrar"
            loading={isLoading}
            disabled={cpf.replaceAll('_', '').length < 14}
          />
        </Form>
      </div>
    </PageContainer>
  );
}
