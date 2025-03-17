const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db"); // Import connectDB
const authRoutes = require("./routes/userAuthentication"); // Import authRoutes")
const coursesRoute = require("./routes/coursesRoute");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Use PORT from .env or fallback to 3000

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/courses", coursesRoute);

app.get("/", (req, res) => res.send("Hello, World!"));

// Function to start the server
const startServer = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server is running and listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error while starting the server:", error.message);
    process.exit(1); // Exit process with failure
  }
};

// Call the function to start the server
startServer();
