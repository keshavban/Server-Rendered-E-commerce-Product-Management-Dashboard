import { Schema, models, model } from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

const Product =
  models.Product || model<IProduct>("Product", ProductSchema);

export default Product;
