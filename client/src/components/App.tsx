import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import TodoApp from "./TodoApp";
import Login from "./Login";
import Register from "./Register";
import UnauthenticatedRoute from "./UnauthenticatedRoute";
import AuthenticatedRoute from "./AuthenticatedRoute";
import { saveAuthState } from "../store/AuthActions";
import Loading from "./Loading";

function App() {
  console.log("app");
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(saveAuthState()); 
  },[dispatch]);

  return (
    <>
      {loading.loading ? (
        <Loading />
      ) : (
        <Router>
          <Switch>
            <AuthenticatedRoute component={TodoApp} path="/todo" />
            <UnauthenticatedRoute component={Login} path="/login" />
            <UnauthenticatedRoute component={Register} path="/register" />
          </Switch>
        </Router>
      )}
    </>
  );
}
export default App;
