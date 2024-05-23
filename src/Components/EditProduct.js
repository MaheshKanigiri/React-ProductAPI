import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Styles/EditProduct.module.css';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: ''
  });

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const selectedProduct = storedProducts.find(item => item.id === parseInt(id));
    if (selectedProduct) {
      setProduct(selectedProduct);
      setFormData({
        name: selectedProduct.name,
        price: selectedProduct.price,
        description: selectedProduct.description
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = { ...product, ...formData };
    const updatedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const index = updatedProducts.findIndex(item => item.id === parseInt(id));
    if (index !== -1) {
      updatedProducts[index] = updatedProduct;
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      navigate('/');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Edit Product</h2>
      {product && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} />
          </div>
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
};

export default EditProduct;
