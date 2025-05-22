import React from 'react';
import favicon from '../../../../../public/favicon.ico';
import styled from 'styled-components';
import { Order, OrderItem } from '@/types/index';
import Image from 'next/image';
import useIsMobile from '@/hooks/useIsMobile';
import toBRL from '@/utils/toBRL';

export interface Properties {
  order: Order;
}

export default function OrderItems(properties: Readonly<Properties>) {
  const isMobile = useIsMobile();
  return (
    <ItemListContainer>
      <SectionTitle>{`Fornecido por ${properties.order.branchDescription}`}</SectionTitle>
      {properties.order.items.map((item: OrderItem, index: number) => (
        <React.Fragment key={item.id}>
          <ItemContainer>
            <Image
              alt=""
              src={item.imagemUrl || favicon}
              width={isMobile ? 48 : 32}
              height={isMobile ? 48 : 32}
            />
            <ItemInfo>
              <div>
                <p>{item.id}</p>
                <p>{item.description}</p>
              </div>
              <div>
                <p>{`${item.quantity} item${item.quantity > 1 ? 's' : ''}`}</p>
                <p>{`${toBRL(item.price)}`}</p>
                <p>{`${toBRL(item.total)}`}</p>
              </div>
            </ItemInfo>
          </ItemContainer>
          {index < properties.order.items.length - 1 && (
            <StyledDivider style={{ margin: '1rem 0' }} />
          )}
        </React.Fragment>
      ))}
      <StyledDivider />
    </ItemListContainer>
  );
}

const StyledDivider = styled.div`
  margin: ${({ theme }) => theme.spacing.large} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
`;

const SectionTitle = styled.h2`
  font-size: 0.875rem; // 14px
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0 0 ${({ theme }) => theme.spacing.medium};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  padding-bottom: ${({ theme }) => theme.spacing.small};
`;

const ItemListContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.small};
  overflow: auto;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  max-height: 50vh; // Adjust height as needed
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const ItemInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  div:first-child {
    dislpay: flex;
  }
  div:first-child p:first-child {
    // ID
    font-weight: 500;
  }
  div:first-child p:last-child {
    // Descrição
    color: ${({ theme }) => theme.colors.textLight};
  }

  div:last-child {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  div:last-child p:first-child {
    // Quantidade
    font-size: 0.75rem; // 12px
    color: ${({ theme }) => theme.colors.textLight};
  }
  div:last-child p:last-child {
    // Valor
    font-weight: 500;
  }
`;
