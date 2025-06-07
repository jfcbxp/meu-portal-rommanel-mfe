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
  showPaginator: boolean;
  setShowPaginator: (show: boolean) => void;
}

export default function Header(properties: Readonly<HeaderProps>) {
  const isMobile = useIsMobile();
  const { token, setToken } = useAuthContext();
  const [name, setName] = useState<string>('Usuário');

  useEffect(() => {
    if (token) {
      setName(jwtDecode(token)['name']);
    }
  }, [token]);

  if (!properties.title) {
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
        {properties.title && <HeaderTitle>{properties.title}</HeaderTitle>}
        <FaTimes
          size={24}
          color="purple"
          onClick={() => {
            if (properties.onClick) {
              properties.onClick(null);
            }
            properties.setShowPaginator(!properties.showPaginator);
          }}
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
          onClick={() => properties.onClick && properties.onClick(null)}
          style={{ cursor: 'pointer' }}
        />
        {properties.title && <HeaderTitle>{properties.title}</HeaderTitle>}
        <span style={{ width: '2.5rem' }}></span> {/* Spacer */}
      </HeaderContainer>
    );
  }
}
