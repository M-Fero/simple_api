const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model("Item", ItemSchema);
