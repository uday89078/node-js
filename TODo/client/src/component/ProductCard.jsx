// import React from 'react';

// const ProductCard = ({ product }) => {
//   return (
//     <div className="col-md-4 mb-4">
//       <div className="card h-100">
//         <img src={product.image} className="card-img-top" alt={product.title} style={{ height: '300px', objectFit: 'contain' }} />
//         <div className="card-body d-flex flex-column">
//           <h5 className="card-title">{product.title}</h5>
//           <p className="card-text text-truncate">{product.description}</p>
//           <p className="card-text"><strong>Price:</strong> ${product.price}</p>
//           <p className="card-text">
//             {/* <strong>Rating:</strong> {product.rating.rate} ⭐ ({product.rating.count} reviews) */}
//           </p>
//           <button className="btn btn-primary mt-auto">Buy Now</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

// src/component/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product, handleDelete }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img src={product.image} className="card-img-top" alt={product.title} style={{ height: '300px', objectFit: 'contain' }} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text text-truncate">{product.description}</p>
          <p className="card-text"><strong>Price:</strong> ₹{product.price}</p>

          <div className="mt-auto d-flex justify-content-between">
            {/* <button className="btn btn-primary">Buy Now</button> */}
            <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;