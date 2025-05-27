import useIsMobile from '@/hooks/useIsMobile';
import { FaChevronLeft, FaSignOutAlt, FaTimes } from 'react-icons/fa';

import favicon from '../../../public/favicon.ico';
import Image from 'next/image';
import { useAuthContext } from '@/contexts/AuthContext';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { HeaderContainer, HeaderMenu, HeaderTitle } from './styles';

interface HeaderProps {
  title?: string;
  onClick?: (click: any) => void;
}

export default function Header({ title, onClick }: Readonly<HeaderProps>) {
  const isMobile = useIsMobile();
  const { token, setToken } = useAuthContext();
  const [name, setName] = useState<string>('Usuário');

  useEffect(() => {
    if (token) {
      setName(jwtDecode(token)['name']);
    }
  }, [token]);

  if (!title) {
    return (
      <HeaderContainer>
        <Image alt="favicon" src={favicon} />
        {isMobile ? (
          <FaSignOutAlt
            onClick={() => setToken(null)}
            size={32}
            color="purple"
            style={{ cursor: 'pointer' }}
          />
        ) : (
          <HeaderMenu>
            {`Olá, ${name}`}
            <FaSignOutAlt
              onClick={() => setToken(null)}
              size={24}
              color="purple"
              style={{ cursor: 'pointer' }}
            />
          </HeaderMenu>
        )}
      </HeaderContainer>
    );
  }
  if (isMobile) {
    return (
      <HeaderContainer>
        <span style={{ width: '2.5rem' }}></span> {/* Spacer */}
        {title && <HeaderTitle>{title}</HeaderTitle>}
        <FaTimes
          size={24}
          color="purple"
          onClick={() => onClick && onClick(null)}
          style={{ cursor: 'pointer' }}
        />
      </HeaderContainer>
    );
  } else {
    return (
      <HeaderContainer>
        <FaChevronLeft
          size={24}
          color="purple"
          onClick={() => onClick && onClick(null)}
          style={{ cursor: 'pointer' }}
        />
        {title && <HeaderTitle>{title}</HeaderTitle>}
        <span style={{ width: '2.5rem' }}></span> {/* Spacer */}
      </HeaderContainer>
    );
  }
}
