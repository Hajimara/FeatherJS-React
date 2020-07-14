import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import Fobidden from "./Fobidden";

export const ROLE = {
  super: "super",
  c: "c",
  r: "r"
};

const WriteRoute = ({ role, component: Component, ...rest }) => {
    const match = useRouteMatch();
  return (
    <Route
      {...rest}
      render={props => {
        
        if (!role.includes("c") && !role.includes("super")) {
          return <Fobidden />;
        }

        if (Component) {
          return <Component {...props} role={role} />;
        }

        return null;
      }}
    />
  );
};

export default WriteRoute;