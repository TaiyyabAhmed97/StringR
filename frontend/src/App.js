import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import "./App.sass";
import RestringForm from "./components/restring-form/restring-form";
import NewUserForm from "./components/new-user-form/new-user-form";
import Dashboard from "./components/dashboard/dashboard";
import ConfirmRestring from "./components/confirm-restring.js/confirm-restring";
import Navbar from "./views/navbar/navbar";
import FindUser from "./components/find-user/find-user";
import { Login } from "./components/login/login";
import { Register } from "./register/register";
export default function App() {
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <div className="container">
          <section className="section">
            <Switch>

              <Route path="/usersearch">
                <FindUser></FindUser>
              </Route>
              <Route path="/register">
                <Register></Register>
              </Route>
              <Route path="/login">
                <Login></Login>
              </Route>
              <Route path="/restring">
                <RestringForm></RestringForm>
              </Route>
              <Route path="/dashboard">
                <Dashboard></Dashboard>
              </Route>
              <Route path="/confirm">
                <ConfirmRestring></ConfirmRestring>
              </Route>
              <Route path="/">
                <NewUserForm></NewUserForm>
              </Route>
            </Switch>
          </section>
        </div>
      </Router>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
    </>
  );
}
