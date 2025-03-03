import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, Link, useParams } from "react-router-dom";
import { addProduct } from "../CartSlice";
import DiscountLabel from "../DiscountLabel";

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
      product.title.trim().toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      productTags.some(tag => tag.trim().toLowerCase().includes(searchQuery.trim().toLowerCase()))
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
         <input
        type="text"
        placeholder="Search for a product..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

{filteredProducts.length > 0 ? (
      filteredProducts.map((product) => (
        <div key={product.id}>
          <Link to={`/product/${product.id}`}>
            <h2>{product.title}</h2>
            <p>Rating: {product.rating} ⭐</p>
            <img src={product.image.url} alt={product.title} />
            <DiscountLabel originalPrice={product.price} discountedPrice={product.discountedPrice} />
            <p>{product.discountedPrice} kr</p>
            <p>Original price: {product.price} kr</p>
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
      );
    };

export default Home;
