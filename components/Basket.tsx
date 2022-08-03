import React, { useContext } from 'react';
import styled from 'styled-components';
import { BasketContext } from '../pages/_app';

const Background = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 50%);
`;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  padding: 1rem;
  background-color: white;
  border-radius: 10px;
`;

const BasketTitle = styled.h3`
  margin: 0.5em 0;
`;

const BasketItem = styled.div`
  width: 100%;
  border-top: 1px solid grey;
  line-height: 2em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3em;

  &:last-child {
    border-bottom: 1px solid grey;
  }
`;

const BasketItemDetails = styled.div`
`;

const BasketItemDelete = styled.button`
  margin-left: auto;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid grey;
  padding: 4px 8px;

  &:hover {
    background-color: white;
  }
`;

const BasketItemPrice = styled.div`
  flex-basis: 4em;
  text-align: right;
`;

export const Basket = () => {
  const { basket, removeFromBasket, toggleBasketModal } = useContext(BasketContext);

  return (
    <Background onClick={toggleBasketModal}>
      <Container onClick={(e) => e.stopPropagation()}>
        <BasketTitle>Basket</BasketTitle>
        {basket.length ? basket.map(({ name, price, quantity, productId }, key) => (
          <BasketItem key={key}>
            <BasketItemDetails>
              {quantity} x {name}
            </BasketItemDetails>
              <BasketItemDelete onClick={() => removeFromBasket(productId)}>Delete</BasketItemDelete>
            <BasketItemPrice>&pound;{(price * quantity / 100).toFixed(2)}</BasketItemPrice>
          </BasketItem>
        )) : 'Your basket is empty'}
      </Container>
    </Background>
  );
};
