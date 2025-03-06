import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addProduct } from "../../components/CartSlice";
import DiscountLabel from "../../components/DiscountLabel";
import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const url = "https://v2.api.noroff.dev/online-shop";

const Home = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
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
              <button onClick={() => dispatch(addProduct(product))}>
                Add to cart
              </button>
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
