const express = require("express");
const connectToDB = require("./utils/db");
const userRouter = require("./Routes/user.routes");
const NotesRouter = require("./Routes/notes.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");  // ✅ added
require("dotenv").config();

const port = process.env.PORT || 3000;
const app = express();

// ✅ CORS setup
app.use(cors({
  origin: "http://localhost:5173", // frontend ka origin
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/notes", NotesRouter);

app.listen(port, async () => {
  try {
    await connectToDB();
    console.log(`🚀 Server is running on port number ${port}`);
  } catch (err) {
    console.log("❌ Something went wrong in server", err);
  }
});
