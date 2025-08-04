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
    <div className="container mt-4" data-aos="fade-up">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg" data-aos="zoom-in" data-aos-delay="200">
            <div className="card-header bg-primary text-white" data-aos="fade-down" data-aos-delay="300">
              <h2 className="text-center mb-0">Add Product</h2>
            </div>
            <div className="card-body p-4">
              <form className="needs-validation" onSubmit={handleSubmit} noValidate>
                {/* Other form fields */}
                <div className="form-group mb-3" data-aos="fade-up" data-aos-delay="400">
                  <label htmlFor="category_id" className="form-label">Category</label>
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

                <div className="form-group mb-3" data-aos="fade-up" data-aos-delay="500">
                  <label htmlFor="subcategory_id" className="form-label">Subcategory</label>
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

                <div className="form-group mb-3" data-aos="fade-up" data-aos-delay="600">
                  <label htmlFor="name" className="form-label">Product Name</label>
                  <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                  <div className="invalid-feedback">Please enter the product name.</div>
                </div>

                <div className="form-group mb-3" data-aos="fade-up" data-aos-delay="700">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required rows="3"></textarea>
                  <div className="invalid-feedback">Please enter a product description.</div>
                </div>

                <div className="form-group mb-3" data-aos="fade-up" data-aos-delay="800">
                  <label htmlFor="sku" className="form-label">SKU</label>
                  <input type="text" className="form-control" id="sku" name="sku" value={formData.sku} onChange={handleChange} placeholder="SKU" required />
                  <div className="invalid-feedback">Please enter the product SKU.</div>
                </div>

                <div className="form-group mb-3" data-aos="fade-up" data-aos-delay="900">
                  <label htmlFor="images" className="form-label">Product Images</label>
                  <input type="file" className="form-control" id="images" name="images" onChange={handleChange} required />
                  <div className="invalid-feedback">Please upload product images.</div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3" data-aos="fade-up" data-aos-delay="1000">
                      <label htmlFor="price" className="form-label">Price</label>
                      <input type="text" className="form-control" id="price" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
                      <div className="invalid-feedback">Please enter the product price.</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3" data-aos="fade-up" data-aos-delay="1100">
                      <label htmlFor="quantity" className="form-label">Quantity</label>
                      <input type="text" className="form-control" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" required />
                      <div className="invalid-feedback">Please enter the product quantity.</div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3" data-aos="fade-up" data-aos-delay="1200">
                      <label htmlFor="discount" className="form-label">Discount</label>
                      <input type="text" className="form-control" id="discount" name="discount" value={formData.discount} onChange={handleChange} placeholder="Discount" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3" data-aos="fade-up" data-aos-delay="1300">
                      <label htmlFor="hot" className="form-label">Hot</label>
                      <input type="text" className="form-control" id="hot" name="hot" value={formData.hot} onChange={handleChange} placeholder="Hot" />
                    </div>
                  </div>
                </div>

                <div className="text-center mt-4" data-aos="fade-up" data-aos-delay="1400">
                  <button type="submit" className="btn btn-primary btn-lg">Add Product</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAdd;
