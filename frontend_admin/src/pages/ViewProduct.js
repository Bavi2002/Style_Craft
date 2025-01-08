import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const AdminProductTable = () => {
  const [product, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
        setFilteredProducts(response.data);

        const uniqueCategories = [
          ...new Set(response.data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFillColor(240, 248, 255);
    doc.rect(
      0,
      0,
      doc.internal.pageSize.width,
      doc.internal.pageSize.height,
      "F"
    );

    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(0, 102, 204);
    doc.text("Style Craft Admin Panel", 105, 20, { align: "center" });

    doc.setFont("helvetica", "italic");
    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100);
    doc.text("Managing Customizable Clothing Store Operations", 105, 28, {
      align: "center",
    });

    doc.setDrawColor(0, 102, 204);
    doc.setLineWidth(0.5);
    doc.line(10, 35, 200, 35);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text("Product Inventory", 105, 45, { align: "center" });

    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(10, 50, 190, 230, 5, 5, "FD");

    const tableRows = filteredProducts.map((product, index) => [
      index + 1,
      product.name,
      `Rs.${product.price.toFixed(2)}`,
      product.description,
      product.stock,
      product.category,
      `${product.discount}%`,
    ]);

    doc.autoTable({
      startY: 60,
      head: [
        ["#", "Name", "Price", "Description", "Stock", "Category", "Discount"],
      ],
      body: tableRows,
      theme: "striped",
      headStyles: {
        fillColor: [0, 123, 255],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 12,
      },
      bodyStyles: {
        fontSize: 11,
        textColor: [50, 50, 50],
      },
      alternateRowStyles: {
        fillColor: [230, 240, 250],
      },
      margin: { top: 60, left: 15, right: 15 },
    });

    const pageHeight = doc.internal.pageSize.height;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("© 2025 Style Craft. All rights reserved.", 105, pageHeight - 10, {
      align: "center",
    });

    doc.save("products.pdf");
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterProducts(term, selectedCategory);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    filterProducts(searchTerm, category);
  };

  console.log("pro:", product);

  const filterProducts = (search, category) => {
    let filtered = product;

    if (search) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search)
      );
    }

    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="ml-60 p-8 bg-gray-100 min-h-screen">
      <h1 className="text-5xl font-extrabold font-lora text-blue-950 mb-8">
        Admin Product Table
      </h1>

      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearch}
            className="border-2 border-blue-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-auto"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.5 6.5v4.586a1 1 0 01-.293.707l-3 3A1 1 0 0110 20v-5.586l-6.5-6.5A1 1 0 013 6V4z"
            />
          </svg>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border-2 border-blue-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-auto"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={exportToPDF}
          className="ml-auto bg-gradient-to-r from-[#800000] to-[#910303] text-white px-6 py-3 rounded-lg shadow-md hover:from-[#4B0000] hover:to-[#800000] transition-transform transform hover:scale-105"
        >
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 2v6h6M16 13h-4m0 0H8m4 0v4m0-4V9"
              />
            </svg>
            Export PDF
          </div>
        </button>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border p-4 text-left">Name</th>
              <th className="border p-4 text-left">Price</th>
              <th className="border p-4 text-left">Description</th>
              <th className="border p-4 text-left">Stock</th>
              <th className="border p-4 text-left">Discount</th>
              <th className="border p-4 text-left">Image</th>
              <th className="border p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-8 text-center">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent border-dashed rounded-full animate-spin"></div>
                    <p className="text-lg font-medium text-gray-600">
                      Loading products...
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-blue-50 transition-colors"
                >
                  <td className="border p-4">{product.name}</td>
                  <td className="border p-4 text-blue-600 font-semibold">
                    Rs. {product.price}
                  </td>
                  <td className="border p-4">{product.description}</td>
                  <td className="border p-4">{product.stock}</td>
                  <td className="border p-4 text-green-600 font-semibold">
                    {product.discount}%
                  </td>
                  <td className="border p-4">
                    <div className="flex gap-2">
                      {product.image.map((imgUrl, index) => (
                        <img
                          key={index}
                          src={imgUrl}
                          alt="Product"
                          className="w-24 h-20 object-cover rounded-lg shadow-md"
                        />
                      ))}
                    </div>
                  </td>
                  <td className="border p-4">
                    <button
                      onClick={() => alert(`Edit product: ${product._id}`)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-105 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => alert(`Delete product: ${product._id}`)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductTable;
