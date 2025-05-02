'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '@/components/Input';
import Button from '@/components/Button';

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.large};
  background-color: ${({ theme }) => theme.colors.background};
`;

const LogoContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const Title = styled.h1`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.logoText};
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
  text-align: center;
`;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

// CPF Validation Function
const isValidCPF = (cpf: string): boolean => {
  const cleaned = cpf.replace(/\D/g, '');
  return cleaned.length === 11; // Ensure exactly 11 digits
};

// CPF Formatting Function
const formatCPF = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);
  if (!match) return cleaned;
  let formatted = '';
  if (match[1]) formatted += match[1];
  if (match[2]) formatted += '.' + match[2];
  if (match[3]) formatted += '.' + match[3];
  if (match[4]) formatted += '-' + match[4];
  return formatted;
};

export default function LoginPage() {
  const [cpf, setCpf] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCpfChange = (value: string) => {
    setCpf(formatCPF(value));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isValidCPF(cpf)) {
      alert('CPF inválido. Por favor, insira um CPF válido.');
      return;
    }
    setIsLoading(true);
    console.log('Login attempt with CPF:', cpf);
    setTimeout(() => {
      setIsLoading(false);
      alert('Login simulado com CPF: ' + cpf);
    }, 1500);
  };

  return (
    <LoginPageContainer>
      <LogoContainer>Rommanel</LogoContainer>
      <Title>Portal do Revendedor Rommanel-PA</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          id="cpf"
          label="CPF"
          placeholder="111.111.111-11"
          requiredText="Campo obrigatório"
          maxLength={14}
          value={cpf}
          onValueChange={handleCpfChange}
          type="tel"
          inputMode="numeric"
          required
        />
        <LoginButton
          type="submit"
          variant="primary"
          isLoading={isLoading}
          disabled={!isValidCPF(cpf) || isLoading}
        >
          Entrar
        </LoginButton>
      </Form>
    </LoginPageContainer>
  );
}
