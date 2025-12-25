import mongoose, { Schema, models } from "mongoose";

const AdminSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["SUPER_ADMIN", "ADMIN"],
      default: "ADMIN",
    },
  },
  {
    timestamps: true,
  }
);

const Admin = models.Admin || mongoose.model("Admin", AdminSchema);

export default Admin;
