import admin from "firebase-admin";
// import { Collection } from "mongoose";

// var serviceAccount = require("path/to/serviceAccountKey.json");

import serviceAccount from "../../llave.json" assert { type: "json" };

let app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = app.firestore();

// console.log(db);

class ContenedorFB {
  constructor(nombreColeccion) {
    this.nombreColeccion = db.collection(nombreColeccion);
  }

  /* METODO GET BY ID */

  async getById(id) {
    const doc = await this.nombreColeccion.doc(id).get();
    const data = doc.data();
    return { ...data, id };
  }

  /* METODO GETALL */

  async getAll() {
    const docs = await this.nombreColeccion;
    const snapshot = await docs.get();
    let arrayProductos = [];
    snapshot.forEach((doc) => {
      let data = doc.data();
      let id = doc.id;
      arrayProductos.push({ ...data, id });
    });
    return arrayProductos;
  }

  /* METODO DELETE BY ID */

  async deleteById(id) {
    await this.nombreColeccion.doc(id).delete();
    let resultado = "OK";
    return resultado;
  }

  /* METODO UPDATE */

  async update(id, product) {
    let resultado = "";
    resultado = await this.nombreColeccion.doc(id).update(product);
    resultado = "OK";
    return resultado;
  }

  /* METODO ADD */

  async add(objeto) {
    objeto.timestamp = new Date().toLocaleString("fr-FR");
    // delete objeto.administrador;
    const newElement = this.nombreColeccion.doc();
    await newElement.create(objeto);
    return;
  }

  /* METODO CREAR CARRITO */

  async crearCarrito() {
    const nuevoCarrito = { timestamp: "", productos: [] };
    nuevoCarrito.timestamp = new Date().toLocaleString("fr-FR");
    let resultado = await this.nombreColeccion.add(nuevoCarrito);
    return resultado.id;
  }

  /* METODO GUARDARPRODUCTOENCARRITO */

  async guardarEnCarrito(idCart, elemento) {
    await this.nombreColeccion.doc(idCart).update({
      productos: admin.firestore.FieldValue.arrayUnion(elemento),
    });
    let resultado = "OK";
    return resultado;
  }

  /* METODO BORRARPRODUCTODELCARRITO */

  async borrarDelCarrito(idCart, idProd) {
    let resultado;
    await db.runTransaction(async (t) => {
      const doc = await t.get(this.nombreColeccion.doc(idCart));
      let arrayProductos = [];
      arrayProductos = doc.data().productos;
      const indiceEncontrado = arrayProductos.findIndex((producto) => {
        return producto.id === idProd;
      });
      if (indiceEncontrado >= 0) {
        arrayProductos.splice(indiceEncontrado, 1);
        t.update(this.nombreColeccion.doc(idCart), {
          productos: arrayProductos,
        });
        resultado = `Producto con ID ${idProd}, eliminado correctamente del cart con ID ${idCart}`;
      } else {
        resultado = "El carrito es correcto pero el producto no existe";
      }
    });
    return resultado;
  }
}

export default ContenedorFB;
