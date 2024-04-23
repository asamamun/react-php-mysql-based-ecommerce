import React, { useEffect, useState,useContext } from 'react';
import { AuthContext } from './../AuthContext';
import { Link } from 'react-router-dom';
import './../App.css';

export const Products = () => {
    const { authData } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost/ROUND57/reactJS/react-php-mysql-based-ecommerce/API/products.php');
        const data = await response.json();
        setProducts(data);

        // Get unique categories from the products data
        const uniqueCategories = [...new Set(data.map((product) => product.category_name))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category_name === selectedCategory)
    : products;
    return authData.status && (
        <div className="container">
      <h2 className="my-4">Products - {selectedCategory || 'All Categories'}</h2>
      <div className="mb-3">
        <label htmlFor="category-filter" className="form-label">
          Filter by Category:
        </label>
        <select id="category-filter" className="form-select" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card">
              <img src={`assets/products/${product.images}`} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text font-weight-bold">Price: ${product.price}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <Link to={`/product/${product.id}`} className="btn btn-primary">
                    Details
                  </Link>
                  <button className="btn btn-success">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    )
}