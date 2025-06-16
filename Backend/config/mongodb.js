import mongoose from 'mongoose';

const connectDB = async ()=>{
    await mongoose.connect(`${process.env.MONGODB_URI}forever`);
}

export default connectDB;

// mehraroshan1802 aHGq2UdCBR7y79hS


