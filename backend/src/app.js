const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const routes = require("./routes/index");
const { notFoundHandler, globalErrorHandler } = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Resume Analyzer Backend API is running",
  });
});

app.use("/api/v1", routes);

app.use(notFoundHandler);
app.use(globalErrorHandler);

module.exports = app;
