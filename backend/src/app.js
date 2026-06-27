const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const routes = require("./routes");
const { notFoundHandler, globalErrorHandler } = require("./middlewares/error.middleware");

const app = express();

// Middlewares
app.use(cors({
  origin: "*",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static upload folder
app.use("/uploads", express.static("uploads"));

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Resume Analyzer Backend API is running",
  });
});

// Main API routes
app.use("/api/v1", routes);

// Error handlers
app.use(notFoundHandler);
app.use(globalErrorHandler);

module.exports = app;