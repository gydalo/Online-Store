import Header from "../Header";
import Footer from "../Footer";
import propTypes from "prop-types";
import { useLocation } from "react-router-dom";
import styles from "./index.module.css";

const Layout = ({ children }) => {
  const location = useLocation();
  const isHomepage = location.pathname === "/";

  return (
    <div className={styles.layout}>
      {isHomepage && (
        <div className={styles.imageHeader}>
          <img src="/images/Resized-header.jpg" alt="Homepage Header" />
          <div className={styles.overlayLogo}>
            <img src="/images/Aaryn-logo-slogan.png" alt="Aaryn logo" />
          </div>
        </div>
      )}
      <Header />
      <div className={styles.logoAaryn}>
        <img src="/images/Aaryn-logo.png" alt="Aaryn logo" />
      </div>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: propTypes.node.isRequired,
};

export default Layout;
