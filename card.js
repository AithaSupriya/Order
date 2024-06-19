import React, { useState } from 'react';
import Order from './order'; // Assuming Order component is in a file named Order.js

function Card() {
  const initialItems = [
    { id: 1, name: 'Gulab Jamun', price: 20 },
    { id: 2, name: 'Biryani', price: 120 }
  ];

  const [items] = useState(initialItems);
  const [activeOrderId, setActiveOrderId] = useState(null);

  const handleOrderClick = (itemId) => {
    setActiveOrderId(itemId);
  };

  const handleBackToCard = () => {
    setActiveOrderId(null);
  };

  return (
    <div>
      {activeOrderId === null ? (
        items.map(item => (
          <div key={item.id}>
            <h1 id="Food">{item.name}</h1>
            <p id="price">Price: {item.price}</p>
            <button onClick={() => handleOrderClick(item.id)}>Order</button>
          </div>
        ))
      ) : (
        <Order
          food={items.find(item => item.id === activeOrderId).name}
          price={items.find(item => item.id === activeOrderId).price}
          backToCard={handleBackToCard}
        />
      )}
    </div>
  );
}

export default Card;
