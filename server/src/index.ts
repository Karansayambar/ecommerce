import express from "express";
import type { Request, Response } from "express";
import productRouter from "./routes/product.route";
import cors from "cors";
import orderRouter from "./routes/order.route";

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "https://ecommerce-five-sable-91.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("E-commerce backend running");
});

app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
