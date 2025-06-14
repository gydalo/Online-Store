import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DiscountLabel from "../../components/DiscountLabel";
import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import AddToCartButton from "../../components/AddToCartButton";

const url = "https://v2.api.noroff.dev/online-shop";

/**
 * Home component
 *
 * Displays a list of products from the Noroff Online Shop API.
 * Supports loading state, error state, search filtering, and shows discount info.
 *
 * @component
 * @returns {JSX.Element} The rendered home page with search and product cards
 */
const Home = () => {
  /**
   * All products fetched from the API
   * @type {[Array<Object>, Function]}
   */
  const [products, setProducts] = useState([]);

  /**
   * Whether the data is currently loading
   * @type {[boolean, Function]}
   */
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Whether an error occurred during fetch
   * @type {[boolean, Function]}
   */
  const [isError, setIsError] = useState(false);

  /**
   * The current search input value
   * @type {[string, Function]}
   */
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch products on component mount
  useEffect(() => {
    /**
     * Fetches product data from the API
     */
    async function getData() {
      try {
        setIsError(false);
        setIsLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setProducts(json.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    }

    getData();
  }, []);

  /**
   * Filters products by title or tags based on the search query
   * @type {Array<Object>}
   */
  const filteredProducts = products.filter((product) => {
    const productTags = Array.isArray(product.tags) ? product.tags : [];

    return (
      product.title
        .trim()
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase()) ||
      productTags.some((tag) =>
        tag.trim().toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
    );
  });

  if (isLoading) {
    return <div>Loading products</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for a product..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.inputSearch}
        />
      </div>

      <div className={styles.productList}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <Link to={`/product/${product.id}`}>
                <h2>{product.title}</h2>
                <p>
                  Rating: {product.rating}{" "}
                  <FontAwesomeIcon icon={faStar} style={{ color: "#fd805d" }} />
                </p>
                <img src={product.image.url} alt={product.title} />
                <DiscountLabel
                  originalPrice={product.price}
                  discountedPrice={product.discountedPrice}
                />
                <p>{product.discountedPrice} kr</p>
                <p className={styles.originalPrice}>
                  Original price: {product.price} kr
                </p>
              </Link>
              <AddToCartButton product={product} />
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
