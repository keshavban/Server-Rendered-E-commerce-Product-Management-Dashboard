"use client";

import { useState } from "react";

type Props = {
  productId: string;
  className?: string; // ✅ allow styling from parent
};

export function SellButton({ productId, className = "" }: Props) {
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

    alert(`Sold ${data.sold} units for ₹${data.totalAmount}`);
    window.location.reload();
  }

  return (
    <button
      onClick={handleSell}
      disabled={loading}
        
    style={{
      padding: "6px 14px",
      fontSize: "14px",
      color: "#ffffff",
      background: "#059669",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
    }}
  >
      {loading ? "Selling..." : "Sell"}
    </button>
  );
}
