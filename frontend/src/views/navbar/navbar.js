import React from "react";
import { withRouter, Link } from "react-router-dom";
import logo from "./logo.jpg";

import "../navbar/navbar.css";
function Navbar(props) {

  function handleSignUp() {
    console.log("hello world")
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/dashboard">
          <img src={logo} height="28" />
        </Link>

        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to="/">
            New Customer
            </Link>

          <Link className="navbar-item" to="/usersearch">
            Find Customer
            </Link>
        </div>

        <div className="navbar-end">
          <div className="buttons">
            <Link className="navbar-item" to="/register">
              <a className="button is-primary">
                <strong>Sign up</strong>
              </a>
            </Link>
            <Link className="navbar-item" to="/login">
              <a className="button is-dark">Log in</a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );

}

export default withRouter(Navbar);
