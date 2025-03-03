import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, Link, useParams } from "react-router-dom";
import { addProduct } from "../CartSlice";

const url = "https://v2.api.noroff.dev/online-shop";

const Home = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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

  if (isLoading) {
    return <div>Loading products</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <Link to={`/product/${product.id}`}>
            <h2>{product.title}</h2>
            <p>Rating: {product.rating} ⭐</p>
            <img src={product.image.url} alt={product.title} />
            <p>{product.discountedPrice} kr</p>
            <p>Original price: {product.price} kr</p>
          </Link>
          <button onClick={() => dispatch(addProduct(product))}>
            Add to cart
          </button>

          <h3>Reviews:</h3>
          {product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <div key={index}>
                <h4>Review by: {review.username}</h4>
                <p>Rating: {review.rating} ⭐</p>
                <p>{review.description}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;
