import StatusChip from '@/components/labels/status-chip';
import OrderItem from '@/components/orderItem';
import useIsMobile from '@/hooks/useIsMobile';
import { Boleto } from '@/types/index';
import React from 'react';
import { FaChevronRight, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import styled from 'styled-components';

interface Properties {
  boleto: Boleto;
  orderId: string;
  setOrderId: (orderId: string) => void;
  goToDetails: (id: string) => void;
}

export default function BoletoItem(properties: Readonly<Properties>) {
  const isMobile = useIsMobile();
  const isOpen = properties.orderId === properties.boleto.id;

  const handleCardClick = (id: string) => {
    if (isMobile) {
      properties.goToDetails(id);
    } else if (isOpen) {
      properties.setOrderId(undefined);
    } else {
      properties.setOrderId(id);
    }
  };

  let ChevronIcon;
  if (isMobile) {
    ChevronIcon = <FaChevronRight />;
  } else if (isOpen) {
    ChevronIcon = <FaChevronUp />;
  } else {
    ChevronIcon = <FaChevronDown />;
  }

  return (
    <CardWrapper
      key={properties.boleto.id}
      onClick={() => handleCardClick(properties.boleto.id)}
    >
      <CardHeader>
        <CardSubtitle>{`nº ${properties.boleto.id}`}</CardSubtitle>
        <StatusChip status={properties.boleto.status} />
      </CardHeader>
      <CardBody>
        <CardIconWrapper>
          <i>{properties.boleto.compra[0]}</i>
        </CardIconWrapper>
        <CardInfoWrapper>
          <CardTitle>{properties.boleto.compra}</CardTitle>
          <CardValueWrapper>
            <CardAmount>{`R$ ${properties.boleto.valor}`}</CardAmount>
            <CardItemCount>{`${properties.boleto.quantidadeItens} item${
              properties.boleto.quantidadeItens > 1 ? 's' : ''
            }`}</CardItemCount>
          </CardValueWrapper>
        </CardInfoWrapper>
        {ChevronIcon}
      </CardBody>
      {isOpen && (
        <div style={{ width: '100%' }}>
          <OrderItem boleto={properties.boleto} />
        </div>
      )}
    </CardWrapper>
  );
}
const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
  }
`;

const CardHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.medium};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
`;

const CardBody = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.medium};
  gap: ${({ theme }) => theme.spacing.medium};
`;

const CardIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    #a67dff 0%,
    #7e57c2 100%
  ); // Gradiente roxo similar ao ícone
  flex-shrink: 0;
  i {
    color: white;
    font-size: 1.25rem;
  }
`;

const CardInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const CardTitle = styled.span`
  font-size: 0.875rem; // 14px
  font-weight: bolder;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
  margin-left: ${({ theme }) => theme.spacing.small};
`;

const CardSubtitle = styled.span`
  font-size: 0.875rem; // 14px
  font-weight: bolder;
  color: ${({ theme }) => theme.colors.textLight};
`;

const CardValueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  margin-left: ${({ theme }) => theme.spacing.small};
`;

const CardAmount = styled.span`
  font-size: 0.875rem; // 14px
  font-weight: bolder;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`;

const CardItemCount = styled.span`
  font-size: 0.75rem; // 12px
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 4px;
`;
