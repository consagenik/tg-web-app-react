import {useCallback, useEffect, useState} from "react";

import './ProductList.css';

import useTelegram from "../../hooks/useTelegram";

import {ProductItem} from "../productItem";
import {products} from "./dataAndMethods";

function getTotalPrice(products) {
  return products.reduce((acc, product) => {
    return acc + product.price;
  }, 0);
}

export default function ProductList() {
  const {tg, queryId} = useTelegram();

  const [selectedProducts, setSelectedProducts] = useState([]);

  const onAddToCart = (product) => {
    const alreadySelected = selectedProducts.find((item) => item.id === product.id);
    const newSelectedProducts = [...selectedProducts];

    if (alreadySelected) {
      newSelectedProducts.splice(newSelectedProducts.indexOf(alreadySelected), 1);
    } else {
      newSelectedProducts.push(product);
    }

    setSelectedProducts(newSelectedProducts);

    if (newSelectedProducts.length === 0) {
      tg.MainButton.hide();
    } else {
      console.log({newSelectedProducts});
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Buy (${getTotalPrice(newSelectedProducts)})`
      });
    }
  }

  const onSendData = useCallback(() => {
    const data = {
      products: selectedProducts,
      totalPrice: getTotalPrice(selectedProducts),
      queryId
    }

    fetch('https://tg-web-app-bot-w9dy.onrender.com/web-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }, [queryId, selectedProducts])

  useEffect(() => {
    tg.MainButton.setParams({text: 'Send'});
    tg.MainButton.show();

    tg.onEvent('mainButtonClicked', onSendData);

    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    }
  }, [onSendData, tg]);

  return (
    <div className="productList">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          title={product.title}
          description={product.description}
          price={product.price}
          onAddToCart={() => onAddToCart(product)}
        />
      ))}

      <div className="totalPrice">
        Total price: {getTotalPrice(selectedProducts)}
      </div>
    </div>
  );
}
