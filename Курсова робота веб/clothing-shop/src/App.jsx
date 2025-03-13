import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/pages/Home';
import Catalog from './components/pages/Catalog';
import Register from './components/Auth/Register/Register';
import Login from './components/Auth/Login/Login';
import Profile from './components/Profile/Profile';
import AdminPanel from './components/Admin/AdminPanel';
import ProductDetails from './components/pages/ProductDetails';
import './App.css';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import Checkout from './components/Checkout/Checkout';

function App() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        if (token && savedUser) {
            setIsLoggedIn(true);
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleLoginOpen = () => setIsLoginOpen(true);
    const handleLoginClose = () => setIsLoginOpen(false);
    const handleRegisterOpen = () => setIsRegisterOpen(true);
    const handleRegisterClose = () => setIsRegisterOpen(false);

    const handleLogin = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        handleLoginClose();
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('user');
    };

    const handleAddToCart = (product) => {
        setCartItems(prev => {
            const newItems = [...prev, product];
            localStorage.setItem('cart', JSON.stringify(newItems));
            return newItems;
        });
    };

    const handleAddToWishlist = (product) => {
        setWishlistItems(prev => {
            const newItems = [...prev, product];
            localStorage.setItem('wishlist', JSON.stringify(newItems));
            return newItems;
        });
    };

    const handleProfileUpdate = (updatedUserData) => {
        try {
            const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
            const mergedUser = { ...currentUser, ...updatedUserData };
            
            setUser(mergedUser);
            localStorage.setItem('user', JSON.stringify(mergedUser));
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleCheckout = () => {
        console.log('Checkout initiated');
    };

    const handleLoginClick = () => {
        setIsLoginOpen(true);
    };

    return (
        <Router>
            <ProductProvider>
                <CartProvider>
                    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#121212' }}>
                        <Header 
                            onLoginClick={handleLoginClick}
                            onRegisterClick={handleRegisterOpen}
                            isLoggedIn={isLoggedIn}
                            onLogout={handleLogout}
                            user={user}
                        />
                        <main style={{ flex: 1 }}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route 
                                    path="/catalog" 
                                    element={
                                        <Catalog 
                                            onAddToCart={handleAddToCart}
                                            onAddToWishlist={handleAddToWishlist}
                                        />
                                    } 
                                />
                                <Route 
                                    path="/product/:id" 
                                    element={
                                        <ProductDetails 
                                            onAddToCart={handleAddToCart}
                                            isAuthenticated={isLoggedIn}
                                        />
                                    } 
                                />
                                <Route 
                                    path="/admin" 
                                    element={
                                        user?.role === 'admin' 
                                            ? <AdminPanel /> 
                                            : <Navigate to="/" />
                                    } 
                                />
                                <Route 
                                    path="/profile" 
                                    element={
                                        isLoggedIn ? (
                                            <Profile user={user} onSave={handleProfileUpdate} />
                                        ) : (
                                            <Navigate to="/" replace />
                                        )
                                    } 
                                />
                                <Route 
                                    path="/checkout" 
                                    element={
                                        isLoggedIn ? (
                                            <Checkout />
                                        ) : (
                                            <Navigate to="/login" replace />
                                        )
                                    } 
                                />
                            </Routes>
                        </main>
                        <Footer />
                        {isLoginOpen && (
                            <div className="modal">
                                <Login onClose={handleLoginClose} onLogin={handleLogin} />
                            </div>
                        )}
                        {isRegisterOpen && (
                            <div className="modal">
                                <Register onClose={handleRegisterClose} onRegister={handleLogin} />
                            </div>
                        )}
                    </div>
                </CartProvider>
            </ProductProvider>
        </Router>
    );
}

export default App;
