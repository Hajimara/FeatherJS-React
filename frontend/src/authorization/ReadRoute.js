import React from "react";
import { Route } from "react-router-dom";
import Fobidden from "./Fobidden";

export const ROLE = {
  super: "super",
  c: "c",
  r: "r"
};

const ReadRoute = ({ role, component: Component, ...rest }) => {
    
  return (
    <Route
      {...rest}
      render={props => {
        if (!role.includes("r") && !role.includes("super")) {
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

export default ReadRoute;