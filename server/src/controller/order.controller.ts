import type { Request, Response } from "express";

export const takeOrder = async (req: Request, res: Response) => {
  const { cart, userInfo, total } = req.body;
  console.log(cart, userInfo);
  try {
    if (!userInfo || !total || cart.length <= 0) {
      return res.status(400).json({
        message: "Cart and user information are required",
      });
    }

    if (!userInfo.firstName && !userInfo.lastName && !userInfo.address) {
      return res.status(404).json({
        message: "All fields (firstName, lastName, address) are required",
      });
    }

    return res.status(200).json({
      message: "Order Placed Successfully",
      order: {
        cart,
        userInfo,
        total,
        placedAt: Date.now(),
      },
    });
  } catch (error) {
    console.error("Error taking order:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
