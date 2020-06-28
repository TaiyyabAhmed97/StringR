import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import "./App.sass";
import RestringForm from "./components/restring-form/restring-form";
import NewUserForm from "./components/new-user-form/new-user-form";
import Dashboard from "./components/dashboard/dashboard";

export default function App() {
  return (
    <>
      <div className="root">
        <h1 className="title">Strings Attached Restringing Application</h1>
        <Router>
          <Switch>
            <Route path="/restring">
              <RestringForm></RestringForm>
            </Route>
            <Route path="/dashboard">
              <Dashboard></Dashboard>
            </Route>
            <Route path="/">
              <NewUserForm></NewUserForm>
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
}
