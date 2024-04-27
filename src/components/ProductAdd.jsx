import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from './../config';
import Swal from 'sweetalert2';

const ProductAdd = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [formData, setFormData] = useState({
    category_id: '',
    subcategory_id: '',
    name: '',
    description: '',
    sku: '',
    images: null,
    price: '',
    quantity: '',
    discount: '',
    hot: '',
  });

  useEffect(() => {
    // Fetch categories
    axios.get(`${API_URL}getCategories.php`)
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setFormData({ ...formData, category_id: categoryId });

    // Fetch subcategories based on selected category
    axios.get(`${API_URL}getSubcategories.php?category_id=${categoryId}`)
      .then(response => {
        setSubcategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching subcategories:', error);
      });
  };
  const handleSubcategoryChange = (e) => {
    const subcategoryId = e.target.value;
    setFormData({ ...formData, subcategory_id: subcategoryId });
  }

  const handleChange = (e) => {
    const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    try {
      const response = await axios.post(`${API_URL}addproduct.php`, formDataToSend);
      console.log('Product added:', response.data);
      if (response.data.status) {
        setFormData({
          category_id: '',
          subcategory_id: '',
          name: '',
          description: '',
          sku: '',
          images: null,
          price: '',
          quantity: '',
          discount: '',
          hot: '',
        });
        document.querySelector('input[type="file"]').value = '';        
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.data.message,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message,
        });
      }

      // Clear form data after successful submission

    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <div className="container">
        <form className="needs-validation" onSubmit={handleSubmit} noValidate>
          {/* Other form fields */}
          <div className="text-center">
            <h2 className="font-weight-bold mt-3">Add Product</h2>
          </div>

          <div className="form-group mb-2">
            <select
              className="form-control"
              id="category_id"
              name="category_id"
              value={formData.category_id}
              onChange={handleCategoryChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            <div className="invalid-feedback">Please select a category.</div>
          </div>

          <div className="form-group mb-2">
            <select
              className="form-control"
              id="subcategory_id"
              name="subcategory_id"
              value={formData.subcategory_id}
              onChange={handleSubcategoryChange}
              required
            >
              <option value="">Select Subcategory</option>
              {subcategories.map(subcategory => (
                <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
              ))}
            </select>
            <div className="invalid-feedback">Please select a subcategory.</div>
          </div>

          <div className="form-group mb-2">
            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <div className="invalid-feedback">Please enter the product name.</div>
          </div>

          <div className="form-group mb-2">
            <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required></textarea>
            <div className="invalid-feedback">Please enter a product description.</div>
          </div>

          <div className="form-group mb-2">
            <input type="text" className="form-control" id="sku" name="sku" value={formData.sku} onChange={handleChange} placeholder="SKU" required />
            <div className="invalid-feedback">Please enter the product SKU.</div>
          </div>

          <div className="form-group mb-2">
            <label htmlFor="images">Images:</label>
            <input type="file" className="form-control-file" id="images" name="images" onChange={handleChange} required />
            <div className="invalid-feedback">Please upload product images.</div>
          </div>

          <div className="form-group mb-2">
            <input type="text" className="form-control" id="price" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
            <div className="invalid-feedback">Please enter the product price.</div>
          </div>

          <div className="form-group mb-2">
            <input type="text" className="form-control" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" required />
            <div className="invalid-feedback">Please enter the product quantity.</div>
          </div>

          <div className="form-group mb-2">
            <input type="text" className="form-control" id="discount" name="discount" value={formData.discount} onChange={handleChange} placeholder="Discount" />
          </div>

          <div className="form-group mb-2">
            <input type="text" className="form-control" id="hot" name="hot" value={formData.hot} onChange={handleChange} placeholder="Hot" />
          </div>

          <div className="mb-2">
          <button type="submit" className="btn btn-primary">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductAdd;
