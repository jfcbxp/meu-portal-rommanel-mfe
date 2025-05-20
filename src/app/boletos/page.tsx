'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { Button as PrimeButton } from 'primereact/button';
import { mockBoletos } from '@/utils/mock';
import Boletos from '@/components/lists/boletos';
import useIsMobile from '@/hooks/useIsMobile';
import favicon from '../../../public/favicon.ico';
import Image from 'next/image';
import { FaUser, FaBars } from 'react-icons/fa';

export default function BoletosPage() {
  const [filterActive, setFilterActive] = useState<'30dias' | null>(null);
  const isMobile = useIsMobile();

  return (
    <PageContainer>
      <Header>
        <Image alt="favicon" src={favicon} />
        {isMobile ? (
          <FaBars size={32} color="purple" style={{ cursor: 'pointer' }} />
        ) : (
          <MenuUser>
            <FaUser size={24} color="purple" /> Olá, Usuário
          </MenuUser>
        )}
      </Header>

      <Breadcrumb>Início / Meus boletos</Breadcrumb>

      <InfoContainer>
        <InfoIcon>
          <i>i</i>
        </InfoIcon>
        <InfoText>
          Boletos pagos podem demorar até 3 dias para serem atualizados
        </InfoText>
      </InfoContainer>

      <ContentWrapper style={{ flexDirection: isMobile ? 'column' : 'row' }}>
        <FilterContainer>
          <TitleRow>
            <Title>Boletos</Title>
          </TitleRow>

          <FilterButtons>
            <FilterButton label="Filtrar" icon="pi pi-filter" />
            <FilterButton
              label="30 dias"
              $active={filterActive === '30dias'}
              onClick={() => setFilterActive('30dias')}
            />
            {filterActive && (
              <ClearButton
                label="Limpar"
                icon="pi pi-times"
                onClick={() => setFilterActive(null)}
              />
            )}
          </FilterButtons>
        </FilterContainer>

        <Boletos filterActive={filterActive} boletos={mockBoletos} />
      </ContentWrapper>
    </PageContainer>
  );
}

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Header = styled.header`
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

const MenuUser = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
`;

const Breadcrumb = styled.div`
  padding: ${({ theme }) => theme.spacing.small}
    ${({ theme }) => theme.spacing.medium};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textLight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
`;

const ContentWrapper = styled.main`
  display: flex;
  padding: ${({ theme }) => theme.spacing.large};
  flex-grow: 1;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const Title = styled.h1`
  font-size: 1.5rem; // 24px
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.large};
  flex-wrap: wrap; // Allow filters to wrap on smaller screens
`;

const FilterButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
`;

// Styled PrimeButton for filters
const FilterButton = styled(PrimeButton)<{ $active?: boolean }>`
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.secondary : theme.colors.background};
  color: ${({ theme }) => theme.colors.textLight};
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.small}
    ${({ theme }) => theme.spacing.medium};
  font-size: 0.875rem;
  height: auto;
  min-width: auto;

  .p-button-icon {
    font-size: 1rem; // Adjust icon size if needed
    margin-right: ${({ theme }) => theme.spacing.small};
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const ClearButton = styled(PrimeButton)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textLight};
  border: none;
  padding: ${({ theme }) => theme.spacing.small}
    ${({ theme }) => theme.spacing.small};
  font-size: 0.875rem;
  height: auto;
  min-width: auto;

  .p-button-icon {
    font-size: 0.75rem; // Smaller icon
    margin-right: 4px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: flex-start; // Align icon and text to the top
  background-color: ${({ theme }) => theme.colors.info};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.large};
  border: 1px solid #bee5eb; // Slightly darker border for info color
  gap: ${({ theme }) => theme.spacing.small};
`;

const InfoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #bee5eb 0%, #bee5eb 100%);
  flex-shrink: 0;
  i {
    color: white;
    font-size: 1.25rem;
    font-weight: bolder;
  }
`;

const InfoText = styled.p`
  font-size: 0.875rem; // 14px
  color: ${({ theme }) => theme.colors.infoText};
  line-height: 1.4;
  margin: 0;
`;
