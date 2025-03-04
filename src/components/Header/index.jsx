import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <li>
          <Link to={`/`}>Home</Link>
        </li>
        <li>
          <Link to="/contact">Contact us</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
      </nav>
    </header>
  );
};

export default Header;
