import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function ProductForm({ productInfo }) {
  const router = useRouter();
  const [title, setTitle] = useState(productInfo?.title || "");
  const [description, setDescription] = useState(
    productInfo?.description || ""
  );
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

  async function uploadImages(e) {
    const files = e.target?.files;
    if (files?.length > 0) {
      const data = new FormData();

      for (const file of files) {
        data.append("images", file);
      }
      
      await axios.post("/api/upload", data).then((res) => {
        console.log(res.data);
      });
    }
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
      <div className="mb-2">
        <label className="w-24 h-24 flex flex-col items-center text-center text-gray-500 justify-center rounded-lg bg-gray-200 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Upload Image</div>
          <input
            type="file"
            accept="image/*"
            onChange={uploadImages}
            className="hidden"
          />
        </label>
        {productInfo?.image && <div>No images for this Product </div>}
      </div>
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
