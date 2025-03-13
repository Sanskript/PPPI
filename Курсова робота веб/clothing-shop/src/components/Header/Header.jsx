import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IconButton, Badge } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import PropTypes from "prop-types";
import Cart from "../Cart/Cart";
import "./Header.css";

const Header = ({ onLoginClick, onRegisterClick, isLoggedIn, onLogout, user }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    // Початкове завантаження кількості товарів
    const updateCounts = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setCartItemsCount(cart.length);
      setWishlistCount(wishlist.length);
    };

    updateCounts(); // Викликаємо одразу

    // Додаємо слухач події
    window.addEventListener('cartUpdated', updateCounts);
    
    // Прибираємо слухач при розмонтуванні
    return () => {
      window.removeEventListener('cartUpdated', updateCounts);
    };
  }, []);

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  const handleLoginRequired = () => {
    setIsCartOpen(false); // Закриваємо корзину
    onLoginClick(); // Відкриваємо форму логіну
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* <h1 className="site-title">Crossover</h1> */}
        <Link to="/" className="logo">
        <h1 className="site-title">Crossover</h1>
        </Link>

        <div className="left-side">
          <nav className="nav-links">
            <Link to="/" className="home-link">
              Home
            </Link>
            <Link to="/catalog">Catalog</Link>
            {user?.role === "admin" && <Link to="/admin">Admin Panel</Link>}
          </nav>

          <div className="header-actions">
            {/* <div className={`search-container ${isSearchOpen ? "open" : ""}`}>
              <IconButton onClick={() => setIsSearchOpen(!isSearchOpen)}>
                <SearchIcon />
              </IconButton>
              {isSearchOpen && (
                <input
                  type="text"
                  placeholder="search..."
                  className="search-input"
                  autoFocus
                />
              )}
            </div> */}

            <IconButton>
              <Badge badgeContent={wishlistCount} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>

            <IconButton onClick={handleCartClick}>
              <Badge badgeContent={cartItemsCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {isLoggedIn ? (
              <div className="user-menu">
                <Link to="/profile">
                  <IconButton>
                    <PersonIcon />
                  </IconButton>
                </Link>
                <button onClick={onLogout} className="logout-button">
                  Logout
                </button>
              </div>
            ) : (
              <button onClick={onLoginClick} className="login-button">
                Login
              </button>
            )}
          </div>
        </div>

        <Cart 
          isOpen={isCartOpen}
          onClose={handleCartClose}
          isAuthenticated={isLoggedIn}
          onLoginRequired={handleLoginRequired}
        />
      </div>
    </header>
  );
};

Header.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  onRegisterClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.oneOf(["user", "admin"]),
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
};

Header.defaultProps = {
  user: null,
};

export default Header;
