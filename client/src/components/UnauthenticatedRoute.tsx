import { Redirect, Route, RouteProps } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { is } from "immer/dist/internal";
import { saveAuthState } from "../store/AuthActions";

const RouteUnauthenticated = ({ component: Component, path }: RouteProps) => {
  const isAuth = useSelector((state: any) => state.auth.authorized);
  if (isAuth) {
    return <Redirect to="/todo" />;
  }

  return <Route component={Component} path={path} />;
};

export default RouteUnauthenticated;
