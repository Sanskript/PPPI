import { useParams } from 'react-router-dom';
import { useProductContext } from '../../context/ProductContext';
import Description from '../Description/Description';

const ProductDetails = ({ onAddToCart, isAuthenticated }) => {
    const { id } = useParams();
    const { products } = useProductContext();
    
    const product = products.find(p => p.id === id);

    if (!product) {
        return <div>Товар не знайдено</div>;
    }

    return (
        <Description 
            product={product}
            onAddToCart={onAddToCart}
            isAuthenticated={isAuthenticated}
        />
    );
};

export default ProductDetails; 