// Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {Home} from './Home';
import {Registration} from './Registration';
import Login from './Login'; // Import the Login component
import {Products} from './Products';
import {Cart} from './Cart';
import {Orders} from './Orders';
import {OrderDetails} from './OrderDetails';
import {MyOrders} from './MyOrders';
import ProtectedRoute from './ProtectedRoute';
import PlaceOrder from './PlaceOrder';

function MyRoutes() {
  return (
    <Routes>
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} /> {/* Render the Login component at /login */}
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={
        <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      } />
      <Route path="/orders" element={
        <ProtectedRoute requiredRole={2}>
          <Orders />
        </ProtectedRoute>
      } />
      <Route path="/orders/:orderId" element={
        <ProtectedRoute>
          <OrderDetails />
        </ProtectedRoute>
      } />
      <Route path="/my-orders" element={
        <ProtectedRoute>
          <MyOrders />
        </ProtectedRoute>
      } />
      <Route path="/placeorder" element={
        <ProtectedRoute>
          <PlaceOrder />
        </ProtectedRoute>
      } />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default MyRoutes;