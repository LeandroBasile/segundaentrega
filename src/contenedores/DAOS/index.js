import dotenv from "dotenv";
dotenv.config();

let Dao_product;
let Dao_cart;

switch (process.env.DATABASE || "mongo") {
  case "firebase":
    const { default: ProdDaoFirebase } = await import(
      "./producto/productoFB.js"
    );
    const { default: DaoCartFb } = await import("./carrito/carritoFB.js");

    Dao_product = new ProdDaoFirebase();
    Dao_cart = new DaoCartFb();

    break;
  case "mongo":
    const { default: Dao_productMongo } = await import(
      "./producto/productomongo.js"
    );
    const { default: Dao_cartMongo } = await import(
      "./carrito/carritomongo.js"
    );

    Dao_product = new Dao_productMongo();
    Dao_cart = new Dao_cartMongo();

    break;
}

export { Dao_product, Dao_cart };
