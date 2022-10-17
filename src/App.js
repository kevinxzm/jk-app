import "App.scss";
import Home from "pages/Home/Home";
import Login from "pages/Login/Login";

import {
  Link,
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import React from "react";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Navigate to="/login" />} />
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

class Normal extends React.Component {
  render() {
    return <div>normal</div>;
  }
}

export default App;
