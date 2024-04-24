import React, { useState } from 'react';
import { useCart } from './../CartContext';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';
import axios from 'axios';
import API_URL from './../config';

const PlaceOrder = () => {
    const { cart, emptyCart } = useCart();
    const [formData, setFormData] = useState({
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
            <div className='container'>
                <div className="row">
                    <div className="col-6">
                    <h1>Place Order</h1>
                <form onSubmit={handleSubmit}>
    <div className="mb-3">
        <input type="text" className="form-control" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
    </div>
    <div className="mb-3">
        <input type="email" className="form-control" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
    </div>
    <div className="mb-3">
        <input type="text" className="form-control" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
    </div>
    <div className="mb-3">
        <textarea className="form-control" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required></textarea>
    </div>
    <div className="mb-3">
        <input type="text" className="form-control" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
    </div>
    <div className="mb-3">
        <input type="text" className="form-control" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
    </div>
    <div className="mb-3">
        <input type="text" className="form-control" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
    </div>
    <div className="mb-3">
        <textarea className="form-control" name="shippingAddress" placeholder="Shipping Address" value={formData.shippingAddress} onChange={handleChange} required></textarea>
    </div>
    <div className="mb-3">
        <textarea className="form-control" name="billingAddress" placeholder="Billing Address" value={formData.billingAddress} onChange={handleChange} required></textarea>
    </div>
    <div className="mb-3">
        <select className="form-select" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
            <option value="">Select Payment Method</option>
            <option value="credit_card">Credit Card</option>
            <option value="debit_card">Debit Card</option>
            <option value="paypal">PayPal</option>
        </select>
    </div>
    <div className="mb-3">
        <input type="text" className="form-control" name="trxid" placeholder="Transaction ID (Trxid)" value={formData.trxid} onChange={handleChange} required />
    </div>
    <button type="submit" className="btn btn-primary">Place Order</button>
</form>
                    </div>
                    <div className="col-6">                        
                        <h2>Cart Products</h2>
                        <ul className="list-group">
                            <li className="list-group-item">
                        <div className="row">
                <div className="col-6"><strong>Name</strong></div>
                <div className="col-3"><strong>Quantity</strong></div>
                <div className="col-3"><strong>Price</strong></div>
            </div>
            </li>
    {cart.map((item, index) => (
        <li key={index} className="list-group-item">
            <div className="row">
                <div className="col-6">{item.name}</div>
                <div className="col-3">Quantity: <span className="badge bg-primary rounded-pill">{item.quantity}</span></div>
                <div className="col-3">Price: ${item.price}</div>
            </div>
        </li>
    ))}
</ul>
                    </div>
                </div>


                <p>Your order total: ${grandTotal}</p>
                {/* You can add additional UI elements here */}
            </div>
        </>
    );
};

export default PlaceOrder;
