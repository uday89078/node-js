// import React from 'react';
// import ProductCard from './ProductCard';

// const ProductList = ({ products }) => {
//   return (
//     <div className="container mt-4">
//       <div className="row">
//         {products.map(product => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductList;

// src/component/ProductList.jsx
import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, handleDelete }) => {
  return (
    <div className="row">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

export default ProductList;