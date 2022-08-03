import React, { useState } from 'react';
import type { AppProps } from 'next/app';

import { BasketProduct, Product } from './types';
import { Basket } from '../components/Basket';

import '../styles/globals.css';

interface IBasketState {
  basket: Array<BasketProduct>;
  addToCart: (p: Product) => () => void;
  removeFromBasket: (id: number) => void;
  toggleBasketModal: () => void;
}

export const BasketContext = React.createContext<IBasketState>({
    basket: [],
    addToCart: (p: Product) => () => {},
    removeFromBasket: (id: number) => () => {},
    toggleBasketModal: () => {},
});

function MyApp({ Component, pageProps }: AppProps) {
  const [basket, setBasket] = useState<Array<BasketProduct>>([]);
  const [basketVisible, setBasketVisible] = useState<boolean>(false);

  const addToCart =
    ({ id, name, price }: Product) =>
    () => {
      const currentQuantity = basket.find(({productId}) => productId === id)?.quantity || 0;
      const product = {productId: id, name, price, quantity: currentQuantity + 1};

      if (currentQuantity > 0) {
          setBasket([...basket.filter(({productId}) => productId !== id), product]);
      } else {
        setBasket([...basket, product]);
      }
    };

  const removeFromBasket = (id: number) => {
      setBasket([...basket.filter(({productId}) => productId !== id)]);
  }

  const toggleBasketModal = () => setBasketVisible(!basketVisible);

  return (
    <BasketContext.Provider value={{ basket, addToCart, removeFromBasket, toggleBasketModal }}>
      <Component {...pageProps} />
      {basketVisible && <Basket />}
    </BasketContext.Provider>
  );
}

export default MyApp;
