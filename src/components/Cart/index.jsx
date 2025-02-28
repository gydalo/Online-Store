import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct } from "../CartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.products);
  const cartTotal = useSelector((state) => state.cart.cartTotal);

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? <p>Your cart is empty.</p> : null}

      {cartItems.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>Quantity: {item.quantity}</p>
          <p>Subtotal: ${(item.quantity * item.discountedPrice).toFixed(2)}</p>
          <button onClick={() => dispatch(removeProduct(item.id))}>
            Remove
          </button>
        </div>
      ))}

      <h2>Cart Total: ${cartTotal.toFixed(2)}</h2>
    </div>
  );
};

export default Cart;
