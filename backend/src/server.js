const dotenv = require("dotenv");
const app = require("./app");
const connectDB = require("./config/db");

/* ---------- Load environment variables ---------- */
dotenv.config();

/* ---------- Connect DB ---------- */
connectDB();

/* ---------- Define PORT ---------- */
const PORT = process.env.PORT || 5000;

/* ---------- Start server ---------- */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
