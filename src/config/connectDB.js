import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1/tevily_sever');
        console.log('connect success')
    } catch (e) {
        console.log('connect failed')
    }
}