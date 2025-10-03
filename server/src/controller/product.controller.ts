import type { Request, Response } from "express";
import { products } from "../utils/productData";

const data: {
  id: string;
  title: string;
  img: string;
  description: string;
}[] = products;

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await new Promise<typeof data>((resolve, rejects) => {
      setTimeout(() => {
        if (data && data.length > 0) {
          resolve(data);
        } else {
          rejects("No Products Found");
        }
      }, 2000);
    });

    return res.status(200).json({
      message: "Products Fetched Successfully",
      data: products,
    });
  } catch (error) {
    return res.status(404).json({
      message: `${typeof error === "string" ? error : "Internal Server Error"}`,
    });
  }
};
