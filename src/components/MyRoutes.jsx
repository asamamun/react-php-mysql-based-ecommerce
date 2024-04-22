// Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {Home} from './Home';
import {Registration} from './Registration';
import Login from './Login'; // Import the Login component
import {Products} from './Products';
import {Cart} from './Cart';

function MyRoutes() {
  return (
    <Routes>
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} /> {/* Render the Login component at /login */}
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default MyRoutes;