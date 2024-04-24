import React, { useState } from 'react';
import axios from 'axios';

const ProductAdd = () => {
  const [formData, setFormData] = useState({
    category_id: '',
    subcategory_id: '',
    name: '',
    description: '',
    sku: '',
    images: null, // Store file object
    price: '',
    quantity: '',
    discount: '',
    hot: '',
  });

  const handleChange = (e) => {
    // If the input is a file, use e.target.files[0] to get the file object
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
      const response = await axios.post('http://localhost/ROUND57/reactJS/react-php-mysql-based-ecommerce/API/addproduct.php', formDataToSend);
      console.log('Product added:', response.data);
      // Clear form data after successful submission
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
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
<div>
      <div className="container">
        <form className="needs-validation" onSubmit={handleSubmit} noValidate>
          <div className="text-center">
            <h2 className="font-weight-bold mt-3">Add Product</h2>
          </div>
          <div className="form-group mb-2">
            <select className="form-control" id="category_id" name="category_id" value={formData.id} onChange={handleChange} required>
              <option value="">Select Category</option>
              <option value="1">Electronics</option>
              <option value="2">Mobile</option>
              <option value="3">Men</option>
              <option value="4">Women</option>
              <option value="5">Sports</option>
              <option value="6">Cattle</option>
            </select>
            <div className="invalid-feedback">Please select a category.</div>
          </div>

          <div className="form-group mb-2">
            <select className="form-control" id="subcategory_id" name="subcategory_id" value={formData.subcategory_id} onChange={handleChange} required>
              <option value="">Select Subcategory</option>
              <option value="1">TV</option>
              <option value="2">AC</option>
              <option value="3">Button Mobile</option>
              <option value="4">Smart Mobile</option>
              <option value="5">Sports</option>
              <option value="6">Jersey</option>
              <option value="7">Football</option>
              <option value="8">Cricket</option>
              <option value="9">Laptop</option>
              <option value="10">Mobile</option>
              <option value="11">Cow</option>
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
