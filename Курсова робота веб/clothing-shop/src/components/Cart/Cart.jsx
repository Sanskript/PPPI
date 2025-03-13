import { useState, useEffect } from 'react';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { toast } from 'react-toastify';
import './Cart.css';
import PropTypes from 'prop-types';

const Cart = ({ isOpen, onClose, isAuthenticated, onLoginRequired }) => {
	const [cartItems, setCartItems] = useState([]);
	const [total, setTotal] = useState(0);
	const [showCheckoutForm, setShowCheckoutForm] = useState(false);

	useEffect(() => {
		const loadCart = () => {
			const savedCart = localStorage.getItem('cart');
			if (savedCart) {
				setCartItems(JSON.parse(savedCart));
			}
		};

		loadCart();
		window.addEventListener('cartUpdated', loadCart);

		return () => {
			window.removeEventListener('cartUpdated', loadCart);
		};
	}, []);

	useEffect(() => {
		const newTotal = cartItems.reduce((sum, item) =>
			sum + item.price * item.quantity, 0
		);
		setTotal(newTotal);
	}, [cartItems]);

	const handleQuantityChange = (itemId, newQuantity) => {
		const updatedItems = cartItems.map(item =>
			item.id === itemId
				? { ...item, quantity: Math.max(1, newQuantity) }
				: item
		);
		setCartItems(updatedItems);
		localStorage.setItem('cart', JSON.stringify(updatedItems));
		window.dispatchEvent(new Event('cartUpdated'));
	};

	const handleRemoveItem = (itemId) => {
		const updatedItems = cartItems.filter(item => item.id !== itemId);
		setCartItems(updatedItems);
		localStorage.setItem('cart', JSON.stringify(updatedItems));
		window.dispatchEvent(new Event('cartUpdated'));
	};

	const handleCheckout = () => {
		if (!isAuthenticated) {
			if (typeof onLoginRequired === 'function') {
				onLoginRequired();
			} else {
				toast.error('Please login to place an order');
			}
			return;
		}
		setShowCheckoutForm(true);
	};

	const handlePaymentSubmit = (formData) => {
		console.log('Payment data:', formData);
		
		setCartItems([]);
		localStorage.removeItem('cart');
		window.dispatchEvent(new Event('cartUpdated'));
		
		setShowCheckoutForm(false);
		onClose();
		
		toast.success('Order placed successfully!');
	};

	if (!isOpen) return null;

	return (
		<div className="cart-overlay">
			<div className="cart-container">
				{!showCheckoutForm ? (
					<>
						<div className="cart-header">
							<h2>Cart</h2>
							<button className="close-button" onClick={onClose}>&times;</button>
						</div>

						{cartItems.length === 0 ? (
							<p className="empty-cart">Your cart is empty</p>
						) : (
							<>
								<div className="cart-items">
									{cartItems.map(item => (
										<div key={item.id} className="cart-item">
											<img src={item.image} alt={item.name} />
											<div className="item-details">
												<h3>{item.name}</h3>
												<p className="item-price">${item.price}</p>
											</div>
											<div className="item-controls">
												<div className="quantity-controls">
													<button onClick={() =>
														handleQuantityChange(item.id, item.quantity - 1)
													}>
														-
													</button>
													<span>{item.quantity}</span>
													<button onClick={() =>
														handleQuantityChange(item.id, item.quantity + 1)
													}>
														+
													</button>
												</div>
												<button
													className="remove-button"
													onClick={() => handleRemoveItem(item.id)}
												>
													Remove
												</button>
											</div>
										</div>
									))}
								</div>

								<div className="cart-footer">
									<div className="cart-total">
										<span>Total:</span>
										<span>${total.toFixed(2)}</span>
									</div>
									<button
										className="checkout-button"
										onClick={handleCheckout}
									>
										Checkout
									</button>
								</div>
							</>
						)}
					</>
				) : (
					<CheckoutForm
						onSubmit={handlePaymentSubmit}
						onCancel={() => setShowCheckoutForm(false)}
						total={total}
					/>
				)}
			</div>
		</div>
	);
};

Cart.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	onLoginRequired: PropTypes.func.isRequired
};

export default Cart;