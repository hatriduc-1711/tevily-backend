import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);

const Schema = mongoose.Schema;

export const Destination = new Schema(
  {
    name: { type: String, required: true },
    subtitle: { type: String },
    image: { type: String, max: 300 },
    languages: { type: String, max: 300 },
    area: { type: String, max: 300 },
    column: { type: Boolean },
    column1: { type: Boolean },
    column4: { type: Boolean },
    column2: { type: Boolean },
    tours: { type: Array },
    tourNumber: { type: Number },
    slug: { type: String, slug: "name", unique: true },
  },
  { timestamps: true }
);
