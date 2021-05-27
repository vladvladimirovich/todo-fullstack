module.exports = function connectDB() {
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
  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("CONNECTED TO DB")
  );
};
