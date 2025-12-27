import mongoose, { Schema } from "mongoose";

const SaleSchema = new Schema(
  {
    month: { type: String, required: true }, // "2025-01"
    units: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
  },
  { _id: false }
);

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    imageUrl: String,

    // ✅ CATEGORY
    category: { type: String, required: true },

    // ✅ SALES (IMPORTANT)
    sales: { type: [SaleSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
