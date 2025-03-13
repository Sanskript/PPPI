import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [isInCart, setIsInCart] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setIsInCart(savedCart.some(item => item.id === product.id));
        
        const handleCartUpdate = () => {
            const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');
            setIsInCart(updatedCart.some(item => item.id === product.id));
        };
        
        window.addEventListener('cartUpdated', handleCartUpdate);
        return () => window.removeEventListener('cartUpdated', handleCartUpdate);
    }, [product.id]);

    const handleWishlistClick = (e) => {
        e.stopPropagation();
        setIsInWishlist(!isInWishlist);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItem = savedCart.find(item => item.id === product.id);
        
        let updatedCart;
        if (existingItem) {
            existingItem.quantity += 1;
            updatedCart = savedCart;
        } else {
            const newItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            };
            updatedCart = [...savedCart, newItem];
        }
        
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setIsInCart(true);
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const handleCardClick = () => {
        navigate(`/product/${product.id}`);
    };

    return (
        <div 
            className="product-card" 
            onClick={handleCardClick}
            style={{ cursor: 'pointer' }}
        >
            <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-actions">
                    <IconButton 
                        onClick={handleWishlistClick}
                        className="wishlist-button"
                    >
                        {isInWishlist ? (
                            <FavoriteIcon className="wishlist-icon active" />
                        ) : (
                            <FavoriteBorderIcon className="wishlist-icon" />
                        )}
                    </IconButton>
                    <IconButton 
                        onClick={handleAddToCart}
                        className={`cart-button ${isInCart ? 'in-cart' : ''}`}
                    >
                        {isInCart ? (
                            <CheckCircleIcon className="cart-icon active" />
                        ) : (
                            <AddShoppingCartIcon className="cart-icon" />
                        )}
                    </IconButton>
                </div>
            </div>
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price}</p>
            </div>
        </div>
    );
};

export default ProductCard; 