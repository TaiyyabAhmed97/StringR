import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import "./App.sass";
import RestringForm from "./components/restring-form/restring-form";
import NewUserForm from "./components/new-user-form/new-user-form";
import Dashboard from "./components/dashboard/dashboard";
import ConfirmRestring from "./components/confirm-restring.js/confirm-restring";
import Navbar from "./views/navbar/navbar";
export default function App() {
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <div className="container">
          <section className="section">
            <Switch>
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

      <section className="section">
        <footer className="footer">
          <div className="container">
            <div className="content has-text-centered">
              <p>
                <strong>Bulma</strong> by{" "}
                <a href="https://jgthms.com">Jeremy Thomas</a>. The source code
                is licensed
                <a href="http://opensource.org/licenses/mit-license.php">MIT</a>
                . The website content is licensed{" "}
                <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
                  CC BY NC SA 4.0
                </a>
                .
              </p>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
}
