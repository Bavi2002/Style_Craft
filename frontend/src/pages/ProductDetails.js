import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ProductDetail = ({ user }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data.product);
        setMainImage(data.product.image ? data.product.image[0] : "");
      } catch (error) {
        toast.error("Something went wrong while fetching product details.");
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="spinner">Loading...</div>; // Add a spinner here
  }

  if (!product) {
    return <div className="p-24">Product not found.</div>;
  }

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }

    if (!product) {
      toast.error("Product details are not available.");
      return;
    }

    const token = localStorage.getItem("jwtToken");

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/cart/addcart",
        {
          productId: product._id,
          quantity: 1,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.message === "Item already added to cart") {
        toast.info("Item already added to cart.");
      } else {
        toast.success("Product added to cart!");
      }
    } catch (error) {
      toast.error("Error adding product to cart. Please try again.");
    }
  };

  return (
    <div className="p-24">
      <h1>{product?.name || "Product Name Unavailable"}</h1>
      <p>{product?.description || "No description available"}</p>
      <p>Price: ${product?.price || "Not available"}</p>
      <p>Stock: {product?.stock || "Not available"}</p>
      <p>Category: {product?.category || "Not available"}</p>

      <div className="mb-4">
        {mainImage ? (
          <img
            src={mainImage}
            alt={product?.name || "Product"}
            className="w-full sm:h-72 md:h-96 lg:h-128 object-cover mb-4 border border-gray-300"
          />
        ) : (
          <div className="w-full sm:h-72 bg-gray-200 flex items-center justify-center">
            <img src="/path/to/placeholder.png" alt="No Image Available" className="w-32 h-32" />
          </div>
        )}
      </div>

      <div className="flex gap-2">
        {product?.image?.length > 0 ? (
          product.image.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className={`w-20 h-20 object-cover cursor-pointer border ${
                mainImage === img ? "border-blue-500" : "border-gray-300"
              }`}
              onClick={() => setMainImage(img)}
            />
          ))
        ) : (
          <div>No additional images available</div>
        )}
      </div>

      <button
        onClick={handleAddToCart}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
