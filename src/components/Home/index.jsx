import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, Link, useParams } from "react-router-dom";
import { addProduct } from "../CartSlice";

const url = "https://v2.api.noroff.dev/online-shop";

const Home = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsError(false);
        setIsLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setPosts(json.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    }

    getData();
  }, []);

  if (isLoading) {
    return <div>Loading posts</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <Link to={`/product/${post.id}`}>
            <h2>{post.title}</h2>
            <p>Rating: {post.rating} ⭐</p>
            <img src={post.image.url} alt={post.title} />
            <p>{post.description}</p>{" "}
          </Link>
          <button onClick={() => dispatch(addProduct(product))}>
            Add to cart
          </button>

          <h3>Reviews:</h3>
          {post.reviews.length > 0 ? (
            post.reviews.map((review, index) => (
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
