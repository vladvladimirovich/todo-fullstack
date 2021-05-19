const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");

const cors = require("cors");

//replace with >>>
app.use(cors());

const PostSchema = mongoose.Schema({
  name: {
    type: String,
  },
  state: {
    type: Number,
  },
});

const Post = mongoose.model("Posts", PostSchema);

//const post = new Post({name: 'test2', state: 1});

//post.save().then(val => console.log(val))

// const MongoClient = require('mongodb').MongoClient;
const uri =
  "mongodb+srv://todo-list-server:todo-list-app-server@cluster0.jdrxm.mongodb.net/todo-list?retryWrites=true&w=majority";
  mongoose.connect(uri, { useNewUrlParser: true }, (err) => {
    console.log(err);
  });

  let result = [];
  Post.find({}).then((a) => reslult = a);


  
app.post("/", (req, res) => {
  const post = new Post(req); 
  post.save().then(val => console.log(val));
});

app.get("/", (req, res) => {
  //   res.send("Server message");
  Post.find({}).then((a) => res.json(Array.from(a)));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
