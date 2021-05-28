import { Redirect, Route, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const RouteUnauthenticated = ({ component: Component, path }: RouteProps) => {
  const isAuth = useSelector((state: RootState) => state.auth.authorized);
  if (isAuth) {
    return <Redirect to="/todo" />;
  }

  return <Route component={Component} path={path} />;
};

export default RouteUnauthenticated;
