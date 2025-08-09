import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import API_URL from '../config';

export const MyOrders = () => {
  const { authData } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyOrders = async () => {
      if (!authData?.user?.id) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        // console.log(authData.user.id);
        const response = await fetch(`${API_URL}getmyorders.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: authData.user.id }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        console.log('My Orders API Response:', data);

        if (typeof data === 'object' && data !== null) {
          setOrders(Object.values(data));
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error('Error fetching my orders:', error);
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
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
    <div className="container" data-aos="fade-up">
      <Helmet>
        <title>My Orders</title>
        <meta name="description" content="View your order history" />
      </Helmet>
      
      <h1 data-aos="fade-down">My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="alert alert-info" data-aos="fade-up" data-aos-delay="200">
          You haven't placed any orders yet.
        </div>
      ) : (
        <div className="table-responsive" data-aos="fade-up" data-aos-delay="200">
          <table className="table table-primary table-striped table-hover">
            <thead>
              <tr>
                <th data-aos="fade-right" data-aos-delay="300">Order ID</th>
                <th data-aos="fade-right" data-aos-delay="400">Date</th>
                <th data-aos="fade-right" data-aos-delay="500">Total</th>
                <th data-aos="fade-right" data-aos-delay="600">Discount</th>
                <th data-aos="fade-right" data-aos-delay="700">Payment Method</th>
                <th data-aos="fade-right" data-aos-delay="800">Status</th>
                <th data-aos="fade-right" data-aos-delay="900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id} data-aos="fade-up" data-aos-delay={index * 100}>
                  <td data-aos="fade-right" data-aos-delay={index * 100 + 100}>
                    #{order.id}
                  </td>
                  <td data-aos="fade-up" data-aos-delay={index * 100 + 200}>
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td data-aos="fade-up" data-aos-delay={index * 100 + 300}>
                    ${order.total}
                  </td>
                  <td data-aos="fade-up" data-aos-delay={index * 100 + 400}>
                    ${order.discount || '0.00'}
                  </td>
                  <td data-aos="fade-up" data-aos-delay={index * 100 + 500}>
                    {order.payment}
                  </td>
                  <td data-aos="fade-up" data-aos-delay={index * 100 + 600}>
                    <span className={`badge ${
                      order.status === 'completed' ? 'bg-success' :
                      order.status === 'pending' ? 'bg-warning' :
                      order.status === 'cancelled' ? 'bg-danger' : 'bg-secondary'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td data-aos="fade-left" data-aos-delay={index * 100 + 700}>
                    <Link 
                      to={`/orders/${order.id}`} 
                      className="btn btn-sm btn-primary"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};