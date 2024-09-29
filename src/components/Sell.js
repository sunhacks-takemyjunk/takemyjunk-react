import React, { useState } from 'react';

const Sell = () => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemImage, setItemImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ itemName, itemPrice, itemImage });
  };

  return (
    <div className="container">
      <h2>Sell an Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={itemImage}
          onChange={(e) => setItemImage(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
          required
        />
        <button type="submit" className="sell-button">Sell</button>
      </form>
    </div>
  );
};

export default Sell;
