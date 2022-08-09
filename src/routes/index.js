import dotenv from "dotenv";
dotenv.config();

import { Router } from "express";
const router = Router();
import { Dao_product, Dao_cart } from "../contenedores/DAOS/index.js";

// Product routes

router.get("/productos", async (req, res) => {
  const response = await Dao_product.getAll();

  res.json(response);
});

router.get("/productos/:id", async (req, res) => {
  const response = await Dao_product.getById(req.params.id);

  res.json(response);
});

router.delete("/productos/:id", async (req, res) => {
  const response = await Dao_product.deleteById(req.params.id);

  res.json(response);
});

router.put("/productos/:id", async (req, res) => {
  const response = await Dao_product.update(req.params.id, req.body);

  res.json(response);
});

router.post("/productos", async (req, res) => {
  const response = await Dao_product.add(req.body);

  res.json(response);
});

// Cart routes

router.get("/carrito", async (req, res) => {
  const response = await Dao_cart.getAll();

  res.json(response);
});

router.get("/carrito/:id", async (req, res) => {
  const response = await Dao_cart.getById(req.params.id);

  res.json(response);
});

router.delete("/carrito/:id", async (req, res) => {
  const response = await Dao_cart.deleteById(req.params.id);

  res.json(response);
});

router.put("/carrito/:id", async (req, res) => {
  const response = await Dao_cart.update(req.params.id, req.body);

  res.json(response);
});

router.put("/carrito/:idCart/producto", async (req, res) => {
  let prod = await Dao_product.getById(req.body.idProd);

  let response = await Dao_cart.guardarEnCarrito(req.params.idCart, prod);

  res.json(response);
});

router.post("/carrito", async (req, res) => {
  const response = await Dao_cart.crearCarrito();

  res.json(response);
});

router.delete("/carrito/:idCart/producto/:idProd", async (req, res) => {
  let resultado = await Dao_cart.borrarDelCarrito(
    req.params.idCart,
    req.params.idProd
  );
  console.log("Resultado: ", resultado);
  res.sendStatus(200);
});

export default router;
