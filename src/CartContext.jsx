import React, { createContext, useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2'
// Creating a new context for the cart data
const CartContext = createContext();

// Custom hook to access the cart context
export const useCart = () => useContext(CartContext);

// Cart provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

    // Update local storage whenever cart changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
      }, [cart]);

  const addToCart = (item) => {
    const itemSummary = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.images,
      quantity: 1
    };

    const existingItem = cart.find(itemInCart => itemInCart.id == item.id);
    console.log("EI:" , existingItem);
    if (existingItem) {
      const newCart = cart.map(itemInCart => {
        if (itemInCart.id == item.id) {
          return {
            ...itemInCart,
            quantity: itemInCart.quantity + 1
          };
        }
        return itemInCart;
      });
      console.log(newCart);
      setCart(newCart);
    }
    else{
      setCart([...cart, itemSummary]);
    }
    Swal.fire({
      title: "Success!",
      timer: 2000,
      text: "Item added to cart",
      icon: "success"
    });
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };


  const emptyCart = () => {
    setCart([]);
  };


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, emptyCart }}>
      {children}
    </CartContext.Provider>
  );
};
