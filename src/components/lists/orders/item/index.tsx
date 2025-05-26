import StatusChip from '@/components/labels/statusChip';
import OrderContentComponent from '@/components/order';
import OrderDetails from '@/components/order/details';
import { useAuthContext } from '@/contexts/AuthContext';
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
import {
  CardAmount,
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
import { fetchOrderItems } from '../../../../services/fetchOrderItems';

interface Properties {
  order: OrderContent;
  orderId: number;
  setOrderId: (orderId: number) => void;
}

export default function OrderItemComponent(properties: Readonly<Properties>) {
  const isMobile = useIsMobile();
  const isOpen = properties.orderId === properties.order.id;
  const [visible, setVisible] = useState(false);
  const { token } = useAuthContext();

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
    <CardContainer key={properties.order.id}>
      <CardHeader>
        <CardSubtitle>{`nº ${properties.order.document}`}</CardSubtitle>
        <StatusChip status={properties.order.status} />
      </CardHeader>
      <CardBody>
        <CardIconContainer>
          {properties.order.image ? (
            <Image alt="image" src={properties.order.image} />
          ) : (
            <FaBarcode color="white" />
          )}
        </CardIconContainer>
        <CardInfoContainer>
          <CardTitle>{properties.order.product}</CardTitle>
          <CardValueContainer>
            <CardAmount>{`${toBRL(properties.order.amount)}`}</CardAmount>
            <CardItemCount>
              {properties.order.quantity == 0
                ? `Em negociação`
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
          <OrderContentComponent order={properties.order} />
        </div>
      )}
    </CardContainer>
  );
}
