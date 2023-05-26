import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    axios.get(`/api/products?id=` + id).then((res) => {
      setProductInfo(res.data);
    });
  }, [id]);

  function goBack() {
    router.push("/products");
  }

  async function deleteProduct() {
    await axios.delete(`/api/products?id=` + id);
    goBack();
  }

  return (
    <Layout>
      <h1 className="text-center">
        {" "}
        Do you really want to delete <b>"{productInfo?.title}"</b> ?
      </h1>
      <div className="flex gap-2 justify-center">
        <button onClick={deleteProduct} className="btn-red">
          Delete
        </button>
        <button className="btn-default" onClick={goBack}>
          Cancel
        </button>
      </div>
    </Layout>
  );
}
