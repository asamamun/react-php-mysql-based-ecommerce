import React, { useState } from 'react';
import { useCart } from './../CartContext';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export const Cart = () => {
    const { cart, removeFromCart } = useCart();
    const [discount, setDiscount] = useState(0); // State for discount value

    // Calculate the grand total by summing up the item prices in the cart
    const grandTotal = cart.reduce((total, item) => total + (item.quantity * item.price), 0);
    // Apply the discount to the grand total
    const discountedTotal = grandTotal - discount;

    return (
        <div className='container' data-aos="fade-up">
            <Helmet>
                <title>Cart Details</title>
                <meta name="description" content='Cart Details WITH helmet' />
            </Helmet>
            <h1 data-aos="fade-down">Cart details</h1>
            <div className="table-responsive" data-aos="fade-up" data-aos-delay="200">
                <table className="table table-primary table-striped table-hover">
                    <thead>
                        <tr>
                            <th data-aos="fade-right" data-aos-delay="300">Product</th>
                            <th data-aos="fade-right" data-aos-delay="400">Quantity</th>
                            <th data-aos="fade-right" data-aos-delay="500">Price</th>
                            <th data-aos="fade-right" data-aos-delay="600">Item Total</th>
                            <th data-aos="fade-right" data-aos-delay="700">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) => (
                                <tr key={index} data-aos="fade-up" data-aos-delay={index * 100 + 800}>
                                    <td data-aos="fade-right" data-aos-delay={index * 100 + 900}>{item.name}</td>
                                    <td data-aos="fade-up" data-aos-delay={index * 100 + 1000}>{item.quantity}</td>
                                    <td data-aos="fade-up" data-aos-delay={index * 100 + 1100}>{item.price}</td>
                                    <td data-aos="fade-up" data-aos-delay={index * 100 + 1200}>{item.quantity * item.price}</td> {/* Item total price */}
                                    <td data-aos="fade-left" data-aos-delay={index * 100 + 1300}>
                                        <button className="btn btn-danger" onClick={() => removeFromCart(index)}>Remove</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <tr data-aos="fade-up" data-aos-delay="1400">
                            <td colSpan="3">Grand Total:</td>
                            <td>{grandTotal}</td>
                            <td></td>
                        </tr>
                        <tr data-aos="fade-up" data-aos-delay="1500">
                            <td colSpan="3">Discount:</td>
                            <td>
                                <input className='form-control' type="number" value={discount} onChange={(e) => setDiscount(parseInt(e.target.value))} />
                            </td>
                            <td></td>
                        </tr>
                        <tr data-aos="fade-up" data-aos-delay="1600">
                            <td colSpan="3">Discounted Total:</td>
                            <td>{discountedTotal}</td>
                            <td></td>
                        </tr>
                        <tr data-aos="fade-up" data-aos-delay="1700">
                            <td colSpan="5">
                                <Link to="/placeorder" className="btn btn-success me-2">Place Order</Link>
                                <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};
