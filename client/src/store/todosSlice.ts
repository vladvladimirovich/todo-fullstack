import { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";

const URL = process.env.PUBLIC_URL || "http://localhost:5000/";

export enum TodoState {
  Planned,
  Completed,
}

export interface ITodo {
  id: string;
  label: string;
  state: TodoState;
}

const initialState: Array<ITodo> = [];

//REDUCERS
function todoReducer(
  state: Array<ITodo> = initialState,
  action: PayloadAction<ITodo | Array<ITodo> | String>
) {
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
      const newState = state.concat(action.payload as ITodo);
      return newState;
    }
    case "todo/remove": {
      return state.filter((todo: ITodo) => action.payload !== todo.id);
    }
    case "todo/toggle": {
      const todo : ITodo = action.payload as ITodo;  
      const id : String = todo.id;
      const todoState : TodoState = todo.state;
      return state.map((todo: ITodo) => {
        const newTodo = { ...todo };
        if (id === todo.id) {
          newTodo.state = todoState;
        }
        return newTodo;
      });
    }
    case "todo/fetchTodos": {
      const todos : Array<ITodo> = action.payload as Array<ITodo>;
      return todos;
    }
    default:
      return state;
  }
}

//ADD TODO ITEM
function add(todo: ITodo) {
  return async function (dispatch: AppDispatch) {
    try {
      const response = await fetch(URL + "/api/v1/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        credentials: "include",
        body: JSON.stringify(todo),
      });

      const newTodo = await response.json();
      console.log(await newTodo);

      console.log("Add action");
      if (response.status === 200) {
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
  return async function (dispatch: AppDispatch) {
    try {
      const response = await fetch(URL + "/api/v1/todos/" + id, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        const todos = await response.json();
        dispatch({ type: "todo/fetchTodos", payload: Array.from(todos) });
      }
    } catch (err) {
      console.log(err);
    }
  };
}

//TOGGLE TODO ITEM BY ID
function toggle(id: String) {
  return async function (dispatch: AppDispatch, getState: any) {
    console.log("GET STATE IS", typeof(getState));
    const todos = getState().todos;
    const state = todos.find((todo: ITodo) => todo.id === id).state;

    const newState = state === TodoState.Completed ? 0 : 1;
    try {
      const response = await fetch(URL + "/api/v1/todos/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        credentials: "include",
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
  return async function (dispatch: AppDispatch) {
    const state = { state: 1 };
    try {
      const response = await fetch(URL + "/api/v1/todos/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        credentials: "include",
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
  return async function (dispatch: AppDispatch) {
    const state = { state: 0 };
    try {
      const response = await fetch(URL + "/api/v1/todos/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        credentials: "include",
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

//GET ALL TODOS
function fetchTodos() {
  return async function (dispatch: AppDispatch) {
    const response = await fetch(URL + "/api/v1/todos/", {
      credentials: "include",
    });
    if (response.status === 200) {
      const todos = await response.json();
      dispatch({ type: "todo/fetchTodos", payload: Array.from(todos) });
    }
  };
}

export { fetchTodos, add, remove, toggle, markAll, unmarkAll };

export default todoReducer;
