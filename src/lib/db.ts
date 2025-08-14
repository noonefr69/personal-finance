import mongoose from "mongoose";

export default async function dbConnect() {
  const uri = process.env.MONGODB_URI;

  if (!uri) throw new Error(`There is no such as uri`);

  try {
    await mongoose.connect(uri);
    console.log("Connected MongoDB");
  } catch (error) {
    console.error(error);
  }
}
