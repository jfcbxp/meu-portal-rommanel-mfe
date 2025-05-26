import React from 'react';
import { OrderContent, OrderItemContent } from '@/types/index';
import useIsMobile from '@/hooks/useIsMobile';
import toBRL from '@/utils/toBRL';
import { Image } from 'primereact/image';
import favicon from '../../../../../public/favicon.ico';
import {
  ItemContainer,
  ItemInfo,
  ItemListContainer,
  SectionTitle,
  StyledDivider,
} from './styles';

export interface Properties {
  order: OrderContent;
  items?: OrderContent['items'];
}

export default function OrderItems(properties: Readonly<Properties>) {
  const isMobile = useIsMobile();
  return (
    <ItemListContainer>
      <SectionTitle>{`Fornecido por ${properties.order.branchDescription}`}</SectionTitle>
      {properties.items?.content.length > 0 ? (
        properties.items.content.map(
          (item: OrderItemContent, index: number) => (
            <React.Fragment key={item.id}>
              <ItemContainer>
                {item.image ? (
                  <Image
                    alt=""
                    src={item.image}
                    width={isMobile ? '48' : '32'}
                    height={isMobile ? '48' : '32'}
                  />
                ) : (
                  <Image
                    alt=""
                    src={favicon.src}
                    width={isMobile ? '48' : '32'}
                    height={isMobile ? '48' : '32'}
                  />
                )}

                <ItemInfo>
                  <div>
                    <p>{item.id}</p>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <p>{`${item.quantity} item${
                      item.quantity > 1 ? 's' : ''
                    }`}</p>
                    <p>{`${toBRL(item.price)}`}</p>
                    <p>{`${toBRL(item.total)}`}</p>
                  </div>
                </ItemInfo>
              </ItemContainer>
              {index < (properties.items.content.length ?? 0) - 1 && (
                <StyledDivider style={{ margin: '1rem 0' }} />
              )}
            </React.Fragment>
          ),
        )
      ) : (
        <SectionTitle>O boleto não possui item(s)</SectionTitle>
      )}
      <StyledDivider />
    </ItemListContainer>
  );
}
