import "App.scss";
import Home from "pages/Home/Home";
import Login from "pages/Login/Login";
import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Redirect exact from="/" to='/login'></Redirect>
          {/* <Route exact path="/" element={<Navigate to="/login" />} /> */}
          <Route path="/home" component={Home}></Route>
          <Route path="/login" component={Login} ></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;













