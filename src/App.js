import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './ProductContext'; // Import the ProductProvider
import ProductList from './ProductList';

const ProductDetail = lazy(() => import('./pd')); // Lazy load the ProductDetail component

const App = () => {
  return (
    <ProductProvider>
      <Router>
        <Suspense fallback={<div className="text-center p-5">Loading...</div>}>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product" element={<ProductDetail />} />
          </Routes>
        </Suspense>
      </Router>
    </ProductProvider>
  );
};

export default App;
