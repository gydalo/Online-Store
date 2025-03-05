import Header from "../Header";
import Footer from "../Footer";
import propTypes from "prop-types";


const Layout = ({ children }) => {
    return (
      <div>
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