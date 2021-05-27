const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const todoHelpers = require("../helpers/todoHelpers");

// Get all todods
router.get("/", async (req, res) => {
  const ownerId = req.userData.id;
  const response = await todoHelpers.getTodos(ownerId, Todo);

  if (response.ok) {
    const todos = response.value;
    return res.status(200).json(todos);
  }
  if (response.value === null) {
    return res.status(404).json({ error: response.error });
  } else {
    return res.json(400)({ error: response.error });
  }
});

// Submit a todo
router.post("/", async (req, res) => {
  const ownerId = req.userData.id;
  const label = req.body.label;
  const state = req.body.state;

  const todo = {
    owner_id: ownerId,
    label: label,
    state: state,
  };

  const response = await todoHelpers.submitTodo(todo, Todo);
  if (response.ok) {
    return res.status(200).send();
  }
  res.status(400).json({ error: response.error }).send();
});

// Get todo by id
router.get("/:todoId", async (req, res) => {
  const ownerId = req.userData.id;
  const todoId = req.params.todoId;
  console.log(todoId);
  const response = await todoHelpers.getTodo(ownerId, todoId, Todo);
  if (response.ok) {
    return res.status(200).json(response.value).send();
  }

  if (response.value === null) {
    res.status(404);
  } else {
    res.status(400);
  }
  res.json({ error: response.error }).send();
});

// Delete todo by id
router.delete("/:todoId", async (req, res) => {
  const ownerId = req.userData.id;
  const todoId = req.params.todoId;

  const response = await todoHelpers.deleteTodo(ownerId, todoId, Todo);
  if (response.ok) {
    return res.status(200).send();
  }
  res.status(400).json({ error: response.error }).send();
});

// Update all todos state
router.patch("/", async (req, res) => {
  const ownerId = req.userData.id;
  const update = { state: req.body.state };
  const response = await todoHelpers.updateTodos(ownerId, Todo, update);

  if (response.ok) {
    return res.status(200).send();
  }
  res.status(400).json({ error: response.error }).send();
});
// Update a todo state by id
router.patch("/:todoId", async (req, res) => {
  const ownerId = req.userData.id;
  const todoId = req.params.todoId;
  const update = { state: req.body.state };
  const response = await todoHelpers.updateTodo(ownerId, todoId, Todo, update);

  if (response.ok) {
    return res.status(200).send();
  }
  res.status(400).json({ error: response.error }).send();
});

module.exports = router;
