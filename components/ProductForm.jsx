import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function ProductForm({ productInfo }) {
  const router = useRouter();
  const [title, setTitle] = useState(productInfo?.title || "");
  const [description, setDescription] = useState(productInfo?.description || "");
  const [price, setPrice] = useState(productInfo?.price || "");
  const [goToProducts, setGoToProducts] = useState(false);

  const saveProduct = async (e) => {
    e.preventDefault();
    const data = { title, description, price };
    if (productInfo._id) {
        // update existing product
        await axios.put(`/api/products`, { ...data, _id: productInfo._id });
    } else {
        // create new product
        await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  };

  if (goToProducts) {
    router.push("/products");
  }

  return (
    <form onSubmit={saveProduct}>
      <label>Product Name</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="product name"
      />
      <label htmlFor="">Product Image</label>
      <label htmlFor="">Product Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="description"
      />
      <label htmlFor="">Product Price (USD)</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="price"
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
