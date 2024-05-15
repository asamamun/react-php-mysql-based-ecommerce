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
    return <div>Loading order details...</div>;
  }

  return (
    <div className="container">
        <div className="mb-4">
          <Link to="/orders" className="btn btn-outline-info ml-2">
            <i className="fa fa-arrow-left"></i> Back
          </Link>
          <button className="btn btn-primary ml-2" onClick={() => window.print()}>
            <i className="bi bi-printer ml-2"></i>
        </button>
        
        </div>
      <div className="row">
        <div className="col-md-12">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Order Invoice</h3>
            </div>
            <div className="panel-body">
              <div className="row">
                <div className="col-md-6">
                  <h4>Order Information</h4>
                  <table className="table table-striped table-bordered">
                    <tbody>
                      <tr>
                        <th>Order ID:</th>
                        <td>{orderDetails.id}</td>
                      </tr>
                      <tr>
                        <th>User Name:</th>
                        <td>{orderDetails.user_name}, ID: {orderDetails.user_id}</td>
                      </tr>
                      <tr>
                        <th>Total:</th>
                        <td>{orderDetails.total}</td>
                      </tr>
                      <tr>
                        <th>Discount:</th>
                        <td>{orderDetails.discount}</td>
                      </tr>
                      <tr>
                        <th>Comment:</th>
                        <td>{orderDetails.comment}</td>
                      </tr>
                      <tr>
                        <th>Payment:</th>
                        <td>{orderDetails.payment}</td>
                      </tr>
                      <tr>
                        <th>Transaction ID:</th>
                        <td>{orderDetails.trxid}</td>
                      </tr>
                      <tr>
                        <th>Status:</th>
                        <td>{orderDetails.status}</td>
                      </tr>
                      <tr>
                        <th>Created At:</th>
                        <td>{orderDetails.created_at}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-md-6">
                  <h4>Ordered Products</h4>
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Order Description</th>
                        <th>Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails.products.map((product) => (
                        <tr key={product.id}>
                          <td>{product.product_name} , ID: {product.product_id}</td>                          
                          <td>{product.price}</td>
                          <td>{product.quantity}</td>
                          <td>{product.op}</td>
                          <td>{product.created_at}</td>
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
  );
};

export default OrderDetails;