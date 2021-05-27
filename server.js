const connectDB = require("./connectDB");
connectDB();

//CONFIGURE EXPRESS
const PORT = process.env.PORT || 8080;
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

//  connect routes
const todosRoute = require("./routes/todos");
const usersRoute = require("./routes/users");

//middleware
const { verify } = require("./middeleware/verify");
// app.use(cors());
// Add Access Control Allow Origin headers
// app.options('/api/v1/todos', (req, res, next) => {
//   console.log(123, req.cookies);
//   next()
// })
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Length"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "POST, PATCH, GET, OPTIONS, DELETE"
  );
  next();
});
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/todos", verify, todosRoute);
app.use("/api/v1/users", usersRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build/"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(PORT, () => {
  console.log(`Server is starting at PORT: ${PORT}`);
});
