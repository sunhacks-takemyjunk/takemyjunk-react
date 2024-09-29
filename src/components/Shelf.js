import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Shelf = () => {
  const [shelfItems, setShelfItems] = useState([]);

  useEffect(() => {
    axios.get('/api/shelf')
      .then(response => {
        setShelfItems(response.data);
      })
      .catch(error => {
        console.error("Error fetching shelf data: ", error);
      });
  }, []);

  const handleRemoveItem = (id) => {
    axios.delete(`/api/shelf/${id}`)
      .then(() => {
        setShelfItems(shelfItems.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error("Error removing item from shelf: ", error);
      });
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    axios.put(`/api/shelf/${id}`, { quantity: newQuantity })
      .then(() => {
        setShelfItems(shelfItems.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        ));
      })
      .catch(error => {
        console.error("Error updating item quantity: ", error);
      });
  };

  return (
    <div>
      <h2>Your Shelf</h2>
      <ul>
        {shelfItems.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleUpdateQuantity(item.id, e.target.value)}
            />
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shelf;