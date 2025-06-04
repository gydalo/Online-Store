import { useState } from "react";
import { addProduct } from "../CartSlice";
import { useDispatch } from "react-redux";
import styles from "../Layout/index.module.css";
import PropTypes from "prop-types";

/**
 * AddToCartButton component
 *
 * Renders a button that allows the user to add a product to the shopping cart.
 * On click, it dispatches the product to the Redux store and temporarily shows a confirmation.
 *
 * @component
 * @param {Object} props - The component props
 * @param {Object} props.product - The product object to add to the cart
 * @returns {JSX.Element} The rendered button component
 */
const AddToCartButton = ({ product }) => {
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);

  /**
   * Handles the click event on the button.
   * Sends the product to the Redux store and shows a temporary "Added" message.
   */
  const handleClick = () => {
    dispatch(addProduct(product));
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 1000);
  };

  return (
    <button onClick={handleClick} className={isAdded ? styles.added : ""}>
      {isAdded ? "Added" : "Add to cart"}
    </button>
  );
};

export default AddToCartButton;

AddToCartButton.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};
