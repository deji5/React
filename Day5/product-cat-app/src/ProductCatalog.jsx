import React, { useState } from "react";

const ProductCatalog = () => {
  const products = [
    { name: "Laptop", price: 450000, inStock: true, category: "Electronics" },
    { name: "Phone", price: 150000, inStock: false, category: "Electronics" },
    { name: "Jollof Rice", price: 1500, inStock: true, category: "Food" },
    { name: "T-shirt", price: 3500, inStock: true, category: "Clothing" },
    { name: "Headphones", price: 12000, inStock: false, category: "Electronics" },
    { name: "Bread", price: 800, inStock: true, category: "Food" },
  ];

  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");

  const filteredProducts = products
    .filter((p) => filter === "All" || p.category === filter)
    .sort((a, b) => {
      if (sortOrder === "low-high") return a.price - b.price;
      if (sortOrder === "high-low") return b.price - a.price;
      return 0;
    });

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", fontFamily: "Arial" }}>
      <h2>Product Catalog</h2>

      <div style={{ marginBottom: "10px" }}>
        <strong>Filter:</strong>{" "}
        {["All", "Electronics", "Clothing", "Food"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              margin: "3px",
              padding: "5px 10px",
              background: filter === cat ? "#007bff" : "#ddd",
              color: filter === cat ? "white" : "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: "15px" }}>
        <strong>Sort by Price:</strong>{" "}
        <select
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
          style={{ padding: "5px", borderRadius: "5px" }}
        >
          <option value="none">None</option>
          <option value="low-high">Low to High</option>
          <option value="high-low">High to Low</option>
        </select>
      </div>

      {filteredProducts.length > 0 ? (
        filteredProducts.map((product, index) => (
            <div
                key={index}
                style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "10px",
                background: product.inStock ? "#e9f9e9" : "#fce8e8",
                }}
            >
                <h4 style={{ margin: "5px 0" }}>{product.name}</h4>
                <p style={{ margin: "3px 0" }}>
                ₦{product.price.toLocaleString()} -{" "}
                <em>{product.category}</em>
                </p>
                {product.inStock ? (
                <button
                    style={{
                    background: "#28a745",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    }}
                >
                    Add to Cart
                </button>
                ) : (
                <span style={{ color: "red", fontWeight: "bold" }}>OUT OF STOCK</span>
                )}
            </div>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ProductCatalog
