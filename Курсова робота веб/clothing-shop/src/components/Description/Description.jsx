import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Rating,
	Button,
	TextField,
	IconButton,
	Typography,
	Box,
	Paper,
	Divider,
	Avatar,
	FormControl,
	Select,
	MenuItem,
	InputLabel
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RateReviewIcon from '@mui/icons-material/RateReview';
import './Description.css';

function Description({ product, isAuthenticated }) {
	const navigate = useNavigate();
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');
	const [isInWishlist, setIsInWishlist] = useState(false);
	const [isInCart, setIsInCart] = useState(false);
	const [reviews, setReviews] = useState([]);
	const [averageRating, setAverageRating] = useState(0); // Збереження середнього рейтингу
	const [currentUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
	const [selectedSize, setSelectedSize] = useState('');
	const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

	useEffect(() => {
		const savedReviews = JSON.parse(localStorage.getItem(`reviews_${product.id}`) || '[]');
		setReviews(savedReviews);
		calculateAverageRating(savedReviews); // Обрахування середньго рейтингу

		const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
		setIsInCart(savedCart.some(item => item.id === product.id));
	}, [product.id]);

	const calculateAverageRating = (reviews) => {  // функція для обрахування середньго рейтингу
		if (reviews.length === 0) {
			setAverageRating(0);
			return;
		}
		const total = reviews.reduce((sum, review) => sum + review.rating, 0);
		setAverageRating(total / reviews.length);
	};

	const handleSizeChange = (event) => {
		setSelectedSize(event.target.value);
	};

	const handleAddToCart = () => {
		if (!selectedSize) {
			return;
		}

		const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');

		if (isInCart) {
			const updatedCart = savedCart.filter(item => item.id !== product.id);
			localStorage.setItem('cart', JSON.stringify(updatedCart));
			setIsInCart(false);
		} else {
			const existingItem = savedCart.find(item => 
				item.id === product.id && item.size === selectedSize
			);

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
					size: selectedSize,
					quantity: 1
				};
				updatedCart = [...savedCart, newItem];
			}
			localStorage.setItem('cart', JSON.stringify(updatedCart));
			setIsInCart(true);
		}
	};

	const handleWishlistClick = () => {
		setIsInWishlist(!isInWishlist);
	};

	const handleSubmitReview = () => {
		if (!isAuthenticated || !currentUser) {
			navigate('/login');
			return;
		}

		if (!rating || !comment.trim()) {
			return;
		}

		const newReview = {
			id: Date.now(),
			userId: currentUser.id,
			userName: currentUser.name || 'Anonymous',
			rating,
			comment,
			date: new Date().toISOString(),
			productId: product.id
		};

		const updatedReviews = [newReview, ...reviews];
		setReviews(updatedReviews);
		localStorage.setItem(`reviews_${product.id}`, JSON.stringify(updatedReviews));

		setRating(0);
		setComment('');
		calculateAverageRating(updatedReviews);
	};

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString('uk-UA', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};

	return (
		<div className="product-description-container">
			<Button
				startIcon={<ArrowBackIcon />}
				onClick={() => navigate('/catalog')}
				className="back-button"
				variant="outlined"
			>
				Back to Catalog
			</Button>

			<Paper elevation={3} className="product-details">
				<div className="product-image-section">
					<img
						src={product.image}
						alt={product.name}
						className="product-image"
					/>
				</div>

				<Box className="product-info-section">
					<div className="product-header">
						<Typography variant="h4" component="h1">
							{product.name}
						</Typography>
						<Rating value={averageRating} readOnly precision={0.1} />
					</div>

					<Typography variant="h5" className="price">
						${product.price}
					</Typography>

					<Typography variant="body1" className="description">
						{product.description}
					</Typography>

					<FormControl fullWidth className="size-select">
						<InputLabel id="size-select-label">Select Size</InputLabel>
						<Select
							labelId="size-select-label"
							value={selectedSize}
							onChange={handleSizeChange}
							label="Select Size"
							disabled={isInCart}
						>
							{sizes.map((size) => (
								<MenuItem key={size} value={size}>
									{size}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<Box className="action-buttons">
						<Button
							variant="contained"
							startIcon={isInCart ? null : <AddShoppingCartIcon />}
							onClick={handleAddToCart}
							className={`add-to-cart-btn ${isInCart ? 'in-cart' : ''}`}
							color={isInCart ? "error" : "primary"}
							fullWidth
							disabled={!selectedSize && !isInCart}
						>
							{isInCart ? 'Remove from Cart' : 'Add to Cart'}
						</Button>
						<IconButton
							onClick={handleWishlistClick}
							className="wishlist-btn"
						>
							{isInWishlist ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
						</IconButton>
					</Box>

					<Divider className="divider" />

					<Box className="review-section">
						<Typography variant="h6" className="review-title">
							<RateReviewIcon />
							Customer Reviews ({reviews.length})
						</Typography>

						{isAuthenticated ? (
							<Box className="review-form">
								<Rating
									value={rating}
									onChange={(event, newValue) => setRating(newValue)}
									size="large"
									className="rating"
								/>
								<TextField
									multiline
									rows={4}
									value={comment}
									onChange={(e) => setComment(e.target.value)}
									placeholder="Share your thoughts about this product..."
									fullWidth
									variant="outlined"
									className="review-input"
								/>
								<Button
									variant="contained"
									onClick={handleSubmitReview}
									className="submit-review-btn"
									disabled={!rating || !comment.trim()}
								>
									Add Review
								</Button>
							</Box>
						) : (
							<Typography variant="body1">
								Please login to leave a review.
							</Typography>
						)}
					</Box>
						<Box className="reviews-list">
    						{reviews.map((review) => (
        					<div key={review.id} className="review-item">
            				<div className="review-header">
                		<Typography className="reviewer-name">
                    		{review.userName}
                		</Typography>
                			<Rating value={review.rating} readOnly size="small" />
                		<Typography className="review-date">
                    			{formatDate(review.date)}
                		</Typography>
            				</div>
            			<Typography className="review-content">
                			{review.comment}
            			</Typography>
        					</div>
    					))}
					</Box>

				</Box>
			</Paper>
		</div>
	);
}

export default Description;
