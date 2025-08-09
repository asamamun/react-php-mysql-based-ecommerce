import React, { useState, useEffect, useContext } from 'react';
import { useCart } from './../CartContext';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import axios from 'axios';
import API_URL from './../config';
import { AuthContext } from './../AuthContext';
    


const PlaceOrder = () => {
    const { authData } = useContext(AuthContext);
    const { cart, emptyCart } = useCart();
    const [formData, setFormData] = useState({
        user_id: authData.user?.id,
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
        city: '',
        state: '',
        country: '',
        shippingAddress: '',
        billingAddress: '',
        paymentMethod: '',
        trxid: ''
    });

    // Calculate the grand total by summing up the item prices in the cart
    const grandTotal = cart.reduce((total, item) => total + (item.quantity * item.price), 0);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Send the order data to your server endpoint
        try {
            console.log(formData);
            const response = await axios.post(`${API_URL}orders.php`, {
                cart: cart,
                formData: formData,
                grandTotal: grandTotal
            });
console.log(response.data);
if(response.data.status === 'success'){ 
    emptyCart();
// Display a success message to the user
Swal.fire({
    icon: 'success',
    title: 'Order Placed Successfully!',
    text: 'Your order has been placed successfully. Thank you for shopping with us!',
});

// Reset the form after successful submission
setFormData({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    country: '',
    shippingAddress: '',
    billingAddress: '',
    paymentMethod: '',
    trxid: ''
});

}
            
        } catch (error) {
            // Handle any errors that occur during the order placement process
            console.error('Error placing order:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong while placing your order. Please try again later.',
            });
        }
    };

    // Function to handle form field changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Helmet>
                <title>Place Order</title>
                <meta name="description" content='Place Order Page' />
            </Helmet>
            <div className='container mt-4' data-aos="fade-up">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card shadow-lg" data-aos="fade-right" data-aos-delay="200">
                            <div className="card-header bg-primary text-white" data-aos="fade-down" data-aos-delay="300">
                                <h1 className="mb-0">Place Order</h1>
                            </div>
                            <div className="card-body p-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3" data-aos="fade-up" data-aos-delay="400">
                                        <label htmlFor="fullName" className="form-label">Full Name</label>
                                        <input type="text" className="form-control" id="fullName" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3" data-aos="fade-up" data-aos-delay="500">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3" data-aos="fade-up" data-aos-delay="600">
                                        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                        <input type="text" className="form-control" id="phoneNumber" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3" data-aos="fade-up" data-aos-delay="700">
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <textarea className="form-control" id="address" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required rows="2"></textarea>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="mb-3" data-aos="fade-up" data-aos-delay="800">
                                                <label htmlFor="city" className="form-label">City</label>
                                                <input type="text" className="form-control" id="city" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3" data-aos="fade-up" data-aos-delay="900">
                                                <label htmlFor="state" className="form-label">State</label>
                                                <input type="text" className="form-control" id="state" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3" data-aos="fade-up" data-aos-delay="1000">
                                                <label htmlFor="country" className="form-label">Country</label>
                                                <input type="text" className="form-control" id="country" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3" data-aos="fade-up" data-aos-delay="1100">
                                        <label htmlFor="shippingAddress" className="form-label">Shipping Address</label>
                                        <textarea className="form-control" id="shippingAddress" name="shippingAddress" placeholder="Shipping Address" value={formData.shippingAddress} onChange={handleChange} required rows="2"></textarea>
                                    </div>
                                    <div className="mb-3" data-aos="fade-up" data-aos-delay="1200">
                                        <label htmlFor="billingAddress" className="form-label">Billing Address</label>
                                        <textarea className="form-control" id="billingAddress" name="billingAddress" placeholder="Billing Address" value={formData.billingAddress} onChange={handleChange} required rows="2"></textarea>
                                    </div>
                                    <div className="mb-3" data-aos="fade-up" data-aos-delay="1300">
                                        <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
                                        <select className="form-select" id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
                                            <option value="">Select Payment Method</option>
                                            <option value="credit_card">Credit Card</option>
                                            <option value="debit_card">Debit Card</option>
                                            <option value="paypal">PayPal</option>
                                        </select>
                                    </div>
                                    <div className="mb-3" data-aos="fade-up" data-aos-delay="1400">
                                        <label htmlFor="trxid" className="form-label">Transaction ID</label>
                                        <input type="text" className="form-control" id="trxid" name="trxid" placeholder="Transaction ID (Trxid)" value={formData.trxid} onChange={handleChange} required />
                                    </div>
                                    <div className="text-center" data-aos="fade-up" data-aos-delay="1500">
                                        <button type="submit" className="btn btn-primary btn-lg">Place Order</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card shadow-lg" data-aos="fade-left" data-aos-delay="300">
                            <div className="card-header bg-success text-white" data-aos="fade-down" data-aos-delay="400">
                                <h2 className="mb-0">Cart Products</h2>
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item bg-light" data-aos="fade-up" data-aos-delay="500">
                                        <div className="row">
                                            <div className="col-6"><strong>Name</strong></div>
                                            <div className="col-3"><strong>Quantity</strong></div>
                                            <div className="col-3"><strong>Price</strong></div>
                                        </div>
                                    </li>
                                    {cart.map((item, index) => (
                                        <li key={index} className="list-group-item" data-aos="fade-up" data-aos-delay={index * 100 + 600}>
                                            <div className="row">
                                                <div className="col-6">{item.name}</div>
                                                <div className="col-3">Quantity: <span className="badge bg-primary rounded-pill">{item.quantity}</span></div>
                                                <div className="col-3">Price: ${item.price}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-3 text-center" data-aos="fade-up" data-aos-delay="1000">
                                    <h4 className="text-primary">Total: ${grandTotal}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlaceOrder;
