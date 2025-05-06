'use client';

import React, { useState } from 'react';
import { InputMaskChangeEvent } from 'primereact/inputmask';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
  LoginButton,
  LoginContentWrapper,
  LoginForm,
  LoginHelperTextContainer,
  LoginInputWrapper,
  LoginLabel,
  LoginLogoContainer,
  LoginPageContainer,
  LoginInput,
  LoginTitle,
} from './styles';

export default function LoginPage() {
  const [cpf, setCpf] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setToken } = useAuth();
  const router = useRouter();

  const handleCpfChange = (e: InputMaskChangeEvent) => {
    setCpf(e.value || '');
  };

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

  const rawCpf = cpf.replace(/\D/g, '');
  const isCpfComplete = rawCpf.length === 11;
  const charCount = rawCpf.length;

  return (
    <LoginPageContainer>
      <LoginContentWrapper>
        <LoginLogoContainer>
          {/* Replace with actual Rommanel Logo component/SVG if available */}
          <span>Rommanel</span>
        </LoginLogoContainer>
        <LoginTitle>Portal do Revendedor Rommanel-PA</LoginTitle>

        <LoginForm onSubmit={handleSubmit}>
          <LoginInputWrapper>
            <LoginLabel htmlFor="cpf">CPF</LoginLabel>
            <LoginInput
              id="cpf"
              mask="999.999.999-99"
              placeholder="111.111.111-11"
              value={cpf}
              onChange={handleCpfChange}
              required
              autoClear={false}
              unmask={false} // Keep mask
            />
            <LoginHelperTextContainer>
              <span>Campo obrigatório</span>
              <span>{charCount}/11</span>
            </LoginHelperTextContainer>
          </LoginInputWrapper>

          <LoginButton
            label="Entrar"
            type="submit"
            loading={isLoading}
            disabled={!isCpfComplete || isLoading}
          />
        </LoginForm>
      </LoginContentWrapper>
    </LoginPageContainer>
  );
}
