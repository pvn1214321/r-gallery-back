import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// MongoDB schema
const imageSchema = new mongoose.Schema({
  title: String,
  url: String,
  publicId: String,
  tags: [String]
});

const Image = mongoose.model("Image", imageSchema);

mongoose.connect(MONGO_URI)
  .then(() => console.log("😎MongoDB connected"))
  .catch(err => console.error(err));

// --- GET all images (sorted by _id descending for recent first) ---
app.get("/api/images", async (req, res) => {
  try {
    const images = await Image.find({}).sort({ _id: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => console.log(`👍Server running on port ${PORT}`));
