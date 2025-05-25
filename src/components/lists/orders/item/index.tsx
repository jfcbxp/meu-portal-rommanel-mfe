import StatusChip from '@/components/labels/status-chip';
import OrderContentComponent from '@/components/order';
import OrderDetails from '@/components/order/details';
import { useAuth } from '@/contexts/AuthContext';
import useIsMobile from '@/hooks/useIsMobile';
import { OrderContent } from '@/types/index';
import toBRL from '@/utils/toBRL';
import { Image } from 'primereact/image';
import React, { useState } from 'react';
import {
  FaChevronRight,
  FaChevronUp,
  FaChevronDown,
  FaBarcode,
} from 'react-icons/fa';
import { fetchOrderItems } from 'src/app/services';
import styled from 'styled-components';

interface Properties {
  order: OrderContent;
  orderId: number;
  setOrderId: (orderId: number) => void;
}

export default function OrderItemComponent(properties: Readonly<Properties>) {
  const isMobile = useIsMobile();
  const isOpen = properties.orderId === properties.order.id;
  const [visible, setVisible] = useState(false);
  const { token } = useAuth();

  const handleCardClick = (id: number) => {
    if (properties.order.quantity > 0) {
      fetchOrderItems(
        token,
        properties.order.branch,
        properties.order.document,
        properties.order.version,
      ).then(response => {
        if (
          response &&
          typeof response === 'object' &&
          Array.isArray(response)
        ) {
          properties.order.items = response;
        }
      });
    }
    if (isMobile) {
      setVisible(true);
    } else {
      setVisible(false);
      if (isOpen) {
        properties.setOrderId(undefined);
      } else {
        properties.setOrderId(id);
      }
    }
  };

  let ChevronIcon;
  if (isMobile) {
    ChevronIcon = (
      <FaChevronRight
        onClick={() => handleCardClick(properties.order.id)}
        style={{ cursor: 'pointer' }}
      />
    );
  } else if (isOpen) {
    ChevronIcon = (
      <FaChevronUp
        onClick={() => handleCardClick(properties.order.id)}
        style={{ cursor: 'pointer' }}
      />
    );
  } else {
    ChevronIcon = (
      <FaChevronDown
        onClick={() => handleCardClick(properties.order.id)}
        style={{ cursor: 'pointer' }}
      />
    );
  }

  if (visible) {
    return <OrderDetails setVisible={setVisible} order={properties.order} />;
  }

  return (
    <CardWrapper key={properties.order.id}>
      <CardHeader>
        <CardSubtitle>{`nº ${properties.order.document}`}</CardSubtitle>
        <StatusChip status={properties.order.status} />
      </CardHeader>
      <CardBody>
        <CardIconWrapper>
          {properties.order.image ? (
            <Image alt="image" src={properties.order.image} />
          ) : (
            <FaBarcode color="white" />
          )}
        </CardIconWrapper>
        <CardInfoWrapper>
          <CardTitle>{properties.order.product}</CardTitle>
          <CardValueWrapper>
            <CardAmount>{`${toBRL(properties.order.amount)}`}</CardAmount>
            <CardItemCount>
              {properties.order.quantity == 0
                ? `Em negociação`
                : (() => {
                    const plural = properties.order.quantity > 1 ? 's' : '';
                    return `${properties.order.quantity} item${plural}`;
                  })()}
            </CardItemCount>
          </CardValueWrapper>
        </CardInfoWrapper>
        {ChevronIcon}
      </CardBody>
      {isOpen && (
        <div style={{ width: '100%' }}>
          <OrderContentComponent order={properties.order} />
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
