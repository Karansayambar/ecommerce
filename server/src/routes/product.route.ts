import express from "express";
import { getProducts } from "../controller/product.controller";

const productRouter = express.Router();

// productRouter.post("/create-product", createProduct);
productRouter.get("/", getProducts);

export default productRouter;
