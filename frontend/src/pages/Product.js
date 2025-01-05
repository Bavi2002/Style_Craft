import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div  className="relative min-h-screen bg-cover bg-center"
    style={{ backgroundImage: "url('/assets/images/bg4.jpg')" }}>
    <div className="p-5 font-lora  min-h-screen lg:pt-32 pt-44">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl text-center font-bold text-blue-900">
        Our Products
      </h1>
      <p className="text-center text-gray-700 mt-4 text-lg">
        Discover our exclusive collection of high-quality products.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 pt-12 p-8">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center">
            <div className="flex flex-col items-center space-y-4">
              {/* Loading Animation */}
              <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent border-dashed rounded-full animate-spin"></div>
              <p className="text-lg font-medium text-gray-600">
                Loading products...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Product;
