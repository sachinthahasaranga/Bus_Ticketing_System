import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AllUsers from "./components/AllUsers";
import Admin from "./components/Admin";
import AllRoutes from "./components/AllRoutes";
import AddRoute from "./components/AddRoute";
import RouteData from "./components/RouteData";
import Register from "./components/Register";
import Login from "./components/Login";
import Nav from "./components/nav";
import Footer from "./components/footer";
import ButterToast, { POS_RIGHT , POS_TOP } from "butter-toast";

function App() {
  return (
    <Router>
      <div
        className="App"
        style={{
          backgroundImage: "url(/bg.jpg)",
          backgroundRepeat: "repeat",
          backgroundSize: "cover"
        }}
      >
        <Nav />
        <Switch>
          <Route path="/all_routes" component={AllRoutes}></Route>
          <Route path="/add_route" component={AddRoute}></Route>
          <Route path="/route" component={RouteData}></Route>
          <Route path="/admin" component={Admin}></Route>
          <Route path="/allusers" component={AllUsers}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/login" component={Login}></Route>
        </Switch>
        <ButterToast position={{ vertical: POS_TOP , horizontal: POS_RIGHT }} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
