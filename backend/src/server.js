require("dotenv").config();
const app = require("./app");
const connectDB = require("./services/db");

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
