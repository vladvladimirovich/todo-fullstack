import {
  createStore,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit";
import todoReducer from "./TodosSlice";
import visibilityReducer from "./VisibilitySlice";
import thunk from "redux-thunk";
import authReducer from "./AuthReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  todos: todoReducer,
  visibility: visibilityReducer,
  auth: authReducer,
});
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
console.log('store :>> ', (window as any).store = store); 
export default store;
