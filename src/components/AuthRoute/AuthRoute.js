import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ifToken } from "utils/token";

// 1. Route defender 路由守卫

export default class AuthRoute extends React.Component {
  render() {
    var { component: Home, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={(x) => {
          if (ifToken()) {
            return <Home {...x}></Home>;
          } else {
            return (
              <Redirect
                to={{ pathname: "/login", state: x.location.pathname }}
              ></Redirect>
            );
          }
        }}
      ></Route>
    );
  }
}
