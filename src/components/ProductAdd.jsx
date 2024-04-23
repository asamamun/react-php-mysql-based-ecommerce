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
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="category_id" value={formData.category_id} onChange={handleChange} placeholder="Category ID" />
        <input type="text" name="subcategory_id" value={formData.subcategory_id} onChange={handleChange} placeholder="Subcategory ID" />
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
        <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
        <input type="text" name="sku" value={formData.sku} onChange={handleChange} placeholder="SKU" />
        <input type="file" name="images" onChange={handleChange} />
        <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
        <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" />
        <input type="text" name="discount" value={formData.discount} onChange={handleChange} placeholder="Discount" />
        <input type="text" name="hot" value={formData.hot} onChange={handleChange} placeholder="Hot" />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductAdd;
