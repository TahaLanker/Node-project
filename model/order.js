const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [{ productId: String, quantity: Number }],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["success", "failure"],
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("orders", schema);
