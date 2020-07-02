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
      <div>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Strings Attached Restringing Application
              </h1>
            </div>
          </div>
        </section>
      </div>
      <section className="section">
        <div className="container">
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
      </section>
      <section class="section">
        <footer class="footer">
          <div class="container">
            <div class="content has-text-centered">
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
