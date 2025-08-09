import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from './CartContext';
import { AuthWrapper } from './useAuth.jsx';
import { HelmetProvider } from 'react-helmet-async';
import AOS from 'aos';
import 'aos/dist/aos.css';
// import './index.css'

// Initialize AOS
AOS.init({
  duration: 50,
  easing: 'ease-in-out',
  once: true,
  mirror: false
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthWrapper>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthWrapper>
    </HelmetProvider>
  </React.StrictMode>,
)
