import "./App.scss";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Link to="/home">Home</Link> <br></br>
        <Link to="/login">Login</Link> */}

        <Route path="/home" component={Home}></Route>
        <Route path="/login" component={Login}></Route>
      </div>
    </Router>
  );
}

export default App;
