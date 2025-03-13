import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../Card/ProductCard';
import './Catalog.css';
import PropTypes from 'prop-types';
import { useProductContext } from '../../context/ProductContext';

const Catalog = ({ onAddToCart, onAddToWishlist }) => {
    const { products, loading, error } = useProductContext();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('name-asc');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

    useEffect(() => {
        filterAndSortProducts();
    }, [products, searchQuery, selectedCategory, sortBy, priceRange]);

    const calculateAverageRating = (productId) => {   // Обрахування середньго рейтнгу
        const reviews = JSON.parse(localStorage.getItem(`reviews_${productId}`) || '[]');
        if (reviews.length === 0) return 0;
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        return totalRating / reviews.length;
    };

    const filterAndSortProducts = () => {
        let filtered = products.map(product => ({
            ...product,
            averageRating: calculateAverageRating(product.id)
        }));

        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        filtered = filtered.filter(product =>
            product.price >= priceRange.min && product.price <= priceRange.max
        );

        switch (sortBy) {
            case 'name-asc':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                filtered.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating-desc':
                filtered.sort((a, b) => b.averageRating - a.averageRating); // Сортування по рейтингу
                break;
            default:
                break;
        }

        setFilteredProducts(filtered);
    };

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedCategory('all');
        setSortBy('name-asc');
        setPriceRange({ min: 0, max: 1000 });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="catalog-container">
            <div className="catalog-filters">
                <div className="filters-group">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="all">All categories</option>
                        <option value="t-shirts">T-shirts</option>
                        <option value="pants">Pants</option>
                        <option value="outerwear">Outerwear</option>
                        <option value="sweaters">Sweaters</option>
                        <option value="hoodies">Hoodies</option>
                    </select>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="name-asc">A to Z</option>
                        <option value="name-desc">Z to A</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating-desc">Highest Rated</option>
                    </select>

                    <div className="price-range">
                        <input
                            type="number"
                            value={priceRange.min}
                            onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                            placeholder="Min price"
                        />
                        <input
                            type="number"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                            placeholder="Max price"
                        />
                    </div>
                </div>

                <button 
                    className="reset-filters-btn" 
                    onClick={resetFilters}
                >
                    Reset Filters
                </button>
            </div>

            <div className="products-grid">
                {filteredProducts.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={onAddToCart}
                        onAddToWishlist={onAddToWishlist}
                        averageRating={product.averageRating}
                    />
                ))}
            </div>
        </div>
    );
};

Catalog.propTypes = {
    onAddToCart: PropTypes.func.isRequired,
    onAddToWishlist: PropTypes.func.isRequired
};

export default Catalog;
