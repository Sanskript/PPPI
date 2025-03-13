import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import './Checkout.css';

// Замініть на ваш публічний ключ Stripe
const stripePromise = loadStripe('your_publishable_key');

const CheckoutForm = ({ totalAmount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            return;
        }

        try {
            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
            });

            if (error) {
                toast.error(error.message);
                return;
            }

            // Тут можна додати логіку для відправки paymentMethod.id на бекенд
            toast.success('Оплата пройшла успішно!');
            
        } catch (err) {
            toast.error('Помилка при обробці платежу');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement 
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#fff',
                            '::placeholder': {
                                color: '#aab7c4'
                            },
                        },
                        invalid: {
                            color: '#fa755a',
                        },
                    },
                }}
            />
            <button 
                type="submit" 
                disabled={!stripe || loading}
                className="checkout-button"
            >
                {loading ? 'Обробка...' : `Оплатити ${totalAmount.toFixed(2)} ₴`}
            </button>
        </form>
    );
};

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, clearCart } = useCart();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        zipCode: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <motion.div 
            className="checkout-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <h2>Оформлення замовлення</h2>
            
            <div className="checkout-content">
                <div className="checkout-form">
                    <div className="shipping-info">
                        <h3>Інформація про доставку</h3>
                        <div className="form-group">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Ім'я"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Прізвище"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Телефон"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                name="address"
                                placeholder="Адреса"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-row">
                            <input
                                type="text"
                                name="city"
                                placeholder="Місто"
                                value={formData.city}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="text"
                                name="zipCode"
                                placeholder="Поштовий індекс"
                                value={formData.zipCode}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="payment-section">
                        <h3>Оплата</h3>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm totalAmount={totalAmount} />
                        </Elements>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Checkout; 