import {
  createStore,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit";
import todoReducer from "./todosSlice";
import visibilityReducer from "./visibilitySlice";
import thunk from "redux-thunk";
import authReducer from "./authReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  todos: todoReducer,
  visibility: visibilityReducer,
  auth: authReducer,
});
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
