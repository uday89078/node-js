// src/App.jsx
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import ProductList from './component/ProductList';
import AddProductForm from './component/AddProductForm';

const App = () => {
  const [products, setProducts] = useState([]);

  const fetchData = () => {
    axios.get('http://localhost:1212/product')
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios.delete(`http://localhost:1212/deleteproduct/${id}`)
        .then(() => {
          alert("Product deleted successfully.");
          fetchData();
        })
        .catch((err) => console.log("Error deleting:", err));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Product Management</h2>
      <AddProductForm onProductAdded={fetchData} />
      <ProductList products={products} handleDelete={handleDelete} />
    </div>
  );
};

export default App;