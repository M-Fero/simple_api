require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Item = require("./models/Item");

const app = express();
app.use(cors());
app.use(express.json());

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// POST API
app.post("/api/items", async (req, res) => {
  try {
    const { type, id } = req.body;

    if (!type || !id) {
      return res.status(400).json({ message: "type and id required" });
    }

    const item = await Item.create({ type, id });

    res.status(201).json(item);

  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "ID must be unique" });
    }
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
