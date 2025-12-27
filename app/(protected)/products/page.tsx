"use client";



import { useEffect, useState } from "react";

import Link from "next/link";

import { SellButton } from "@/components/SellButton";



type Product = {

  _id: string;

  name: string;

  description: string;

  price: number;

  stock: number;

  imageUrl?: string;
  category: string;

};



export default function ProductsPage() {

  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
const [search, setSearch] = useState("");
const [category, setCategory] = useState("");

const filteredProducts = products.filter((p) => {
  const matchesName = p.name
    .toLowerCase()
    .includes(search.toLowerCase());
  const matchesCategory =
    category === "" || p.category === category;
  return matchesName && matchesCategory;
});

  /* =========================

     FETCH PRODUCTS

  ========================= */

  useEffect(() => {

    async function fetchProducts() {

      const res = await fetch("/api/products", { cache: "no-store" });

      const data: Product[] = await res.json();

      setProducts(data);

      setLoading(false);

    }

    fetchProducts();

  }, []);



  /* =========================

     DELETE PRODUCT

  ========================= */

  async function handleDelete(id: string) {
  if (!confirm("Delete this product?")) return;

  const res = await fetch(`/api/products?id=${id}`, {
    method: "DELETE",
    credentials: "include", // 🔥 REQUIRED
  });

  if (!res.ok) {
    alert("Delete failed (unauthorized or server error)");
    return;
  }

  setProducts((prev) => prev.filter((p) => p._id !== id));
}



  if (loading) return <p className="text-gray-400">Loading...</p>;



  return (

    <div className="space-y-6 text-gray-100">

      {/* HEADER */}

      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold">Products</h1>

        <Link

          href="/products/new"

          className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg"

        >

          + Add Product

        </Link>

      </div>
<div className="flex gap-4">
  <input
    placeholder="Search product..."
    className="bg-slate-800 px-4 py-2 rounded"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <select
    className="bg-slate-800 px-4 py-2 rounded"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  >
    <option value="">All Categories</option>
    <option value="Books">Books</option>
    <option value="Clothing">Clothing</option>
    <option value="Electronics">Electronics</option>
    <option value="Other">Other</option>
  </select>
</div>


      {/* GRID */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {filteredProducts.map((product) => (

          <div

            key={product._id}

            className="bg-slate-800 rounded-xl shadow-lg p-4 flex flex-col"

          >

            {/* IMAGE THUMBNAIL */}

            {product.imageUrl && (

              <button

                onClick={() => setPreviewImage(product.imageUrl!)}

                className="w-full h-40 flex items-center justify-center bg-slate-900 rounded-md overflow-hidden"

              >

                <img

                  src={product.imageUrl}

                  alt={product.name}

                  className="h-full object-contain"

                />

              </button>

            )}



            <h2 className="mt-4 text-lg font-semibold">{product.name}</h2>



            <p className="text-sm text-gray-400 mt-1 line-clamp-2">

              {product.description}

            </p>



            <div className="flex justify-between items-center mt-4 text-sm">

              <span className="font-bold">₹{product.price}</span>

              <span className="text-gray-400">Stock: {product.stock}</span>

            </div>



            {/* ACTIONS */}

            <div className="flex gap-2 mt-4">

              <Link

                href={`/products/edit/${product._id}`}

                className="flex-1 text-center border border-gray-600 rounded py-2 hover:bg-slate-700"

              >

                Edit

              </Link>



              <SellButton productId={product._id} />



              <button

                onClick={() => handleDelete(product._id)}

                className="flex-1 border border-red-500 text-red-400 rounded py-2 hover:bg-red-500 hover:text-white"

              >

                Delete

              </button>

            </div>

          </div>

        ))}

      </div>



      {/* IMAGE MODAL */}

      {previewImage && (

        <div

          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"

          onClick={() => setPreviewImage(null)}

        >

          <img

            src={previewImage}

            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl"

          />

        </div>

      )}

    </div>

  );

}