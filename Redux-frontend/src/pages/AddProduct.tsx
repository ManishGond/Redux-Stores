import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: ""
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        "/products",
        {
          name: form.name,
          description: form.description,
          price: parseFloat(form.price),
          imageUrl: form.imageUrl
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert("✅ Product added successfully!");
      navigate("/");
    } catch (error: any) {
      alert(error.response?.data?.error || "❌ Failed to add product");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Product Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Description <small>({form.description.length}/1000)</small></label>
          <textarea
            className="form-control"
            name="description"
            value={form.description}
            onChange={handleChange}
            maxLength={1000}
            rows={5}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Price (₹)</label>
          <input
            className="form-control"
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-4">
          <label>Image URL</label>
          <input
            className="form-control"
            type="text"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-success" type="submit">
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
