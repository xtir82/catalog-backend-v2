import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
});

const CartModel = model("cart", userSchema);
export default CartModel;
