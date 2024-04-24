// App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthWrapper } from './useAuth';
import Navbar from './components/Navbar';
import {Home} from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login'; // Import the Login component
import {Products} from './components/Products';
import ProductDetails from './components/ProductDetails';
import {Cart} from './components/Cart';
import ProductAdd from './components/ProductAdd';
import PlaceOrder from './components/PlaceOrder';


function App() {
  return (
    <AuthWrapper>
        <Navbar></Navbar>
        {/* <MyRoutes /> */}
        <Routes>
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} /> {/* Render the Login component at /login */}
      <Route path="/products" element={<Products />} />
      <Route path="/add" element={<ProductAdd />} />
      <Route path="/placeorder" element={<PlaceOrder />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/" element={<Home />} />
    </Routes>
    </AuthWrapper>
  );
}

export default App;