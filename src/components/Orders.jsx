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
          const rows = Object.entries(data).map(([orderId, orderData]) => {
            // Map over the order object and create table rows
            return (
              <tr key={orderId}>
                <td>{orderId}</td>
                <td>{orderData.user_id}</td>
                <td>{orderData.total}</td>
                <td>{orderData.discount}</td>
                <td>{orderData.comment}</td>
                <td>{orderData.payment}</td>
                <td>{orderData.trxid}</td>
                <td>{orderData.status}</td>
                <td>
                  <Link to={`/orders/${orderId}`}>Details</Link>
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
    <div>
      <Helmet>
        <title>Orders</title>
        <meta name="description" content="Orders with helmet" />
      </Helmet>
      <h1>Orders</h1>
      <table className="table table-primary table-striped table-hover">
        <thead>
          <tr>
            <th>Order Id</th>
            <th>User Id</th>
            <th>Grand Total</th>
            <th>Discount</th>
            <th>Comment</th>
            <th>Payment Method</th>
            <th>Trx ID</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};