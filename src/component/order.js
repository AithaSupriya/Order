import React, { useState, useContext } from 'react';
import DateComponent from './datecomponent';
import dayjs from 'dayjs';
import { CartContext } from './cartcontext';

function Order({ food, price, backToCard }) {
  const [mealType, setMealType] = useState('');
  const [mealPlan, setMealPlan] = useState('');
  const [mealQuantity, setMealQuantity] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDeliveryDates, setSelectedDeliveryDates] = useState([]);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    if (!mealType || !mealPlan || mealQuantity < 1 || selectedDeliveryDates.length === 0) {
      alert('Please fill in all fields and select a delivery date.');
      return;
    }

    const cartItem = {
      food,
      price,
      mealType,
      mealPlan,
      mealQuantity,
      selectedDeliveryDates: selectedDeliveryDates.map((date) => dayjs(date).format('YYYY-MM-DD')),
    };
    console.log("Adding to cart:", cartItem);
    addToCart(cartItem);
  };

  const handleCalendarClick = () => {
    setShowDatePicker(true);
  };

  const handleDateSelection = (dates) => {
    setSelectedDeliveryDates(dates);
    setShowDatePicker(false);
  };

  const handleDateRemove = (dateToRemove) => {
    setSelectedDeliveryDates(selectedDeliveryDates.filter(date => date !== dateToRemove));
  };

  return (
    <div>
      <div>
        <h2>Order Form</h2>
        <h3>Food: {food}</h3>
        <p>Price: {price}</p>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="mealType">Meal Type:</label>
            <select id="mealType" value={mealType} onChange={(e) => setMealType(e.target.value)}>
              <option value="">Select Meal Type</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
          </div>
          <div>
            <label htmlFor="mealPlan">Meal Plan:</label>
            <select id="mealPlan" value={mealPlan} onChange={(e) => setMealPlan(e.target.value)}>
              <option value="">Select Meal Plan</option>
              <option value="single day">Single day</option>
            </select>
          </div>
          <div style={{ position: 'relative' }}>
            <label htmlFor="delivery">Delivery Date:</label>
            <input
              type="text"
              id="delivery"
              readOnly
              value={selectedDeliveryDates.map((date) => dayjs(date).format('YYYY-MM-DD')).join(', ')}
            />
            <span
              style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
              onClick={handleCalendarClick}
            >
              📅
            </span>
            {showDatePicker && <DateComponent onSelect={handleDateSelection} />}
          </div>
          <div>
            {/* {selectedDeliveryDates.map((date, index) => (
              <div key={index}>
                <span>{dayjs(date).format('YYYY-MM-DD')}</span>
                <button type="button" onClick={() => handleDateRemove(date)}>Remove</button>
              </div>
            ))} */}
          </div>
          <div>
            <label htmlFor="mealQuantity">Quantity:</label>
            <input
              type="number"
              id="mealQuantity"
              min="1"
              value={mealQuantity}
              onChange={(e) => setMealQuantity(parseInt(e.target.value) || 1)}
            />
          </div>
          <button type="submit" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button type="button" onClick={backToCard}>
            Back to Menu
          </button>
        </form>
      </div>
    </div>
  );
}

export default Order;
