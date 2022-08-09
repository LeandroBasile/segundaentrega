import mongoose from "mongoose";

const mongoConnect = async () => {
  try {
    const URL = "mongodb://127.0.0.1:27017/ecomerce";
    // const URL =  "mongodb://0.0.0.0:27017/ecomerce"

    await mongoose.connect(URL);
    console.log("Conectado a la base de datos..");
  } catch (e) {
    console.log("**", e);
  }
};

// mongoConnect()

export { mongoConnect };
