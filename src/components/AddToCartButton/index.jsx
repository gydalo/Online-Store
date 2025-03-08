import { useState } from "react";
import { addProduct } from "../CartSlice";
import { useDispatch } from "react-redux";
import styles from "../Layout/index.module.css";

const AddToCartButton = ({ product }) => {
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);

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
