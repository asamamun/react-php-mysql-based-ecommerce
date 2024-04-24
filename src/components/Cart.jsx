import React, { useState } from 'react';
import { useCart } from './../CartContext';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export const Cart = () => {
    const { cart, removeFromCart } = useCart();
    const [discount, setDiscount] = useState(0); // State for discount value

    // Calculate the grand total by summing up the item prices in the cart
    const grandTotal = cart.reduce((total, item) => total + (item.quantity * item.price), 0);
    // Apply the discount to the grand total
    const discountedTotal = grandTotal - discount;

    return (
        <div className='container'>
            <Helmet>
                <title>Cart Details</title>
                <meta name="description" content='Cart Details WITH helmet' />
            </Helmet>
            <h1>Cart details</h1>
            <table className="table table-primary table-striped table-hover">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Item Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity * item.price}</td> {/* Item total price */}
                                <td><button className="btn btn-danger" onClick={() => removeFromCart(index)}>Remove</button></td>
                            </tr>
                        ))
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3">Grand Total:</td>
                        <td>{grandTotal}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colSpan="3">Discount:</td>
                        <td>
                            <input className='form-control' type="number" value={discount} onChange={(e) => setDiscount(parseInt(e.target.value))} />
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colSpan="3">Discounted Total:</td>
                        <td>{discountedTotal}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colSpan="5">
                            <Link to="/placeorder" className="btn btn-success">Place Order</Link>
                            <Link to="/products" className="btn btn-primary ms-2">Continue Shopping</Link>


                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};
