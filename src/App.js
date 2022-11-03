import Home from "pages/Home/Home";
import Login from "pages/Login/Login";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import AuthRoute from "components/AuthRoute/AuthRoute";


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Redirect exact from="/" to="/login"></Redirect>
          <Route path="/login" component={Login}></Route>
          <AuthRoute path="/home" component={Home}></AuthRoute>

          {/* <Route
            path="/home"
            render={(x) => {
              return (
                解释：x是props,这个可以给一个小的x.history给参数history,这样子组件可以直接用this.props.history。
                如果是像下面这行把x全都给子组件，子组件就要多拆一层 this.props.props.history
                原因：x就是props，组件Home里面的参数都是props里面的属性，没法显示props，props太大了，所以要想放props就要把它拆开。从这里拆或者都给子组件让子组件去拆
                <Home props={x}></Home>
                <Home history={x.history}></Home>
              );
            }}
          ></Route>  */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
