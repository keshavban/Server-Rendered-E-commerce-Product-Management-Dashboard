"use client";

import { useState } from "react";

type Props = {
  productId: string;
};

export function SellButton({ productId }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleSell() {
    const qty = Number(prompt("How many units to sell?"));

    if (!qty || qty <= 0) {
      alert("Invalid quantity");
      return;
    }

    setLoading(true);

    const res = await fetch(`/api/products/${productId}/sell`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: qty }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert(data.error);
      return;
    }

    alert(
      `Sold ${data.sold} units for ₹${data.totalAmount}`
    );

    window.location.reload();
  }

  return (
    <button
      onClick={handleSell}
      disabled={loading}
      className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 disabled:opacity-50"
    >
      {loading ? "Selling..." : "Sell"}
    </button>
  );
}
