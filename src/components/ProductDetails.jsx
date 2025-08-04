import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from './../config';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}getproductdetails.php?id=${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!product) {
    return <div className="container text-center mt-5" data-aos="fade-up">Loading...</div>;
  }

  return (
    <div className='container mt-4' data-aos="fade-up">
        {/* <button onClick={() => history.goBack()} className='btn btn-outline-info'>Back</button> */}
        <Link to='/products' className='btn btn-outline-info mb-4' data-aos="fade-right" data-aos-delay="200">
          <i className="fas fa-arrow-left me-2"></i>Go back
        </Link>
        
        <div className="row">
          <div className="col-md-6" data-aos="fade-right" data-aos-delay="300">
            <div className="text-center">
              <img src={`${API_URL}${product.images}`} alt={product.name} className="img-fluid rounded shadow" />
            </div>
          </div>
          
          <div className="col-md-6" data-aos="fade-left" data-aos-delay="400">
            <div className="card shadow-sm">
              <div className="card-body">
                <h1 className="card-title mb-3" data-aos="fade-up" data-aos-delay="500">{product.name}</h1>
                <p className="card-text mb-3" data-aos="fade-up" data-aos-delay="600">{product.description}</p>
                
                <div className="row">
                  <div className="col-6" data-aos="fade-up" data-aos-delay="700">
                    <p className="mb-2"><strong>SKU:</strong> {product.sku}</p>
                  </div>
                  <div className="col-6" data-aos="fade-up" data-aos-delay="800">
                    <p className="mb-2"><strong>Quantity:</strong> {product.quantity}</p>
                  </div>
                </div>
                
                <div className="mt-4" data-aos="fade-up" data-aos-delay="900">
                  <h3 className="text-primary mb-3">Price: ${product.price}</h3>
                  <button className="btn btn-success btn-lg me-2">
                    <i className="fas fa-shopping-cart me-2"></i>Add to Cart
                  </button>
                  <button className="btn btn-outline-primary btn-lg">
                    <i className="fas fa-heart me-2"></i>Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Add more product details here */}
    </div>
  );
};

export default ProductDetails;