import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Product from "./components/Product/Product.jsx";
import Cart from "./components/Cart/index.jsx";
import Contact from "./components/Contact/index.jsx";


function App() {
  return (
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="contact" element={<Contact />}/>
        </Routes>
      </Layout>
  );
}

export default App;


/*

const url = "https://v2.api.noroff.dev/online-shop";

function Home() {
  return (
    <div>
      <img src="./images/Aaryn-logo-slogan.png" alt="Aaryn Logo" />
      
    </div>
  );
}

function App() {
  const [posts, setPosts] = useState([]);
  // State for holding our loading state
  const [isLoading, setIsLoading] = useState(false);
  // State for holding our error state
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        // Reset the error state in case there as an error previously
        setIsError(false);
        // Turn on the loading state each time we do an API call
        setIsLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setPosts(json.data);
        // Clear the loading state once we've successfully got our data
        setIsLoading(false);
      } catch (error) {
        // Clear the loading state if we get an error and then
        // set our error state to true
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
      <Layout>
        <Routes>
          <Route index element={<Home />} />
        </Routes>
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.rating}</p>
            <img src={post.image.url} alt={post.title} />
            <p>{post.description}</p>
            <button>Add to cart</button>

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
      </Layout>
    </div>
  );
}

export default App;


*/