import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchProducts,
  fetchProductsByCategory,
  selectAllProducts,
  getProductsStatus,
  getProductsError,
} from "./productsSlice";
import SearchBar from "../searchbar/searchbar";

const ProductsList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const productStatus = useSelector(getProductsStatus);
  const productError = useSelector(getProductsError);

  const [searchItem, setSearchItem] = useState("");
  const [category, setCategory] = useState("");

  // Fetch all products initially
  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  // Fetch by category
  useEffect(() => {
    if (category) {
      dispatch(fetchProductsByCategory(category));
    }
  }, [category, dispatch]);

  // Filter products locally based on search
  const filteredProducts = searchItem
    ? products.filter((product) =>
        product.title.toLowerCase().includes(searchItem.toLowerCase())
      )
    : products;

  return (
    <div>
      <SearchBar setSearchItem={setSearchItem} />
      
      {/* Category buttons */}
      {!searchItem && (
        <div className="group-buttons">
          <button onClick={() => { setCategory(""); dispatch(fetchProducts()); }}>All Products</button>
          <button onClick={() => setCategory("electronics")}>Electronics</button>
          <button onClick={() => setCategory("jewelery")}>Jewelery</button>
          <button onClick={() => setCategory("men's clothing")}>Men's Clothing</button>
          <button onClick={() => setCategory("women's clothing")}>Women's Clothing</button>
        </div>
      )}

      {productStatus === "loading" && <p>Loading...</p>}
      {productError && <p>Error: {productError}</p>}

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <h2>{product.title}</h2>
              <img src={product.image} alt={product.title} />
              <h3>Price: ${product.price}</h3>
              <p>{product.category}</p>
              <Link to={`/products/${product.id}`}>
                <button>View Details</button>
              </Link>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
