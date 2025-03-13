import { useState } from 'react';
import { useProductContext } from '../../context/ProductContext';
import styles from './AdminPanel.module.css';

const CATEGORIES = [
  { value: 't-shirts', label: 'T-shirts' },
  { value: 'pants', label: 'Pants' },
  { value: 'outerwear', label: 'Outerwear' },
  { value: 'sweaters', label: 'Sweaters' },
  { value: 'hoodies', label: 'Hoodies' }
];

const INITIAL_PRODUCT = {
  name: '',
  description: '',
  price: '',
  image: '',
  category: '',
  sizes: [],
};

const AdminPanel = () => {
  const { products, loading, error, addProduct, deleteProduct } = useProductContext();
  const [formError, setFormError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [newProduct, setNewProduct] = useState(INITIAL_PRODUCT);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormError(null);
    setSuccessMessage('');
    setNewProduct(prev => ({
      ...prev,
      [name]: name === 'sizes' ? value.split(',').map(size => size.trim()) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMessage('');
    
    try {
      addProduct({
        ...newProduct,
        price: Number(newProduct.price)
      });
      
      setNewProduct(INITIAL_PRODUCT);
      setSuccessMessage('Product successfully added!');
    } catch (err) {
      setFormError('Error adding product');
    }
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        deleteProduct(productId);
        setSuccessMessage('Product successfully deleted!');
      } catch (err) {
        setFormError('Error deleting product');
      }
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.adminPanel}>
      <h2>Administrative Panel</h2>
      
      {successMessage && (
        <div className={styles.successMessage}>{successMessage}</div>
      )}
      
      <div className={styles.adminContent}>
        <section className={styles.formSection}>
          <h3>Add new product</h3>
          {formError && <div className={styles.errorMessage}>{formError}</div>}
          
          <form onSubmit={handleSubmit} className={styles.productForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Product Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Product Description</label>
              <textarea
                id="description"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="price">Price</label>
                <input
                  id="price"
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="image">Image URL</label>
              <input
                id="image"
                type="url"
                name="image"
                value={newProduct.image}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="sizes">Sizes (comma separated)</label>
              <input
                id="sizes"
                type="text"
                name="sizes"
                value={newProduct.sizes.join(', ')}
                onChange={handleInputChange}
                placeholder="S, M, L"
                required
              />
            </div>

            <div className={styles.formActions}>
              <button 
                type="submit" 
                className={styles.submitButton}
              >
                Add Product
              </button>
            </div>
          </form>
        </section>

        <section className={styles.productsSection}>
          <h3>Manage Products</h3>
          <div className={styles.productGrid}>
            {products.map(product => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImage}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    onError={(e) => {
                      e.target.src = '/placeholder.jpg';
                    }}
                  />
                </div>
                <div className={styles.productInfo}>
                  <h4>{product.name}</h4>
                  <p className={styles.productPrice}>{product.price} $</p>
                  <p className={styles.productCategory}>
                    {CATEGORIES.find(cat => cat.value === product.category)?.label || product.category}
                  </p>
                  <div className={styles.productSizes}>
                    {product.sizes.map(size => (
                      <span key={size} className={styles.sizeTag}>{size}</span>
                    ))}
                  </div>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPanel; 