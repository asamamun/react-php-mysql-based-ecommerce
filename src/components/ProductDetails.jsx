import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost/ROUND57/reactJS/react-php-mysql-based-ecommerce/API/details.php?id=${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
        {/* <button onClick={() => history.goBack()} className='btn btn-outline-info'>Back</button> */}
        <Link to='/products' className='btn btn-outline-info'>Go back</Link>
        <div className='d-flex justify-content-center'>
        <img src={`/assets/products/${product.images}`} alt={product.name} />
        </div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>SKU: {product.sku}</p>
      <p>Price: ${product.price}</p>
      <p>Quantity: {product.quantity}</p>
      {/* Add more product details here */}
    </div>
  );
};

export default ProductDetails;