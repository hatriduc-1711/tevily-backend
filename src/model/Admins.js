import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const Admin = new Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, max: 300 },
    role: { type: String },
}, { timestamps: true });
