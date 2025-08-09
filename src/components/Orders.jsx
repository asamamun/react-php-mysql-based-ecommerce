import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useCart } from './../CartContext';
import { AuthContext } from '../AuthContext';
import API_URL from './../config';

export const Orders = () => {
  const { cart } = useCart();
  const { authData } = useContext(AuthContext);
  const [discount, setDiscount] = useState(0);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Calculate the grand total by summing up the item prices in the cart
  const grandTotal = cart.reduce((total, item) => total + (item.quantity * item.price), 0);

  // Apply the discount to the grand total
  const discountedTotal = grandTotal - discount;

  useEffect(() => {
    const getOrders = async () => {
      // Double-check admin role (this should be caught by ProtectedRoute, but good to be safe)
      if (!authData?.user || authData.user.role !== '2') {
        setError('Admin access required');
        setLoading(false);
        return;
      }

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
                <td data-aos="fade-up" data-aos-delay={index * 100 + 300}>${orderData.total}</td>
                <td data-aos="fade-up" data-aos-delay={index * 100 + 400}>${orderData.discount || '0.00'}</td>
                <td data-aos="fade-up" data-aos-delay={index * 100 + 500}>{orderData.comment || 'N/A'}</td>
                <td data-aos="fade-up" data-aos-delay={index * 100 + 600}>{orderData.payment}</td>
                <td data-aos="fade-up" data-aos-delay={index * 100 + 700}>{orderData.trxid || 'N/A'}</td>
                <td data-aos="fade-up" data-aos-delay={index * 100 + 800}>
                  <span className={`badge ${
                    orderData.status === 'completed' ? 'bg-success' :
                    orderData.status === 'pending' ? 'bg-warning' :
                    orderData.status === 'cancelled' ? 'bg-danger' : 'bg-secondary'
                  }`}>
                    {orderData.status}
                  </span>
                </td>
                <td data-aos="fade-left" data-aos-delay={index * 100 + 900}>
                  <Link to={`/orders/${orderId}`} className="btn btn-sm btn-primary">Details</Link>
                </td>
              </tr>
            );
          });

          setRows(rows);
        } else {
          console.error('API response is not an object:', data);
          setError('Failed to load orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, [authData]);

  if (loading) {
    return (
      <div className="container" data-aos="fade-up">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" data-aos="fade-up">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className='container' data-aos="fade-up">
      <Helmet>
        <title>Admin - All Orders</title>
        <meta name="description" content="Admin view of all orders" />
      </Helmet>
      <h1 data-aos="fade-down">All Orders (Admin View)</h1>
      
      {rows.length === 0 ? (
        <div className="alert alert-info" data-aos="fade-up" data-aos-delay="200">
          No orders found.
        </div>
      ) : (
        <div className="table-responsive" data-aos="fade-up" data-aos-delay="200">
          <table className="table table-primary table-striped table-hover">
            <thead>
              <tr>
                <th data-aos="fade-right" data-aos-delay="300">Order ID</th>
                <th data-aos="fade-right" data-aos-delay="400">User ID</th>
                <th data-aos="fade-right" data-aos-delay="500">Total</th>
                <th data-aos="fade-right" data-aos-delay="600">Discount</th>
                <th data-aos="fade-right" data-aos-delay="700">Comment</th>
                <th data-aos="fade-right" data-aos-delay="800">Payment Method</th>
                <th data-aos="fade-right" data-aos-delay="900">Transaction ID</th>
                <th data-aos="fade-right" data-aos-delay="1000">Status</th>
                <th data-aos="fade-right" data-aos-delay="1100">Actions</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      )}
    </div>
  );
};