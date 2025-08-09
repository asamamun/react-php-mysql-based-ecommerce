import React, { useEffect, useState,useContext } from 'react';
import { AuthContext } from './../AuthContext';
import { Link } from 'react-router-dom';
import './../App.css';
import { useCart } from './../CartContext';
import Swal from 'sweetalert2'
import axios from 'axios';
import API_URL from './../config';

export const Products = () => {
    const { authData } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}products.php`);
        const data = await response.json();
        console.log(data);
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

  const deleteProduct = (productId) => {
    try {
      //
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          let response = await axios.post(`${API_URL}deleteproduct.php`, { id: productId });
          console.log(response.data);
          // After successful deletion, update the list of products
          if(response.data.status){
          setProducts(products.filter(product => product.id !== productId));
          }
          Swal.fire({
            title: "Server Response!",
            text: response.data.message,
            icon: "success"
          });
        }
      });
      //

    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category_name === selectedCategory)
    : products;
    return authData.status && (
        <div className="container" data-aos="fade-up">
          {authData.user.role == '2' && (
            <Link className="btn btn-outline-info" to="/add" data-aos="fade-right" data-aos-delay="200">
                                Add Product
                            </Link>
          )}
          
      <h2 className="my-4" data-aos="fade-down">Products - {selectedCategory || 'All Categories'}</h2>
      <div className="mb-3" data-aos="fade-up" data-aos-delay="300">
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
        {filteredProducts.map((product, index) => (
          <div className="col-md-4 mb-4" key={product.id} data-aos="fade-up" data-aos-delay={index * 100}>
            <div className="card h-100 shadow-sm" data-aos="zoom-in" data-aos-delay={index * 150}>
              <img src={`${product.images}`} className="card-img-top" alt={product.name} data-aos="fade-in" data-aos-delay={index * 200} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title" data-aos="fade-up" data-aos-delay={index * 250}>{product.name}</h5>
                {/* <h3>{product.images}</h3> */}
                <p className="card-text flex-grow-1" data-aos="fade-up" data-aos-delay={index * 300}>{product.description}</p>
                <p className="card-text font-weight-bold" data-aos="fade-up" data-aos-delay={index * 350}>Price: ${product.price}</p>
                <div className="d-flex justify-content-between align-items-center mt-auto" data-aos="fade-up" data-aos-delay={index * 400}>
                  <Link to={`/product/${product.id}`} className="btn btn-primary">
                    Details
                  </Link>
                  {authData?.user.role === '2' && (
                    <button onClick={() => deleteProduct(product.id)} className="btn btn-danger">Delete</button>
                  )}
                  <button onClick={() => addToCart(product)} className="btn btn-success">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    )
}