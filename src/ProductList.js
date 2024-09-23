import React, { useState, useEffect, useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { TextField, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from './ProductContext'; // Import the ProductContext

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalResults, setTotalResults] = useState(0);
  const [search, setSearch] = useState('');

  const { setSelectedProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  // Fetch data from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products?page=${page}&limit=${pageSize}`
        );
        const data = response.data;
        setProducts(data.products);
        setTotalResults(data.totalResults);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, pageSize]);

  // Handle row click for navigation to Product Details
  const handleRowClick = (params) => {
    const product = params.row;
    setSelectedProduct(product);
    navigate(`/product`);
  };

  const filteredProducts = products.filter(
    (product) => product.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { field: 'name', headerName: 'Name', width: 300 },
    {
      field: 'image',
      headerName: 'Image',
      width: 150,
      renderCell: (params) => (
        <img src={params.row.images?.front || ''} alt={params.row.name} width="60" />
      )
    },
    {
      field: 'mrp',
      headerName: 'MRP',
      width: 120,
      valueGetter: (params) =>"₹"+params.mrp || 'N/A',
    }
  ];

  const getRowId = (row) => row.id || row.sku_code || row.name;

  return (
    <div className="p-5 bg-orange-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-orange-600">Product List</h1>
      <TextField
        label="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
        variant="outlined"
        fullWidth
      />

      <div className="bg-white rounded-lg shadow-md">
        {loading ? (
          <ShimmerEffect />
        ) : (
          <DataGrid
            rows={filteredProducts}
            columns={columns}
            pageSize={pageSize}
            pagination
            rowCount={totalResults}
            paginationMode="server"
            onPageChange={(newPage) => setPage(newPage + 1)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onRowClick={handleRowClick}
            disableSelectionOnClick
            getRowId={getRowId}
            className="text-sm"
          />
        )}
      </div>
    </div>
  );
};

// Shimmer loading component
const ShimmerEffect = () => {
  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
      <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
      <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
      <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
      <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
    </div>
  );
};

export default ProductList;
