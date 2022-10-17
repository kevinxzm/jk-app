import React from "react";
import { Card } from "antd";
// import "./Login.css";

import "pages/Login/Login.scss";
import logo from "assets/img/logo.png";

export default class Login extends React.Component {
  render() {
    return (
      <div className="login">
        <Card className="loginwindow">
          
          <p><img src={logo} alt="logo" /></p>
          <p>Card content</p>
          
        </Card>
      </div>
    );
  }
}
