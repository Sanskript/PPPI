import { createContext, useContext } from 'react';
import useProducts from '../hooks/useProducts';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const productData = useProducts();

  return (
    <ProductContext.Provider value={productData}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
}; 