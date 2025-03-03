import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../CartSlice";


const Product = () => {
    const { id } = useParams(); 
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);


    useEffect(() => {
        async function fetchProduct() {
          try {
            setIsLoading(true);
            setIsError(false);
    
            const response = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`);
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
        <h1>{product.title}</h1>
        <img src={product.image.url} alt={product.title} />
        <p>{product.discountedPrice} kr</p>
        <p>Original price: {product.price} kr</p>
        <p>Rating: {product.rating} ⭐</p>
        <p>{product.description}</p>
        <button onClick={() => dispatch(addProduct(product))}>
          Add to cart
        </button>
      </div>
    );
  };
  
  export default Product;