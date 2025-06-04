import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DiscountLabel from "../../components/DiscountLabel";
import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import AddToCartButton from "../../components/AddToCartButton";

/**
 * Product component
 *
 * Displays information about a single product.
 * Fetches product data based on the ID from the URL parameters.
 * Shows loading/error states, reviews, discount info, and an "Add to Cart" button.
 *
 * @component
 * @returns {JSX.Element} The rendered product page
 */
const Product = () => {
  /**
   * Product ID from the route parameters
   * @type {string}
   */
  const { id } = useParams();

  /**
   * The product data fetched from the API
   * @type {[Object|null, Function]}
   */
  const [product, setProduct] = useState(null);

  /**
   * Whether the product data is currently loading
   * @type {[boolean, Function]}
   */
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Whether there was an error fetching the product
   * @type {[boolean, Function]}
   */
  const [isError, setIsError] = useState(false);

  // Fetch the product on mount and whenever the ID changes
  useEffect(() => {
    /**
     * Fetches product data from the API
     */
    async function fetchProduct() {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await fetch(
          `https://v2.api.noroff.dev/online-shop/${id}`
        );

        if (!response.ok) throw new Error("Failed to fetch product");

        const json = await response.json();
        setProduct(json.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (isLoading) return <div>Loading product...</div>;
  if (isError) return <div>Error loading product</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <div className={styles.product}>
        <div className={styles.productImage}>
          <img src={product.image.url} alt={product.title} />
        </div>

        <div className={styles.productInfo}>
          <h1>{product.title}</h1>
          <p>{product.description}</p>

          <DiscountLabel
            originalPrice={product.price}
            discountedPrice={product.discountedPrice}
          />

          <p>{product.discountedPrice} kr</p>
          <p className={styles.originalPrice}>
            Original price: {product.price} kr
          </p>

          <AddToCartButton product={product} />
        </div>
      </div>

      <div className={styles.reviewsHeading}>
        <h2>Reviews</h2>
        <p>
          Rating: {product.rating}{" "}
          <FontAwesomeIcon icon={faStar} style={{ color: "#fd805d" }} />
        </p>
      </div>

      {product.reviews && product.reviews.length > 0 ? (
        <div className={styles.reviewsReview}>
          {product.reviews.map((review) => (
            <div key={review.id}>
              <h3>{review.username}</h3>
              <p>
                Rating: {review.rating}{" "}
                <FontAwesomeIcon icon={faStar} style={{ color: "#fd805d" }} />
              </p>
              <p>{review.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noReviews}>
          <p>No reviews yet.</p>
        </div>
      )}
    </div>
  );
};

export default Product;
