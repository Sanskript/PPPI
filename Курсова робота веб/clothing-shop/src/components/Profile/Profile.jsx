import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Profile.css';
import EditIcon from '@mui/icons-material/Edit';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TimelineIcon from '@mui/icons-material/Timeline';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import axios from 'axios';
import useUser from '../../hooks/useUser';

const Profile = ({ user, onSave }) => {
    const [initialUser, setInitialUser] = useState(user);
    const [editedUser, setEditedUser] = useState(user);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [avatar, setAvatar] = useState(localStorage.getItem('userAvatar'));
    const [saveStatus, setSaveStatus] = useState('');

    // Оновлюємо стан при зміні пропса user
    useEffect(() => {
        setInitialUser(user);
        setEditedUser(user);
    }, [user]);

    // Функція для збереження змін
    const saveChanges = async (updatedData) => {
        setSaveStatus('Saving...');
        try {
            await onSave(updatedData);
            setInitialUser(updatedData);
            setSaveStatus('Saved');
            setTimeout(() => setSaveStatus(''), 2000);
        } catch (err) {
            setSaveStatus('Failed to save');
            setTimeout(() => setSaveStatus(''), 3000);
        }
    };

    // Оновлена функція handleChange з дебаунсом
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedUser = { ...editedUser };

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            updatedUser[parent] = {
                ...updatedUser[parent],
                [child]: value
            };
        } else {
            updatedUser[name] = value;
        }

        setEditedUser(updatedUser);
        // Використовуємо debounce для збереження
        const timeoutId = setTimeout(() => {
            saveChanges(updatedUser);
        }, 500);

        return () => clearTimeout(timeoutId);
    };

    const handleEdit = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            setEditedUser(initialUser);
        }
    };

    const handleSave = async () => {
        await saveChanges(editedUser);
        setIsEditing(false);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result;
                setAvatar(result);
                localStorage.setItem('userAvatar', result);
                // Зберігаємо аватар в даних користувача
                const updatedUser = {
                    ...editedUser,
                    avatar: result
                };
                saveChanges(updatedUser);
            };
            reader.readAsDataURL(file);
        }
    };

    const renderAdminStats = () => (
        <div className="profile-card admin-stats">
            <div className="stat-item">
                <div className="stat-value">{initialUser.adminStats?.totalUsers || 0}</div>
                <div className="stat-label">Total Users</div>
            </div>
            <div className="stat-item">
                <div className="stat-value">{initialUser.adminStats?.activeOrders || 0}</div>
                <div className="stat-label">Active Orders</div>
            </div>
            <div className="stat-item">
                <div className="stat-value">{initialUser.adminStats?.totalProducts || 0}</div>
                <div className="stat-label">Total Products</div>
            </div>
        </div>
    );

    const renderUserInfo = () => (
        <>
            <div className="profile-card delivery-card">
                <h2><LocalShippingIcon /> Delivery Address</h2>
                <div className="info-group">
                    <div className="info-label">Street</div>
                    <div className="info-value">{initialUser.deliveryAddress?.street || 'Not set'}</div>
                </div>
                <div className="info-group">
                    <div className="info-label">City</div>
                    <div className="info-value">{initialUser.deliveryAddress?.city || 'Not set'}</div>
                </div>
                <div className="info-group">
                    <div className="info-label">Country</div>
                    <div className="info-value">{initialUser.deliveryAddress?.country || 'Not set'}</div>
                </div>
            </div>

            <div className="profile-card payment-card">
                <h2><CreditCardIcon /> Payment Information</h2>
                <div className="info-group">
                    <div className="info-label">Card Number</div>
                    <div className="info-value masked-card-number">
                        {initialUser.bankDetails?.cardNumber ? 
                            `**** **** **** ${initialUser.bankDetails.cardNumber.slice(-4)}` : 
                            'Not set'
                        }
                    </div>
                </div>
                <div className="info-group">
                    <div className="info-label">Expiry Date</div>
                    <div className="info-value">
                        {initialUser.bankDetails?.expiryDate || 'Not set'}
                    </div>
                </div>
            </div>
        </>
    );

    const renderUserActivity = () => (
        <div className="profile-card activity-card">
            <h2><TimelineIcon /> User Activity</h2>
            <div className="activity-stats">
                <div className="activity-item">
                    <ShoppingBasketIcon />
                    <div className="activity-details">
                        <span className="activity-value">{initialUser.purchaseCount || 0}</span>
                        <span className="activity-label">Total Purchases</span>
                    </div>
                </div>
                <div className="activity-item">
                    <div className="user-id-badge">ID: {initialUser.id}</div>
                    <div className="member-since">
                        Member Since: {initialUser.memberSince || 'Unknown'}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="profile-container">
            <div className="profile-sidebar">
                <div className="profile-avatar-container">
                    {avatar ? (
                        <img src={avatar} alt="Profile" className="profile-avatar" />
                    ) : (
                        <AccountCircleIcon className="profile-avatar-icon" />
                    )}
                    <label className="avatar-upload-label">
                        <EditIcon />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            style={{ display: 'none' }}
                        />
                    </label>
                </div>
                <button 
                    className={`edit-button ${isEditing ? 'active' : ''}`} 
                    onClick={handleEdit}
                >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
            </div>

            <div className="profile-main">
                {saveStatus && (
                    <div className={`save-status ${saveStatus.toLowerCase()}`}>
                        {saveStatus}
                    </div>
                )}
                
                {isEditing ? (
                    <div className="edit-form">
                        <div className="profile-card">
                            <h2><PersonIcon /> Personal Information</h2>
                            <div className="edit-group">
                                <input
                                    name="firstName"
                                    value={editedUser.firstName || ''}
                                    onChange={handleChange}
                                    placeholder="First Name"
                                />
                                <input
                                    name="lastName"
                                    value={editedUser.lastName || ''}
                                    onChange={handleChange}
                                    placeholder="Last Name"
                                />
                                <input
                                    name="phone"
                                    value={editedUser.phone || ''}
                                    onChange={handleChange}
                                    placeholder="Phone"
                                />
                            </div>
                        </div>

                        <div className="profile-card">
                            <h2><LocalShippingIcon /> Delivery Address</h2>
                            <div className="edit-group">
                                <input
                                    name="deliveryAddress.street"
                                    value={editedUser.deliveryAddress?.street || ''}
                                    onChange={handleChange}
                                    placeholder="Street"
                                />
                                <input
                                    name="deliveryAddress.city"
                                    value={editedUser.deliveryAddress?.city || ''}
                                    onChange={handleChange}
                                    placeholder="City"
                                />
                                <input
                                    name="deliveryAddress.country"
                                    value={editedUser.deliveryAddress?.country || ''}
                                    onChange={handleChange}
                                    placeholder="Country"
                                />
                            </div>
                        </div>

                        <div className="profile-card">
                            <h2><CreditCardIcon /> Bank Details</h2>
                            <div className="edit-group">
                                <input
                                    name="bankDetails.cardNumber"
                                    value={editedUser.bankDetails?.cardNumber || ''}
                                    onChange={handleChange}
                                    placeholder="Card Number"
                                />
                                <input
                                    name="bankDetails.expiryDate"
                                    value={editedUser.bankDetails?.expiryDate || ''}
                                    onChange={handleChange}
                                    placeholder="Expiry Date (MM/YY)"
                                />
                            </div>
                        </div>

                        <div className="edit-buttons">
                            <button 
                                className="save-button" 
                                onClick={handleSave}
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button 
                                className="cancel-button" 
                                onClick={() => setIsEditing(false)}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="profile-card">
                            <h2><PersonIcon /> Personal Information</h2>
                            <div className="info-group">
                                <div className="info-label">Name</div>
                                <div className="info-value">
                                    {initialUser.firstName} {initialUser.lastName}
                                </div>
                            </div>
                            <div className="info-group">
                                <div className="info-label">Email</div>
                                <div className="info-value">{initialUser.email}</div>
                            </div>
                            <div className="info-group">
                                <div className="info-label">Phone</div>
                                <div className="info-value">{initialUser.phone || 'Not set'}</div>
                            </div>
                        </div>

                        {!isEditing && renderUserActivity()}
                        {initialUser.role === 'admin' ? renderAdminStats() : renderUserInfo()}
                    </>
                )}
            </div>
        </div>
    );
};

Profile.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        role: PropTypes.oneOf(['admin', 'user']).isRequired,
        purchaseCount: PropTypes.number,
        memberSince: PropTypes.string,
        adminStats: PropTypes.shape({
            totalUsers: PropTypes.number,
            activeOrders: PropTypes.number,
            totalProducts: PropTypes.number,
        }),
        deliveryAddress: PropTypes.shape({
            street: PropTypes.string,
            city: PropTypes.string,
            country: PropTypes.string,
            postalCode: PropTypes.string,
        }),
        bankDetails: PropTypes.shape({
            cardNumber: PropTypes.string,
            expiryDate: PropTypes.string,
        }),
    }).isRequired,
    onSave: PropTypes.func.isRequired,
};

export default Profile;
