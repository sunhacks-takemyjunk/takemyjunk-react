import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    axios.get('/api/cart')
      .then(response => {
        setCartItems(response.data);
      })
      .catch(error => {
        console.error("Error fetching cart data: ", error);
      });
  }, []);

  const handleRemoveItem = (id) => {
    axios.delete(`/api/cart/${id}`)
      .then(() => {
        setCartItems(cartItems.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error("Error removing item: ", error);
      });
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    axios.put(`/api/cart/${id}`, { quantity: newQuantity })
      .then(() => {
        setCartItems(cartItems.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        ));
      })
      .catch(error => {
        console.error("Error updating quantity: ", error);
      });
  };

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handlePartialCheckout = () => {
    const itemsToCheckout = cartItems.filter(item => selectedItems.includes(item.id));

    axios.post('/api/checkout', { items: itemsToCheckout })
      .then(() => {
        setCartItems(cartItems.filter(item => !selectedItems.includes(item.id)));
        setSelectedItems([]);
      })
      .catch(error => {
        console.error("Error during partial checkout: ", error);
      });
  };

  const handleCheckoutAll = () => {
    axios.post('/api/checkout', { items: cartItems })
      .then(() => {
        setCartItems([]);
      })
      .catch(error => {
        console.error("Error during checkout: ", error);
      });
  };

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            <input 
              type="checkbox" 
              checked={selectedItems.includes(item.id)} 
              onChange={() => handleSelectItem(item.id)} 
            />
            {item.name} - ${item.price} x {item.quantity}
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleUpdateQuantity(item.id, e.target.value)}
            />
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={handlePartialCheckout}>Partial Checkout</button>
      <button onClick={handleCheckoutAll}>Checkout All</button>
    </div>
  );
};

export default Cart;
