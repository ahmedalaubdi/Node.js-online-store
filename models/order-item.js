const mongoose = require("mongoose");

const orderItemSchema = mongoose.Schema(
  {
    quantity: {
      type: Number,
      require: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("OtderItem", orderItemSchema);
