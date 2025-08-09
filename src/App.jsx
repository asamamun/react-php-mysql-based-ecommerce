// App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import {Home} from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login'; // Import the Login component
import {Products} from './components/Products';
import {Orders} from './components/Orders';
import {OrderDetails} from './components/OrderDetails';
import ProductDetails from './components/ProductDetails';
import {Cart} from './components/Cart';
import ProductAdd from './components/ProductAdd';
import PlaceOrder from './components/PlaceOrder';
import { MyOrders } from './components/MyOrders';



function App() {
  return (
    <>
        <Navbar></Navbar>
        {/* <MyRoutes /> */}
        <Routes>
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} /> {/* Render the Login component at /login */}
      <Route path="/products" element={<Products />} />
      <Route path="/add" element={<ProductAdd />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/:orderId" element={<OrderDetails />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/placeorder" element={<PlaceOrder />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/" element={<Home />} />
    </Routes>    
    </>
  );
}

export default App;