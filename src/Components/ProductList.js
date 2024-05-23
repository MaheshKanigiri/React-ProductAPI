// ProductList.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Styles/ProductList.module.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  const deleteProduct = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  return (
    <div className={styles.container}>
      <h1>Product List</h1>
      <button className={styles.addButton}><Link to="/add-product">Add Product</Link></button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.description}</td>
              <td>
                <div className={styles.buttonGroup}>
                  <button className={styles.deleteButton} onClick={() => deleteProduct(product.id)}>Delete</button>
                  <Link to={`/product/${product.id}`}>
                    <button className={styles.viewButton}>View Details</button>
                  </Link>
                  <Link to={`/product/${product.id}/edit`}>
                    <button className={styles.editButton}>Edit</button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
