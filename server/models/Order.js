import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    itemPrice: {
      type: Float,
      required: true,
    },
    taxPrice: {
      type: Float,
      required: true,
    },
    shippingPrice: {
      type: Float,
      required: true,
    },
    totalPrice: {
      type: Float,
      required: true,
    },
    orderStatus: {
      type: String,
      default: "Processing",
    },
    paymentInfo: {
      id: {
        type: Number,
      },
      status: {
        type: String,
      },
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    shippingInfo: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      countary: { type: String, required: true },
      postalCode: { type: String, required: true },
      phone: { type: String, required: true },
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
        },
        name: { type: String, required: true },
        image: { type: String, required: true },
        quantity: { type: Float, required: true },
        image: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
