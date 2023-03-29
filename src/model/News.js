import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const News = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, max: 300 },
    slug: { type: String, max: 300 },
  },
  { timestamps: true }
);
