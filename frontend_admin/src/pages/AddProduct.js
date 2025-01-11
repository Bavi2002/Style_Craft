import { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    stock: "",
    category: "",
    images: [],
  });

  const [errors, setErrors] = useState({});
  const [previews, setPreviews] = useState([]);
  const [fileCount, setFileCount] = useState(0);

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim() || !/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = "Product name can only contain letters";
    }
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.price.trim() || isNaN(formData.price)) {
      newErrors.price = "Price must be a valid number";
    }
    if (
      isNaN(formData.discount) ||
      formData.discount < 0 ||
      formData.discount > 100
    ) {
      newErrors.discount = "Discount must be a number between 0 and 100";
    }
    if (!formData.stock.trim() || isNaN(formData.stock)) {
      newErrors.stock = "Stock must be a valid number";
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    if (formData.images.length < 2) {
      newErrors.images = "At least 2 images are required";
    }
    if (formData.images.length > 4) {
      newErrors.images = "You can upload a maximum of 4 images";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const filePreviews = files.map((file) => URL.createObjectURL(file));

    if (formData.images.length + files.length <= 4) {
      setFormData({ ...formData, images: [...formData.images, ...files] });
      setPreviews([...previews, ...filePreviews]);
      setFileCount(formData.images.length + files.length);
      setErrors((prev) => ({ ...prev, images: "" }));
    } else {
      setErrors({ ...errors, images: "Maximum of 4 images allowed" });
    }
  };

  const removeImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
    setPreviews(updatedPreviews);
    setFileCount(updatedImages.length);
    setErrors((prev) => ({ ...prev, images: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((file) =>
          formDataToSend.append("images", file)
        );
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/products/add",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        alert(response.data.message);
        setFormData({
          name: "",
          description: "",
          price: "",
          discount: "",
          stock: "",
          category: "",
          images: [],
        });
        setPreviews([]);
        setFileCount(0);
        setErrors({});
      }
    } catch (error) {
      alert("Error submitting the form. Try Again Later");
    }
  };

  return (
    <div
    className="relative min-h-screen bg-cover bg-center"
    style={{ backgroundImage: "url('/assets/images/bg3.jpg')" }}
  >
    <div className="container mx-auto w-full min-h-screen flex items-center justify-center px-5  font-lora">
      <div className="relative w-full sm:w-10/12 md:w-8/12 lg:w-6/12 bg-gray-200 bg-opacity-35 backdrop-blur-xl rounded-3xl shadow-lg p-4 sm:p-6 md:p-7 flex flex-col gap-6 border-2 border-gray-300">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wider pb-3 sm:pb-5 text-center text-blue-900">
          Add Products
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-full p-4 sm:p-6">
          <div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 items-start"
            >
              <label className="block text-sm sm:text-lg font-semibold text-gray-800">
                Product Name:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 sm:p-4 rounded-md border border-gray-300 bg-white/80 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Product Name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
  
              <label className="block text-sm sm:text-lg font-semibold text-gray-800">
                Category:
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 sm:p-4 rounded-md border border-gray-300 bg-white/80 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  --Select a Category--
                </option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
                <option value="accessories">Accessories</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category}</p>
              )}
  
              <label className="block text-sm sm:text-lg font-semibold text-gray-800">
                Price:
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-3 sm:p-4 rounded-md border border-gray-300 bg-white/80 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Price"
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price}</p>
              )}
  
              <label className="block text-sm sm:text-lg font-semibold text-gray-800">
                Discount: [%]
              </label>
              <input
                type="text"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="w-full p-3 sm:p-4 rounded-md border border-gray-300 bg-white/80 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Discount"
              />
              {errors.discount && (
                <p className="text-red-500 text-sm">{errors.discount}</p>
              )}
  
              <label className="block text-sm sm:text-lg font-semibold text-gray-800">
                Stock:
              </label>
              <input
                type="text"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full p-3 sm:p-4 rounded-md border border-gray-300 bg-white/80 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Stock"
              />
              {errors.stock && (
                <p className="text-red-500 text-sm">{errors.stock}</p>
              )}
            </form>
          </div>
  
          <div className="flex flex-col gap-4 justify-start items-start">
            <label className="block text-sm sm:text-lg font-semibold text-gray-800">
              Description:
            </label>
            <input
              name="description"
              type="text"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 sm:p-4 rounded-md border border-gray-300 bg-white/80 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
  
            <label className="block text-sm sm:text-lg font-semibold text-gray-800">
              Images:
            </label>
            <input
              type="file"
              name="images"
              accept="image/png, image/jpeg"
              multiple
              onChange={handleFileChange}
              className="mb-4"
            />
            {errors.images && (
              <p className="text-red-500 text-sm">{errors.images}</p>
            )}
  
            <p className="text-sm text-gray-800">
              {fileCount} {fileCount === 1 ? "file" : "files"} selected
            </p>
  
            <button
              onClick={handleSubmit}
              className="w-full mt-6 bg-blue-600 text-white py-3 sm:py-4 rounded-md hover:bg-blue-700 transition-all duration-300"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 justify-center p-4 sm:p-8">
        {previews.map((preview, index) => (
          <div key={index} className="relative group">
            <img
              src={preview}
              alt="Preview"
              className="w-32 sm:w-44 h-32 sm:h-44 object-cover rounded-xl border-2 border-gray-300 shadow-lg transition-transform duration-300 transform group-hover:scale-110 bg-white"
            />
            <button
              type="button"
              className="absolute top-0 opacity-0 group-hover:opacity-100 right-0 bg-gradient-to-r from-red-500 to-red-700 text-white w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center rounded-full text-base sm:text-lg mt-1 sm:mt-2 mr-1 sm:mr-2 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:rotate-12 focus:ring-4 focus:ring-red-300 focus:outline-none"
              onClick={() => removeImage(index)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
  
  );
};

export default AddProduct;
