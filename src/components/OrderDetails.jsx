import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import API_URL from './../config';

export const OrderDetails = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`${API_URL}getorderdetails.php?orderId=${orderId}`);
        const data = await response.json();
        setOrderDetails(data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (!orderDetails) {
    return <div className="container text-center mt-5" data-aos="fade-up">Loading order details...</div>;
  }

  return (
    <div className="container mt-4" data-aos="fade-up">
        <div className="mb-4" data-aos="fade-down" data-aos-delay="200">
          <Link to="/orders" className="btn btn-outline-info me-2">
            <i className="fa fa-arrow-left me-2"></i> Back
          </Link>
          <button className="btn btn-primary" onClick={() => window.print()}>
            <i className="bi bi-printer me-2"></i>Print
          </button>
        </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card shadow-lg" data-aos="zoom-in" data-aos-delay="300">
            <div className="card-header bg-primary text-white" data-aos="fade-down" data-aos-delay="400">
              <h3 className="card-title mb-0">Order Invoice</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6" data-aos="fade-right" data-aos-delay="500">
                  <h4 className="mb-3" data-aos="fade-up" data-aos-delay="600">Order Information</h4>
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                      <tbody>
                        <tr data-aos="fade-up" data-aos-delay="700">
                          <th>Order ID:</th>
                          <td>{orderDetails.id}</td>
                        </tr>
                        <tr data-aos="fade-up" data-aos-delay="800">
                          <th>User Name:</th>
                          <td>{orderDetails.user_name}, ID: {orderDetails.user_id}</td>
                        </tr>
                        <tr data-aos="fade-up" data-aos-delay="900">
                          <th>Total:</th>
                          <td>{orderDetails.total}</td>
                        </tr>
                        <tr data-aos="fade-up" data-aos-delay="1000">
                          <th>Discount:</th>
                          <td>{orderDetails.discount}</td>
                        </tr>
                        <tr data-aos="fade-up" data-aos-delay="1100">
                          <th>Comment:</th>
                          <td>{orderDetails.comment}</td>
                        </tr>
                        <tr data-aos="fade-up" data-aos-delay="1200">
                          <th>Payment:</th>
                          <td>{orderDetails.payment}</td>
                        </tr>
                        <tr data-aos="fade-up" data-aos-delay="1300">
                          <th>Transaction ID:</th>
                          <td>{orderDetails.trxid}</td>
                        </tr>
                        <tr data-aos="fade-up" data-aos-delay="1400">
                          <th>Status:</th>
                          <td>{orderDetails.status}</td>
                        </tr>
                        <tr data-aos="fade-up" data-aos-delay="1500">
                          <th>Created At:</th>
                          <td>{orderDetails.created_at}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-md-6" data-aos="fade-left" data-aos-delay="600">
                  <h4 className="mb-3" data-aos="fade-up" data-aos-delay="700">Ordered Products</h4>
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                      <thead>
                        <tr>
                          <th data-aos="fade-right" data-aos-delay="800">Product</th>
                          <th data-aos="fade-up" data-aos-delay="900">Price</th>
                          <th data-aos="fade-up" data-aos-delay="1000">Quantity</th>
                          <th data-aos="fade-up" data-aos-delay="1100">Order Description</th>
                          <th data-aos="fade-left" data-aos-delay="1200">Created At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderDetails.products.map((product, index) => (
                          <tr key={product.id} data-aos="fade-up" data-aos-delay={index * 100 + 1300}>
                            <td data-aos="fade-right" data-aos-delay={index * 100 + 1400}>{product.product_name} , ID: {product.product_id}</td>                          
                            <td data-aos="fade-up" data-aos-delay={index * 100 + 1500}>{product.price}</td>
                            <td data-aos="fade-up" data-aos-delay={index * 100 + 1600}>{product.quantity}</td>
                            <td data-aos="fade-up" data-aos-delay={index * 100 + 1700}>{product.op}</td>
                            <td data-aos="fade-left" data-aos-delay={index * 100 + 1800}>{product.created_at}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;