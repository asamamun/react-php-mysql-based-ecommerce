import React from 'react';
import { useCart } from './../CartContext';
export const Cart = () => {
    const { cart, removeFromCart } = useCart();
    return (
        <div>
            <h1>Cart details</h1>
            <table className="table table-primary table-striped table-hover">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                    cart.map((item,index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td><button className="btn btn-danger" onClick={() => removeFromCart(index)}>Remove</button></td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}