//CONNECT TO DB
const mongoose = require("mongoose");
require("dotenv/config");
mongoose.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, converted) => {
    delete converted._id;
  },
});
const uri = process.env.MONGODB_URL;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
  console.log("CONNECTED TO DB")
);

//CONFIGURE EXPRESS
const PORT = process.env.PORT || 8080;
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
//  connect routes
const todosRoute = require("./routes/todos");

app.use(cors());
app.use(express.json());
app.use("/api/v1/todos", todosRoute);

app.use(express.static("client/build/"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is starting at PORT: ${PORT}`);
});
