import express from "express";
import { takeOrder } from "../controller/order.controller";

const orderRouter = express.Router();

orderRouter.post("/take-order", takeOrder);

export default orderRouter;
