import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    image: '',
    description: ''  
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:1212/addproduct', formData)
      .then((res) => {
        console.log('Product Added:', res.data);
        onProductAdded();
        setFormData({
          title: '',
          price: '',
          category: '',
          image: '',
          description: ''
        });
      })
      .catch((err) => {
        console.error('Error adding product:', err);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input type="text" className="form-control mb-2" name="title" placeholder="Product Title"
        value={formData.title} onChange={handleChange} required />

      <input type="number" className="form-control mb-2" name="price" placeholder="Price"
        value={formData.price} onChange={handleChange} required />

      <input type="text" className="form-control mb-2" name="category" placeholder="Category"
        value={formData.category} onChange={handleChange} required />

      <input type="text" className="form-control mb-2" name="image" placeholder="Image URL"
        value={formData.image} onChange={handleChange} required />

      <textarea className="form-control mb-2" name="description" placeholder="Description"
        value={formData.description} onChange={handleChange} rows="3" required></textarea>

      <button type="submit" className="btn btn-success">Add Product</button>
    </form>
  );
};

export default AddProductForm;