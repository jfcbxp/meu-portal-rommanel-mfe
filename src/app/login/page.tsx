'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';
import logo_grande from '../../../public/logo_grande.png';
import Cpf from '@/components/inputs/cpf';
import Button from '@/components/buttons/button';
import useIsMobile from '@/hooks/useIsMobile';
import { fetchLogin } from '../services';

export default function LoginPage() {
  const [cpf, setCpf] = useState('69409846234');
  const [isLoading, setIsLoading] = useState(false);
  const { token, setToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    } else {
      router.push('/orders');
    }
  }, [router, token]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    fetchLogin(cpf).then(response => {
      setIsLoading(false);
      if (response && !response.startsWith('Failed to fetch')) {
        setToken(response);
      } else {
        alert(response);
      }
    });
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
          <Cpf value={cpf} onChange={e => setCpf(e.value)} />
          <Button
            label="Entrar"
            loading={isLoading}
            disabled={cpf.replaceAll('_', '').length < 11}
          />
        </Form>
      </div>
    </PageContainer>
  );
}

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
  span {
    font-size: 2.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.logoText};
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
  font-weight: bolder;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;
