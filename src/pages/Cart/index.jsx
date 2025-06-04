import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../../components/CartSlice";
import { Link } from "react-router-dom";
import { resetCart } from "../../components/CartSlice";
import DiscountLabel from "../../components/DiscountLabel";
import styles from "./index.module.css";

/**
 * Cart component
 *
 * Displays the products currently in the shopping cart.
 * Allows users to increase/decrease product quantity, view totals, and proceed to checkout.
 *
 * - Syncs cart with localStorage on change
 * - Uses Redux to manage cart state
 * - Applies discounts using the DiscountLabel component
 *
 * @component
 * @returns {JSX.Element} The rendered cart page
 */
const Cart = () => {
  const dispatch = useDispatch();

  /**
   * All products currently in the cart
   * @type {Array<Object>}
   */
  const cartItems = useSelector((state) => state.cart.products);

  /**
   * Total price of all products in the cart
   * @type {number}
   */
  const cartTotal = useSelector((state) => state.cart.cartTotal);

  // Cart is sent to localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div>
      <h1 className={styles.cartTitle}>Cart</h1>

      {cartItems.map((product) => (
        <div key={product.id}>
          <div className={styles.cartContainer}>
            <div className={styles.cartImage}>
              <img src={product.image.url} alt={product.title} />
            </div>
            <div className={styles.cartInfo}>
              <h3>{product.title}</h3>
              <p>Quantity: {product.quantity}</p>
              <DiscountLabel
                originalPrice={product.price}
                discountedPrice={product.discountedPrice}
              />
              <p>Price for one: {product.discountedPrice.toFixed(2)} kr</p>
              <p>
                Subtotal:{" "}
                {(product.quantity * product.discountedPrice).toFixed(2)} kr
              </p>

              <div className={styles.buttonsCartContainer}>
                <div className={styles.buttonCartAdd}>
                  <button onClick={() => dispatch(addProduct(product))}>
                    Add
                  </button>
                </div>
                <div className={styles.buttonCartRemove}>
                  <button onClick={() => dispatch(removeProduct(product.id))}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className={styles.cartCheckout}>
        <h2>Cart Total: {cartTotal.toFixed(2)} kr</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <Link to="/checkout">
            <button
              className={styles.checkoutButton}
              onClick={() => dispatch(resetCart())}
            >
              Checkout
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Cart;
