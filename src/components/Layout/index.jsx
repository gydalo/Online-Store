import Header from "../Header";
import Footer from "../Footer";
import propTypes from "prop-types";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  const isHomepage = location.pathname === "/";

  return (
    <div>
      {isHomepage && (
        <div className="image-header">
          <img
            src="/images/mitchell-luo-_A1pTfsMNY4-unsplash.jpg"
            alt="Homepage Header"
            className="header-image"
          />
          <div className="header-image-logo">
            <img src="/images/Aaryn-logo-slogan.png" alt="Aaryn logo" />
          </div>
        </div>
      )}
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    );
  };

  
  // Is this necessary?
  Layout.propTypes = {
    children: propTypes.node.isRequired,
  };

  export default Layout;