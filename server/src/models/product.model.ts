// import mongoose, { Schema } from "mongoose";

// export interface Product extends Document {
//   title: string;
//   img: string;
//   description: string;
//   price: string;
// }

// const productScheme = new Schema<Product>(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     img: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     description: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     price: {
//       type: String,
//       required: true,
//       min: 0,
//     },
//   },
//   { timestamps: true }
// );

// const Product = mongoose.model<Product>("Product", productScheme);
// export default Product;
