import useIsMobile from '@/hooks/useIsMobile';
import { FaBars, FaChevronLeft, FaTimes, FaUser } from 'react-icons/fa';
import { styled } from 'styled-components';
import favicon from '../../../public/favicon.ico';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

interface HeaderProps {
  title?: string;
  onClick?: (click: any) => void;
}

export default function Header({ title, onClick }: Readonly<HeaderProps>) {
  const isMobile = useIsMobile();
  const { token } = useAuth();
  const [name, setName] = useState<string>('Usuário');

  useEffect(() => {
    if (token) {
      setName(jwtDecode(token)['name']);
    }
  }, [token]);

  if (!title) {
    return (
      <Container>
        <Image alt="favicon" src={favicon} />
        {isMobile ? (
          <FaBars size={32} color="purple" style={{ cursor: 'pointer' }} />
        ) : (
          <MenuUser>
            <FaUser size={24} color="purple" />
            {`Olá, ${name}`}
          </MenuUser>
        )}
      </Container>
    );
  }
  if (isMobile) {
    return (
      <Container>
        <span style={{ width: '2.5rem' }}></span> {/* Spacer */}
        {title && <Title>{title}</Title>}
        <FaTimes
          size={24}
          color="purple"
          onClick={() => onClick && onClick(null)}
          style={{ cursor: 'pointer' }}
        />
      </Container>
    );
  } else {
    return (
      <Container>
        <FaChevronLeft
          size={24}
          color="purple"
          onClick={() => onClick && onClick(null)}
          style={{ cursor: 'pointer' }}
        />
        {title && <Title>{title}</Title>}
        <span style={{ width: '2.5rem' }}></span> {/* Spacer */}
      </Container>
    );
  }
}

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.headerBackground};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  width: 100%;

  .p-button {
    color: ${({ theme }) => theme.colors.iconColor};
  }
`;

const Title = styled.span`
  font-size: 1.125rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const MenuUser = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
`;
