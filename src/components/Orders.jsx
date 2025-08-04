import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useCart } from './../CartContext';
import API_URL from './../config';

export const Orders = () => {
  const { cart } = useCart();
  const [discount, setDiscount] = useState(0);
  const [rows, setRows] = useState([]);

  // Calculate the grand total by summing up the item prices in the cart
  const grandTotal = cart.reduce((total, item) => total + (item.quantity * item.price), 0);

  // Apply the discount to the grand total
  const discountedTotal = grandTotal - discount;

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetch(`${API_URL}getorders.php`);
        const data = await response.json();
        console.log('API Response:', data);

        if (typeof data === 'object' && data !== null) {
          const rows = Object.entries(data).map(([orderId, orderData], index) => {
            // Map over the order object and create table rows
            return (
              <tr key={orderId} data-aos="fade-up" data-aos-delay={index * 100}>
                <td data-aos="fade-right" data-aos-delay={index * 100 + 100}>{orderId}</td>
                <td data-aos="fade-up" data-aos-delay={index * 100 + 200}>{orderData.user_id}</td>
                <td data-aos="fade-up" data-aos-delay={index * 100 + 300}>{orderData.total}</td>
                <td data-aos="fade-up" data-aos-delay={index * 100 + 400}>{orderData.discount}</td>
                <td data-aos="fade-up" data-aos-delay={index * 100 + 500}>{orderData.comment}</td>
                <td data-aos="fade-up" data-aos-delay={index * 100 + 600}>{orderData.payment}</td>
                <td data-aos="fade-up" data-aos-delay={index * 100 + 700}>{orderData.trxid}</td>
                <td data-aos="fade-up" data-aos-delay={index * 100 + 800}>{orderData.status}</td>
                <td data-aos="fade-left" data-aos-delay={index * 100 + 900}>
                  <Link to={`/orders/${orderId}`} className="btn btn-sm btn-primary">Details</Link>
                </td>
              </tr>
            );
          });

          setRows(rows);
        } else {
          console.error('API response is not an object:', data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    getOrders();
  }, []);

  return (
    <div className='container' data-aos="fade-up">
      <Helmet>
        <title>Orders</title>
        <meta name="description" content="Orders with helmet" />
      </Helmet>
      <h1 data-aos="fade-down">Orders</h1>
      <div className="table-responsive" data-aos="fade-up" data-aos-delay="200">
        <table className="table table-primary table-striped table-hover">
          <thead>
            <tr>
              <th data-aos="fade-right" data-aos-delay="300">Order Id</th>
              <th data-aos="fade-right" data-aos-delay="400">User Id</th>
              <th data-aos="fade-right" data-aos-delay="500">Grand Total</th>
              <th data-aos="fade-right" data-aos-delay="600">Discount</th>
              <th data-aos="fade-right" data-aos-delay="700">Comment</th>
              <th data-aos="fade-right" data-aos-delay="800">Payment Method</th>
              <th data-aos="fade-right" data-aos-delay="900">Trx ID</th>
              <th data-aos="fade-right" data-aos-delay="1000">Status</th>
              <th data-aos="fade-right" data-aos-delay="1100">Details</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  );
};