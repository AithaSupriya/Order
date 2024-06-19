import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CartProvider } from './component/cartcontext';
import '@fortawesome/fontawesome-free/css/all.min.css';


ReactDOM.render(
  <CartProvider>
    <App />
  </CartProvider>,
  document.getElementById('root')
);
