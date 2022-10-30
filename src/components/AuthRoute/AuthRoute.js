import React from "react";
import { Route, Redirect} from "react-router-dom";
import { ifToken } from "utils/token";

// 1. Route defender 路由守卫


export default class AuthRoute extends React.Component {
  render() {
    console.log(this.props);
    
    var { component: Home, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={(x) => {
          if (ifToken()) {
            return <Home {...x}></Home>;
          } else {
            // x.history.push("/login");
            return <Redirect to={'/login'}></Redirect>
          }
        }}
      ></Route>
    );
  }
}
