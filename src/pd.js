import React, { useContext } from 'react';
import { ProductContext } from './ProductContext'; // Import the ProductContext

const ProductDetail = () => {
  const { selectedProduct } = useContext(ProductContext); // Access the selected product

  // Shimmer effect for loading state
  const renderShimmer = () => (
    <div className="animate-pulse">
      <div className="h-10 bg-gray-300 rounded mb-4"></div>
      <div className="h-6 bg-gray-300 rounded mb-2"></div>
      <div className="h-6 bg-gray-300 rounded mb-2"></div>
      <div className="h-48 bg-gray-300 rounded mb-4"></div>
    </div>
  );

  if (!selectedProduct) {
    return <div className="p-5 text-center text-gray-600">{renderShimmer()}</div>;
  }

  return (
    <div className="p-5 bg-orange-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-orange-600">Product Details</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <p className="text-lg">
          <strong>Name:</strong> {selectedProduct.name}
        </p>
        <p className="text-lg">
          <strong>Category:</strong> {selectedProduct.main_category}
        </p>
        <p className="text-lg">
          <strong>MRP:</strong> ₹{selectedProduct.mrp?.mrp || 'N/A'}
        </p>
        <img
          src={selectedProduct.images?.front || ''}
          alt={selectedProduct.name}
          className="mt-4 w-48 h-48 object-cover rounded-md"
        />

        <div className="mt-6 flex space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Add to Cart
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
