const express = require("express");
const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(express.json());
app.use("/api/contacts", contactsRouter);

// Middleware xử lý 404
app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

// Middleware xử lý lỗi chung
app.use((error, req, res, next) => {
  return res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;
