import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Styles/AddProduct.module.css';

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', price: '', description: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { ...formData, id: Date.now() };
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = [...storedProducts, newProduct];
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" />
        <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Price" />
        <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description"></textarea>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddProduct;
