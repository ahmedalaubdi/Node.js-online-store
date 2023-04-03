const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    icon: { type: String },
    color: { type: String },
    image: { type: String },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
// exports.Products = Products;
