import React, { useContext } from 'react';
import { CartContext } from './cartcontext';
import './cart.css';

function Cart() {
  const { cartItems, setCartItems } = useContext(CartContext);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.mealQuantity), 0);

  const updateQuantity = (index, amount) => {
    setCartItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, mealQuantity: item.mealQuantity + amount } : item
      )
    );
  };

  const deleteItem = (index) => {
    setCartItems((prevItems) => prevItems.filter((item, i) => i !== index));
  };

  return (
    <div>
      <div>
        <h2>Cart</h2>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Delivery Dates</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>{item.food}</td>
                <td>{item.price}</td>
                <td>
                  <button onClick={() => updateQuantity(index, -1)} disabled={item.mealQuantity <= 1}>
                    -
                  </button>
                  {item.mealQuantity}
                  <button onClick={() => updateQuantity(index, 1)}>+</button>
                </td>
                <td>{(item.selectedDeliveryDates || []).join(', ')}</td>
                <td>{(item.price * item.mealQuantity).toFixed(2)}</td>
                
                <button onClick={() => deleteItem(index)}>
                    <i className="fas fa-trash-alt"></i>
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="cart-total-container">
        <h2>Cart Total</h2>
        <div className="cart-total">
          <div className="subtotal">
            <span>Subtotal</span>
            <span>Rs {subtotal.toFixed(2)}</span>
          </div>
          <div className="total">
            <span>Total</span>
            <span>Rs {subtotal.toFixed(2)}</span>
          </div>
          <button className="checkout-btn">Check out</button>
          <button className="continue-ordering-btn">CONTINUE ORDERING</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
