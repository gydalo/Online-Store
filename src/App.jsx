import Layout from "./components/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index.jsx";
import Product from "./pages/Product/Product.jsx";
import Cart from "./pages/Cart/index.jsx";
import Contact from "./pages/Contact/index.jsx";
import Checkout from "./pages/Checkout/index.jsx";

function App() {
  return (
    <div className="wrapper">
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="contact" element={<Contact />} />
          <Route path="checkout" element={<Checkout />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
