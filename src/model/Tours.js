import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);

const Schema = mongoose.Schema;

export const Tour = new Schema(
  {
    title: { type: String, required: true },
    price: { type: String, required: true },
    address: { type: String, required: true },
    image: { type: String, max: 300 },
    duration: { type: String, required: true },
    destination: { type: String, required: true },
    activityType: { type: String },
    scores: { type: Number },
    slug: { type: String, slug: "title", unique: true },
  },
  { timestamps: true }
);
