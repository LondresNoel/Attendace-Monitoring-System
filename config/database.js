import mongoose from "mongoose";

// function para mag connect ha MongoDB
const connectDB = async () => {
  try {
    // pag connect gamit an MONGODB_URI tikang ha .env
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    // kon successful an connection
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // kon may error ha pag connect
    console.error(`Error: ${error.message}`);
    process.exit(1); // pag stop han app
  }
};

export default connectDB;
