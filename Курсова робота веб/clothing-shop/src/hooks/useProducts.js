import { useState, useEffect } from 'react';

const INITIAL_PRODUCTS = [
  {
    id: "1",
    name: "Black T-Shirt",
    description: "Elegant black T-shirt made of high quality cotton",
    price: 229.99,
    image: "https://techwear-outfits.com/cdn/shop/files/function-t-shirt-techwear-867.webp?v=1701847832&width=400",
    category: "t-shirts",
    sizes: ["S", "M", "L", "XL"],
    inStock: true
  },
  {
    id: "2",
    name: "Denim Jeans",
    description: "Denim Y2K jeans",
    price: 59.99,
    image: "https://techwear-outfits.com/cdn/shop/files/denim-y2k-jeans-techwear-322.webp?v=1732798502&width=400",
    category: "pants",
    sizes: ["30x32", "32x32", "34x32", "36x32"],
    inStock: true
  },
  {
    id: "3",
    name: "Jacket",
    description: "Style jacket with straps",
    price: 199.99,
    image: "https://techwear-outfits.com/cdn/shop/products/techwear-jacket-with-straps-techwear-782.webp?v=1678199686&width=400",
    category: "outerwear", 
    sizes: ["S", "M", "L"],
    inStock: true
  },
  {
    id: "4",
    name: "Wool Sweater",
    description: "Warm wool sweater",
    price: 79.99,
    image: "https://techwear-outfits.com/cdn/shop/files/tattered-sweater-techwear-880.webp?v=1731720787&width=400",
    category: "sweaters",
    sizes: ["S", "M", "L", "XL"],
    inStock: true
  },
  {
    id: "5",
    name: "IN GLOCK WE TRUST hoodie",
    description: "Comfortable cotton hoodie",
    price: 49.99,
    image: "https://techwear-outfits.com/cdn/shop/files/in-glock-we-trust-hoodie-techwear-296.webp?v=1729060252&width=400",
    category: "hoodies",
    sizes: ["S", "M", "L", "XL"],
    inStock: true
  },
  {
    id: "6",
    name: "Cargo Pants",
    description: "Practical cargo pants",
    price: 79.99,
    image: "https://techwear-outfits.com/cdn/shop/files/slim-tactical-cargo-pants-techwear-457.webp?v=1699020523&width=600",
    category: "pants",
    sizes: ["30x32", "32x32", "34x32"],
    inStock: true
  },
  {
    id: "7",
    name: "Striped Polo Shirt",
    description: "Futuristic t-shirt design",
    price: 39.99,
    image: "https://techwear-outfits.com/cdn/shop/files/futuristic-t-shirt-design-techwear-981.webp?v=1712830351&width=400",
    category: "t-shirts",
    sizes: ["S", "M", "L"],
    inStock: true
  },
  {
    id: "8",
    name: "Coat",
    description: "Protection Cape",
    price: 149.99,
    image: "https://techwear-outfits.com/cdn/shop/files/protection-cape-techwear-289.png?v=1731685297&width=400",
    category: "outerwear",
    sizes: ["S", "M", "L", "XL"],
    inStock: true
  }
];

const useProducts = () => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = () => {
    try {
      setLoading(true);
      setError(null);
      // Імітуємо завантаження
      setTimeout(() => {
        setProducts(INITIAL_PRODUCTS);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Помилка при завантаженні товарів');
      console.error('Error fetching products:', err);
      setLoading(false);
    }
  };

  const addProduct = async (productData) => {
    try {
      setLoading(true);
      setError(null);
      
      const newProduct = {
        ...productData,
        id: Date.now().toString(), // Простий спосіб генерації унікального ID
        inStock: true
      };

      setProducts(prev => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      setError('Помилка при додаванні товару');
      console.error('Error adding product:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      setLoading(true);
      setError(null);
      
      setProducts(prev => prev.filter(product => product.id !== productId));
    } catch (err) {
      setError('Помилка при видаленні товару');
      console.error('Error deleting product:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    addProduct,
    deleteProduct,
    refreshProducts: fetchProducts
  };
};

export default useProducts; 