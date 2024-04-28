import mongoose from "mongoose";

const connection = {};

export const connectDB = async function () {
  try {
    if (connection.isConnected) {
      console.log("Using existing connection");
      return;
    }
    const db = await mongoose.connect(process.env.MONGODB_URI);
    connection.isConnected = db.connections[0].readyState;
    console.log("Connected");
  } catch (error) {
    console.log(error);
    throw new Error("Problem in connection!");
  }
};
