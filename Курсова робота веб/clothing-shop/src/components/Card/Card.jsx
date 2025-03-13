import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Card.css';

function Card({ product }) {
  const { addToCart } = useContext(CartContext);

//   const handleAddToCart = () => {
//     addToCart(product);
//     toast.success('Товар додано до кошика!');
//   };


//   return (
//     <motion.div 
//       className="product-card"
//       whileHover={{ scale: 1.05 }}
//       transition={{ duration: 0.3 }}
//     >
//       <img src={product.image} alt={product.name} className="product-image" />
//       <div className="product-info">
//         <h3 className="product-title">{product.name}</h3>
//         <p className="product-price">{product.price} ₴</p>
//         <div className="product-actions">
//           <button 
//             className="action-button cart-button"
//             onClick={handleAddToCart}
//           >
//             <FaShoppingCart />
//           </button>
//           <button className="action-button wishlist-button">
//             <FaHeart />
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// export default Card;
}