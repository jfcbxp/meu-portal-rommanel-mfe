import StatusChip from '@/components/labels/statusChip';
import OrderContentComponent from '@/components/order';
import OrderDetails from '@/components/order/details';
import { useAuthContext } from '@/contexts/AuthContext';
import useIsMobile from '@/hooks/useIsMobile';
import { OrderContent } from '@/types/index';
import toBRL from '@/utils/toBRL';
import { Image } from 'primereact/image';
import React, { useEffect, useState } from 'react';
import { FaChevronRight, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import {
  CardAmount,
  CardBalance,
  CardBody,
  CardContainer,
  CardHeader,
  CardIconContainer,
  CardInfoContainer,
  CardItemCount,
  CardSubtitle,
  CardTitle,
  CardValueContainer,
} from './styles';
import { useOrderItemsQuery } from '@/hooks/useOrderItemQuery';

interface Properties {
  order: OrderContent;
  orderId: number;
  setOrderId: (orderId: number) => void;
}

export default function OrderItemComponent(properties: Readonly<Properties>) {
  const isMobile = useIsMobile();
  const isOpen = properties.orderId === properties.order.id;
  const [visible, setVisible] = useState(false);
  const { token, checkRequestError } = useAuthContext();

  const {
    data: orderItems,
    isError,
    error,
  } = useOrderItemsQuery({
    token,
    branch: properties.order.branch,
    document: properties.order.document,
    version: properties.order.version,
    enabled: (visible || isOpen) && properties.order.quantity > 0,
  });

  const handleCardClick = (id: number) => {
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

  useEffect(() => {
    checkRequestError(error);
  }, [error, checkRequestError]);

  if (visible) {
    return (
      <OrderDetails
        setVisible={setVisible}
        order={properties.order}
        items={orderItems}
      />
    );
  }

  return (
    <CardContainer key={properties.order.id}>
      <CardHeader>
        <CardSubtitle>{`nº ${
          properties.order.document +
          ' - Parcela: ' +
          properties.order.installment
        }`}</CardSubtitle>
        <StatusChip status={properties.order.status} />
      </CardHeader>
      <CardBody>
        <CardIconContainer>
          <Image
            alt="image"
            width={isMobile ? '48' : '56'}
            height={isMobile ? '48' : '56'}
            src={
              properties.order.image ? properties.order.image : 'no-image.png'
            }
            onError={e => {
              (e.target as HTMLImageElement).src = 'no-image.png';
            }}
          />
        </CardIconContainer>
        <CardInfoContainer>
          <CardTitle>{properties.order.typeDescription}</CardTitle>
          <CardValueContainer>
            <CardBalance>{`${toBRL(
              properties.order.balance > 0
                ? properties.order.balance
                : properties.order.amount,
            )}`}</CardBalance>
            {properties.order.status === 'Pago Parcialmente' && (
              <CardAmount>{`${toBRL(properties.order.amount)}`}</CardAmount>
            )}
            <CardItemCount>
              {properties.order.quantity == 0
                ? `Avulso`
                : (() => {
                    const plural = properties.order.quantity > 1 ? 's' : '';
                    return `${properties.order.quantity} item${plural}`;
                  })()}
            </CardItemCount>
          </CardValueContainer>
        </CardInfoContainer>

        {ChevronIcon}
      </CardBody>
      {isOpen && (
        <div style={{ width: '100%' }}>
          {isError && <div>Erro ao carregar itens do pedido.</div>}
          <OrderContentComponent order={properties.order} items={orderItems} />
        </div>
      )}
    </CardContainer>
  );
}
