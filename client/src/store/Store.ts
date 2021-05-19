import { createStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import todoReducer from "./TodosSlice";
import visibilityReducer from "./VisibilitySlice";
import thunk from "redux-thunk";

const rootReducer = combineReducers({todos: todoReducer,visibility: visibilityReducer,});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
