const app = require("./app");
const connectDB = require("./db/Database"); // ✅ Correct import
const cors = require("cors");

// Handling uncaught Exception when setting up backend server
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to an uncaught exception.");
  process.exit(1); // Exit process
});

// Load environment variables
if (process.env.DB_URL !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}
app.use(cors({
  origin: 'http://localhost:5173',
  // origin:"*", // Update this if your frontend is hosted elsewhere
  // credentials: true, // Enable if you need to send cookies or authentication headers
}));

// ✅ Fix: Use correct function name
// connectDB(); // ✅ Calling the correct function

// Start the server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  try {
    connectDB();
    console.log(`✅ Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.log("error in server",error)
  }
 
});

// Handle unhandled promise rejections (e.g., database connection failure)
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  console.log("Shutting down the server due to an unhandled promise rejection.");
  
  server.close(() => {
    process.exit(1); // Exit with failure code
  });
});
