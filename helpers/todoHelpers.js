async function submitTodo(todo, todoModel) {
  console.log("owner_id", todo.owner_id);
  const newTodo = new todoModel({
    label: todo.label,
    state: todo.state,
    owner_id: todo.owner_id,
  });
  try {
    const submitedTodo = await newTodo.save();
    return {
      ok: true,
      value: submitedTodo,
    };
  } catch (err) {
    console.log(err);
    return {
      ok: false,
      error: err,
    };
  }
}

async function getTodos(ownerId, todoModel) {
  try {
    const recievedTodos = await todoModel.find({ owner_id: ownerId });
    if (recievedTodos) {
      return {
        ok: true,
        value: recievedTodos,
      };
    }
    return {
      ok: false,
      error: Error("Didn't find todos"),
      value: null,
    };
  } catch (err) {
    console.log(err);
    return {
      ok: false,
      error: err,
    };
  }
}

async function getTodo(ownerId, todoId, todoModel) {
  try {
    const recievedTodo = await todoModel.findOne({
      owner_id: ownerId,
      _id: todoId,
    });
    if (recievedTodo) {
      return {
        ok: true,
        value: recievedTodo,
      };
    }
    return {
      ok: false,
      error: Error("Didn't find todo"),
      value: null,
    };
  } catch (err) { 
    console.log(err);
    return {
      ok: false,
      error: err,
    };
  }
}

async function deleteTodo(ownerId, todoId, todoModel) {
  try {
    await todoModel.deleteOne({
      owner_id: ownerId,
      _id: todoId,
    });
    return {
      ok: true,
    };
  } catch (err) {
    console.log(err);
    return {
      ok: false,
      error: err,
    };
  }
}

async function updateTodos(ownerId, todoModel, update) {
  try {
    await todoModel.updateMany({ owner_id: ownerId }, { $set: update });
    return {
      ok: true,
    };
  } catch (err) {
    console.log(err);
    return {
      ok: false,
      error: err,
    };
  }
}

async function updateTodo(ownerId, todoId, todoModel, update) {
  try {
    await todoModel.updateOne({ owner_id: ownerId, _id: todoId }, { $set: update });
    return {
      ok: true,
    };
  } catch (err) {
    console.log(err);
    return {
      ok: false,
      error: err,
    };
  }
}
module.exports = {
  submitTodo,
  getTodos,
  getTodo,
  deleteTodo,
  updateTodos,
  updateTodo,
};
