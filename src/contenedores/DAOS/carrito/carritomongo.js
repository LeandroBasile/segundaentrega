import ContenedorMongo from "../../contenedorMongo.js";

//CLASS EXTENDS
class Dao_productMongo extends ContenedorMongo {
  constructor() {
    super("carts", {
      timestamp: { type: String, required: true },
      productos: { type: Array, required: true },
    });
  }
}

export default Dao_productMongo;