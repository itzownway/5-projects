const mongoose = require("mongoose");

const dbConnection = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/student")
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.error("Database connection failed:", error);
    });
};

module.exports = dbConnection;
