import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Styles/ProductDetail.module.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const selectedProduct = storedProducts.find(item => item.id === parseInt(id));
    setProduct(selectedProduct);
  }, [id]);

  return (
    <div className={styles.container}>
      <h2>Product Detail</h2>
      {product && (
        <div className={styles.card}>
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <p>Description: {product.description}</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
