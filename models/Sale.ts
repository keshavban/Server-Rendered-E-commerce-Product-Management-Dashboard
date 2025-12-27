import { Schema, model, models } from "mongoose";

const SaleSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

export default models.Sale || model("Sale", SaleSchema);
