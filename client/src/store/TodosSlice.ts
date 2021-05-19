import ITodo from "../components/ITodo";
import Todos from "../components/TodoList";
import TodoState from "../components/TodoState";

const URL = process.env.PUBLIC_URL;

const initialState: any = [];

//todo: custom middleware

//REDUCERS
function todoReducer(state = initialState, action: any) {
  const type = action.type;
  switch (type) {
    case "todo/markAll": {
      return state.map((todo: ITodo) => {
        todo.state = TodoState.Completed;
        return todo;
      });
    }
    case "todo/unmarkAll": {
      return state.map((todo: ITodo) => {
        todo.state = TodoState.Planned;
        return todo;
      });
    }
    case "todo/add": {
      console.log(URL);
      const newState = state.concat(action.payload);
      return newState;
    }
    case "todo/remove": {
      return state.filter((todo: ITodo) => action.payload !== todo.id);
    }
    case "todo/toggle": {
      const id = action.payload.id;
      const newState = action.payload.state;
      return state.map((todo: ITodo) => {
        const newTodo = { ...todo };
        if (id === todo.id) {
          newTodo.state = newState;
        }
        return newTodo;
      });
    }
    case "todo/fetchTodos": {
      return [...action.payload];
    }
    default:
      return state;
  }
}

//ADD TODO ITEM
function add(todo: ITodo) {
  return async function (dispatch: any) {
    try {
      const response = await fetch(URL + "api/v1/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(todo),
      });

      const newTodo = await response.json();

      if (response.ok) {
        dispatch({
          type: "todo/add",
          payload: newTodo,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
}

//REMOVE TODO ITEM BY ID
function remove(id: String) {
  return async function (dispatch: any) {
    try {
      const response = await fetch(URL + "api/v1/todos/" + id, {
        method: "DELETE",
      });

      const todos = await response.json();

      if (response.ok) {
        dispatch({ type: "todo/fetchTodos", payload: Array.from(todos) });
      }
    } catch (err) {
      console.log(err);
    }
  };
}

//TOGGLE TODO ITEM BY ID
function toggle(id: String) {
  return async function (dispatch: any, getState: any) {
    const todos = getState().todos;
    const state = todos.find((todo: ITodo) => todo.id === id).state;

    const newState = state === TodoState.Completed ? 0 : 1;
    try {
      const response = await fetch(URL + "api/v1/todos/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ state: newState }),
      });

      if (response.ok) {
        dispatch({ type: "todo/toggle", payload: { id: id, state: newState } });
      }
    } catch (err) {
      console.log(err);
    }
  };
}

//MARK ALL ITEMS
function markAll() {
  return async function (dispatch: any) {
    const state = { state: 1 };
    try {
      const response = await fetch(URL + "api/v1/todos/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(state),
      });
      if (response.ok) {
        dispatch({ type: "todo/markAll" });
      }
    } catch (err) {
      console.log(err);
    }
  };
}

//UNMARK ALL ITEMS
function unmarkAll() {
  return async function (dispatch: any) {
    const state = { state: 0 };
    try {
      const response = await fetch(URL + "api/v1/todos/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(state),
      });
      if (response.ok) {
        dispatch({ type: "todo/unmarkAll" });
      }
    } catch (err) {
      console.log(err);
    }
  };
}

//GET TODO ITEMS FROM THE SERVER
function fetchTodos() {
  try {
    return async function (dispatch: any) {
      const response = await fetch(URL + "api/v1/todos");
      const todos = await response.json();
      if (response.ok) {
        dispatch({ type: "todo/fetchTodos", payload: Array.from(todos) });
      }
    };
  } catch (err) {
    console.log();
  }
}

export { fetchTodos, add, remove, toggle, markAll, unmarkAll };

export default todoReducer;