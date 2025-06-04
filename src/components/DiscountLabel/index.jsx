import PropTypes from "prop-types";

/**
 * DiscountLabel component
 *
 * Displays a percentage discount label if the discounted price is lower than the original price.
 *
 * @component
 * @param {Object} props
 * @param {number} props.originalPrice - The original price of the product
 * @param {number} props.discountedPrice - The discounted price of the product
 * @returns {JSX.Element|null} The discount label or null if no discount
 */
const DiscountLabel = ({ originalPrice, discountedPrice }) => {
  if (!originalPrice || !discountedPrice || originalPrice <= discountedPrice) {
    return null;
  }

  const discountPercentage =
    ((originalPrice - discountedPrice) / originalPrice) * 100;

  return <p>{discountPercentage.toFixed(0)}% OFF</p>;
};

export default DiscountLabel;

DiscountLabel.propTypes = {
  originalPrice: PropTypes.number.isRequired,
  discountedPrice: PropTypes.number.isRequired,
};
