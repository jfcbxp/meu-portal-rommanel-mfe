'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo_grande from '../../../public/logo_grande.png';
import Cpf from '@/components/inputs/cpf';
import Button from '@/components/buttons/button';
import useIsMobile from '@/hooks/useIsMobile';
import { fetchLogin } from '../../services/fetchLogin';
import {
  LoginContainer,
  LoginForm,
  LoginLogoContainer,
  LoginTitle,
} from './styles';
import { useAuthContext } from '@/contexts/AuthContext';
import Password from '@/components/inputs/password';

export default function LoginPage() {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { token, setToken } = useAuthContext();
  const router = useRouter();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (token) router.push('/orders');
  }, [router, token]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    fetchLogin(cpf, senha).then(response => {
      setIsLoading(false);
      if (response && !response.startsWith('Failed to fetch')) {
        setToken(response);
      } else {
        alert(response);
      }
    });
  };

  return (
    <LoginContainer>
      <div style={{ width: isMobile ? '100%' : '400px' }}>
        <LoginLogoContainer>
          <Image alt="logo_grande" src={logo_grande} height={75}></Image>
        </LoginLogoContainer>
        <LoginTitle>Portal do Revendedor Rommanel-PA</LoginTitle>

        <LoginForm onSubmit={handleSubmit}>
          <Cpf value={cpf} onChange={e => setCpf(e.value)} />
          <Password
            value={senha}
            onChange={e => setSenha(e.target.value.trim())}
          />
          <Button
            label="Entrar"
            loading={isLoading}
            disabled={cpf.replaceAll('_', '').length < 11 || senha.length < 6}
          />
        </LoginForm>
      </div>
    </LoginContainer>
  );
}
