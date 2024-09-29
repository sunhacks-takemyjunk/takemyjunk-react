import React from 'react';

const Buy = () => {
  const items = [
    { id: 1, name: 'Book', image: 'book.jpg', price: 10 },
    { id: 2, name: 'Laptop', image: 'laptop.jpg', price: 500 },
    // Add more items as needed
  ];

  return (
    <div className="container">
      <h2>Items for Sale</h2>
      <div className="item-list">
        {items.map((item) => (
          <div key={item.id} className="item-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>${item.price}</p>
            <button>Buy</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buy;
