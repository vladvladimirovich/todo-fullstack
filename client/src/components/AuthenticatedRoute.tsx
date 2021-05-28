import { Redirect, Route, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";

const RouteAuthenticated = ({ component: Component, path }: RouteProps) => {

  console.log("AuthenticatedRoute")
  const isAuth = useSelector((state: any) => state.auth.authorized);
  console.log("   isAuth = ", isAuth);
  if (!isAuth) {
    console.log('redirect')
    return <Redirect to="/login" />;
  }

  return <Route component={Component} path={path} />;
};

export default RouteAuthenticated;
