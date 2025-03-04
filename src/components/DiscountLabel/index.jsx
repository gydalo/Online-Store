const DiscountLabel = ({ originalPrice, discountedPrice }) => {
    if (!originalPrice || !discountedPrice || originalPrice <= discountedPrice) {
      return null;
    }
  
    const discountPercentage = ((originalPrice - discountedPrice) / originalPrice) * 100;
  
    return <p>{discountPercentage.toFixed(0)}% OFF</p>;
  };
  
  export default DiscountLabel;