const app = require("./app");
const connectDB = require("./db/Database"); // ✅ Correct import

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

// ✅ Fix: Use correct function name
connectDB(); // ✅ Calling the correct function

// Start the server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

// Handle unhandled promise rejections (e.g., database connection failure)
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  console.log("Shutting down the server due to an unhandled promise rejection.");
  
  server.close(() => {
    process.exit(1); // Exit with failure code
  });
});
