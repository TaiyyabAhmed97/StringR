import React from "react";
import { withRouter, Link } from "react-router-dom";
import logo from "./logo.jpg";

import "../navbar/navbar.css";
class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="">
            <Link to="/dashboard">
              <img src={logo} height="28" />
            </Link>
          </a>

          <a
            role="button"
            class="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <Link class="navbar-item" to="/">
              New Customer Form
            </Link>

            <Link class="navbar-item" to="/usersearch">
              Find User
            </Link>

            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">More</a>

              <div class="navbar-dropdown">
                <a class="navbar-item">About</a>
                <a class="navbar-item">Jobs</a>
                <a class="navbar-item">Contact</a>
                <hr class="navbar-divider" />
                <a class="navbar-item">Report an issue</a>
              </div>
            </div>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a class="button is-primary">
                  <strong>Sign up</strong>
                </a>
                <a class="button is-dark">Log in</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);