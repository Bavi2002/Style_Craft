import { useState } from "react";

const ProductCard = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  if (!product) {
    return <div>Loading...</div>;
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.image.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.image.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300 relative mb-7">
      <div className="relative group overflow-hidden rounded-lg">
        <button
          onClick={handlePrevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-800 to-gray-500 text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition duration-300 hover:scale-110 hover:shadow-2xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <img
          src={product.image[currentImageIndex]}
          alt={product.name}
          className="w-full h-60 sm:h-72 md:h-40 object-cover"
        />

        <button
          onClick={handleNextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-l from-gray-800 to-gray-500 text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition duration-300 hover:scale-110 hover:shadow-2xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      <div className="mt-4 text-center">
        <p className="font-bold text-lg sm:text-xl text-gray-900 truncate">
          {product.name}
        </p>

        <p className="text-gray-600 text-sm sm:text-base mt-1 leading-snug ">
          {product.description}
        </p>

        <div className="mt-3">
          <div className="flex justify-start">
            {product.discount > 0 ? (
              <div className="flex items-center space-x-2">
                <span className="text-green-600 font-semibold text-lg">
                  Rs.{" "}
                  {Math.round(
                    product.price * (1 - product.discount / 100)
                  ).toFixed(2)}
                </span>

                <span className="text-gray-500 line-through font-medium text-base">
                  Rs. {product.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-gray-800 font-semibold text-lg">
                Rs. {product.price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mt-2">
            <div
              className={`py-1 px-3 inline-block rounded-lg font-medium text-sm ${
                product.stock > 0
                  ? "bg-green-200 text-green-700"
                  : "bg-red-200 text-red-700"
              }`}
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </div>

            <div className="flex items-center space-x-1">
              <span className="text-yellow-500 text-base">⭐⭐⭐⭐</span>
              <span className="text-gray-500 text-sm">
                ({Math.floor(Math.random() * (150 - 10 + 1)) + 10})
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => alert(`${product.name} added to cart!`)}
          className="mt-6 w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 active:scale-95 transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
