import mongoose from "mongoose";

import { MONGODB_URL } from "../../config";

if (!MONGODB_URL) {
  throw new Error("URL de conección no se encontró.");
}
export const conectar = async () => {
  try {
    const { connection } = await mongoose.connect(MONGODB_URL as string);
    if (connection.readyState === 1) {
      console.log("Mongodb conectada");
      return Promise.resolve(true);
    }
    return Promise.reject(false);
  } catch (error) {
    console.log(error);
    return Promise.reject(false);
  }
}