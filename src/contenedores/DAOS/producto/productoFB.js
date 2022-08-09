import ContenedorFirebase from "../../contenedorFirebase.js";

//CLASS EXTENDS
class ProdDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("productos");
  }
}

export default ProdDaoFirebase;
