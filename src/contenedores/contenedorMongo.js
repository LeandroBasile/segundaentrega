import mongoose from "mongoose";
import { mongoConnect } from "../config/mongoconect.js";

mongoConnect();

// await mongoose.connect('mongodb://localhost:27017/mibasedos')

class ContenedorMongo {
  constructor(nombreColeccion, schema) {
    this.collection = mongoose.model(nombreColeccion, schema);
  }

  /* METODO GET BY ID */

  async getById(id) {
    try {
      const doc = await this.collection.findById(id, { __v: 0 });
      return doc;
    } catch (e) {
      return "no se ha podido encontrar";
    }
  }

  /* METODO GETALL */

  async getAll() {
    const docs = await this.collection.find({}, { __v: 0 });
    return docs;
  }

  /* METODO DELETE BY ID */

  async deleteById(id) {
    try {
      await this.collection.deleteOne({ _id: id });

      return "Producto eliminado";
    } catch (e) {
      console.log("No se ha podido eliminar", e);
    }
  }

  /* METODO UPDATE */

  async update(id, product) {
    try {
      await this.collection.updateOne({ _id: id }, product);

      return "Producto actualizado";
    } catch (e) {
      console.log("No se ha podido actualizar", e);
    }
  }

  /* METODO ADD */

  async add(objeto) {
    try {
      objeto.timestamp = new Date().toLocaleString("fr-FR");
      const nuevoElemento = new this.collection(objeto);
      let nuevoElementoGuardado = await nuevoElemento.save();
      console.log("ok");
      return nuevoElementoGuardado;
    } catch (e) {
      return "los datos no son correctos";
    }
  }

  /* METODO CREARCARRITO */


  async crearCarrito() {
    const nuevoCarrito = { timestamp: "", productos: [] };
    let resultado = await this.add(nuevoCarrito);
    return resultado.id;
  }

  /* METODO GUARDARENCARRITO */

  async guardarEnCarrito(idCart, idProd) {
    let resultado;
    let tempCart = await this.getById(idCart);

    console.log(tempCart);
    if (tempCart) {
      tempCart.productos.push(idProd);
      await this.update(idCart, tempCart);
      resultado = "Producto agregado en carrito correctamente";
    } else {
      resultado = "El id de carrito no existe";
    }
    return resultado;
  }

  /* METODO BORRARDELCARRITO */

  async borrarDelCarrito(idCart, idProduct) {
    let resultado;
    let tempCart = await this.getById(idCart);
    if (tempCart) {
      let arrNewProd = tempCart.productos.filter((e) => {
        return e._id != idProduct;
      });

      await tempCart.update({ productos: arrNewProd });

      return tempCart;
    } else {
      resultado = "El carrito no existe";
    }
    return resultado;
  }
}

export default ContenedorMongo;
