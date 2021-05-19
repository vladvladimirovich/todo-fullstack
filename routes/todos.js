const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// Get all todods
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();

    res.json(todos);
  } catch (err) {
    res.json({ message: err });
  }
});

// Submit a todo
router.post("/", async (req, res) => {
  const todo = new Todo({
    name: req.body.name,
    state: req.body.state,
  });
  try {
    const savedTodo = await todo.save();
    res.json(savedTodo);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get todo by id
router.get("/:todoId", async (req, res) => {
  const id = req.params.todoId;
  try {
    const todo = await Todo.findById(id);
    res.json(todo);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete todo by id
router.delete("/:todoId", async (req, res) => {
  try {
    const id = req.params.todoId;
    await Todo.deleteOne({ _id: id });
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.json({ message: err });
  }
});

// Update all todos state
router.patch("/", async (req, res) => {
  try {
    await Todo.updateMany(
      {},
      { $set: { state: req.body.state } }
    );
    res.send()
  } catch (err) {
    res.json({ message: err });
  }
});

// Update a todo state by id
router.patch("/:todoId", async (req, res) => {
  const id = req.params.todoId;
  try {
    await Todo.updateOne(
      { _id: id },
      { $set: { state: req.body.state } }
    );
    res.send()
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
