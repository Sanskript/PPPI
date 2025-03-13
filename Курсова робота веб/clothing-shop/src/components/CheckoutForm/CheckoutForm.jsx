import { useState, useEffect } from 'react';
import { Modal, Spin } from 'antd';
import { CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import './CheckoutForm.css';
import './SuccessModal.css';

const CheckoutForm = ({ onSubmit, onCancel, total }) => {
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        name: '',
        address: '',
        city: '',
        zipCode: '',
        phone: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setFormData(prevData => ({
                ...prevData,
                name: `${user.firstName} ${user.lastName}` || '',
                phone: user.phone || '',
                address: user.deliveryAddress?.street || '',
                city: user.deliveryAddress?.city || '',
                zipCode: user.deliveryAddress?.postalCode || '',
                cardNumber: user.bankDetails?.cardNumber || '',
                expiryDate: user.bankDetails?.expiryDate || ''
            }));
        }
    }, []);

    // Валідація номера картки (формат: XXXX XXXX XXXX XXXX)
    const validateCardNumber = (number) => {
        const regex = /^(\d{4}\s?){4}$/;
        return regex.test(number.replace(/\s/g, ''));
    };

    // Валідація терміну дії (формат: MM/YY)
    const validateExpiryDate = (date) => {
        const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        if (!regex.test(date)) return false;

        const [month, year] = date.split('/');
        const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
        const today = new Date();
        return expiry > today;
    };
    

    // Валідація CVV (3 або 4 цифри)
    const validateCVV = (cvv) => {
        return /^[0-9]{3,4}$/.test(cvv);
    };

    // Валідація імені (тільки літери)
    const validateName = (name) => {
        return /^[A-Za-zА-Яа-яІіЇїЄєҐґ\s'-]{2,}$/.test(name);
    };

    // Валідація телефону (український формат)
    const validatePhone = (phone) => {
        return /^(\+38)?(0\d{9})$/.test(phone.replace(/\s/g, ''));
    };

    // Валідація поштового індексу (5 цифр)
    const validateZipCode = (zipCode) => {
        return /^\d{5}$/.test(zipCode);
    };

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        // Форматування в залежності від поля
        switch (name) {
            case 'cardNumber':
                formattedValue = formatCardNumber(value);
                break;
            case 'phone':
                formattedValue = value.replace(/[^\d+]/g, '');
                if (!formattedValue.startsWith('+38')) {
                    formattedValue = '+38' + formattedValue;
                }
                break;
            case 'expiryDate':
                formattedValue = value
                    .replace(/[^\d]/g, '')
                    .replace(/^(\d{2})/, '$1/')
                    .substr(0, 5);
                break;
            default:
                break;
        }

        setFormData(prev => ({
            ...prev,
            [name]: formattedValue
        }));

        // Очищення помилки при зміні поля
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!validateCardNumber(formData.cardNumber)) {
            newErrors.cardNumber = 'Invalid card number format';
        }
        if (!validateExpiryDate(formData.expiryDate)) {
            newErrors.expiryDate = 'Invalid card expiry date';
        }
        if (!validateCVV(formData.cvv)) {
            newErrors.cvv = 'Invalid CVV code';
        }
        if (!validateName(formData.name)) {
            newErrors.name = 'Enter a valid name';
        }
        if (!formData.address.trim()) {
            newErrors.address = 'Enter address';
        }
        if (!formData.city.trim()) {
            newErrors.city = 'Enter city';
        }
        if (!validateZipCode(formData.zipCode)) {
            newErrors.zipCode = 'Invalid zip code';
        }
        if (!validatePhone(formData.phone)) {
            newErrors.phone = 'Invalid phone format';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const showSuccessModal = () => {
        const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();
        
        const modalHtml = `
            <div class="success-modal-overlay">
                <div class="success-modal">
                    <div class="success-modal-content">
                        <div class="success-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M20 6L9 17l-5-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <h3>Thank you for your purchase!</h3>
                        <div class="order-details">
                            <p>Your order has been successfully placed</p>
                            <p class="order-number">Order number: #${orderNumber}</p>
                            <p class="order-total">Order total: $${total.toFixed(2)}</p>
                            <p class="order-email">We will send you a confirmation email</p>
                        </div>
                        <button class="close-modal-btn">Close</button>
                    </div>
                </div>
            </div>
        `;

        const modalElement = document.createElement('div');
        modalElement.innerHTML = modalHtml;
        document.body.appendChild(modalElement);

        const closeBtn = modalElement.querySelector('.close-modal-btn');
        const overlay = modalElement.querySelector('.success-modal-overlay');

        const closeModal = () => {
            modalElement.remove();
            onCancel();
        };

        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            Modal.error({
                title: 'Validation Error',
                content: 'Please check the entered data',
            });
            return;
        }

        setIsLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            onSubmit(formData);
            showSuccessModal();
        } catch (error) {
            Modal.error({
                title: 'Error',
                content: 'An error occurred while processing your order',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

    return (
        <>
            <div className="checkout-form-container">
                <h2>Checkout</h2>
                <div className="total-amount">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <h3>Payment Details</h3>
                        <input
                            type="text"
                            name="cardNumber"
                            placeholder="Card Number"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            maxLength="19"
                            className={errors.cardNumber ? 'error' : ''}
                        />
                        {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                        
                        <div className="card-details">
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    name="expiryDate"
                                    placeholder="MM/YY"
                                    value={formData.expiryDate}
                                    onChange={handleChange}
                                    maxLength="5"
                                    className={errors.expiryDate ? 'error' : ''}
                                />
                                {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
                            </div>
                            
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    name="cvv"
                                    placeholder="CVV"
                                    value={formData.cvv}
                                    onChange={handleChange}
                                    maxLength="4"
                                    className={errors.cvv ? 'error' : ''}
                                />
                                {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="form-group">
                        <h3>Contact Information</h3>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            className={errors.name ? 'error' : ''}
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}

                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            className={errors.phone ? 'error' : ''}
                        />
                        {errors.phone && <span className="error-message">{errors.phone}</span>}

                        <input
                            type="text"
                            name="address"
                            placeholder="Delivery Address"
                            value={formData.address}
                            onChange={handleChange}
                            className={errors.address ? 'error' : ''}
                        />
                        {errors.address && <span className="error-message">{errors.address}</span>}

                        <div className="address-details">
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className={errors.city ? 'error' : ''}
                                />
                                {errors.city && <span className="error-message">{errors.city}</span>}
                            </div>
                            
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    name="zipCode"
                                    placeholder="Zip Code"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                    maxLength="5"
                                    className={errors.zipCode ? 'error' : ''}
                                />
                                {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="form-buttons">
                        <button type="button" className="cancel-button" onClick={onCancel} disabled={isLoading}>
                            Cancel
                        </button>
                        <button type="submit" className="submit-button" disabled={isLoading}>
                            {isLoading ? <LoadingOutlined style={{ fontSize: 24 }} spin /> : 'Confirm Order'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Loading Animation */}
            {isLoading && (
                <div className="loading-overlay">
                    <Spin indicator={antIcon} />
                    <p>Processing order...</p>
                </div>
            )}
        </>
    );
};

export default CheckoutForm;