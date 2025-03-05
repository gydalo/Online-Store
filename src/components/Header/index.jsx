import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import "/src/css/style.css";
import styles from "./index.module.css"

const Header = () => {
  const cartItems = useSelector((state) => state.cart.products);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header>
      <nav>
        <li>
          <Link to={`/`}><img className="logo-header" src="../images/Aaryn-logo-slogan.png" alt="Logo with slogan" /></Link>
        </li>
        <li>
          <Link to="/contact">
            <FontAwesomeIcon icon={faPaperPlane} style={{ color: "#5b4f47" }} />
          </Link>
        </li>
        <li>
          <Link to="/cart">
            <FontAwesomeIcon
              icon={faCartShopping}
              style={{ color: "#5b4f47" }}
            />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
        </li>
      </nav>
    </header>
  );
};

export default Header;
