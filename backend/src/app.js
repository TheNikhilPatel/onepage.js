const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

/* ---------- Middlewares ---------- */
app.use(cors()); // allow frontend to talk to backend
app.use(express.json()); // allow JSON data from requests

/* ---------- Routes ---------- */
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);


/* ---------- Test Route ---------- */
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy 🚀",
  });
});

/* ---------- Export app ---------- */
module.exports = app;
