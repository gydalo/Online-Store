import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../../components/CartSlice";
import { Link } from "react-router-dom";
import { resetCart } from "../../components/CartSlice";
import DiscountLabel from "../../components/DiscountLabel";
import styles from "./index.module.css";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.products);
  const cartTotal = useSelector((state) => state.cart.cartTotal);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <button onClick={() => dispatch(resetCart())}>
          <Link to="/checkout">Checkout</Link>
        </button>
      )}

      {cartItems.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>Quantity: {item.quantity}</p>
          <DiscountLabel
            originalPrice={item.price}
            discountedPrice={item.discountedPrice}
          />
          <p>Price for one: {item.discountedPrice.toFixed(2)} kr</p>
          <p>
            Subtotal: {(item.quantity * item.discountedPrice).toFixed(2)} kr
          </p>
          <button onClick={() => dispatch(addProduct(item))}>Add</button>
          <button onClick={() => dispatch(removeProduct(item.id))}>
            Remove
          </button>
        </div>
      ))}

      <h2>Cart Total: {cartTotal.toFixed(2)} kr</h2>
    </div>
  );
};

export default Cart;
