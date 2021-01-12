import React from "react";
import "../login/login.css"

export class Login extends React.Component {
  handleSignup = (username, email, password) => { };
  handleLogin = (username, password) => { }

  render() {
    return (
      <div className="login-box box">
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" type="text" placeholder="mystore@gmail.com" />
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input class="input" type="password" placeholder="" />
          </div>
        </div>
        <div className="field">
          <p className="control">
            <button
              type="button"
              className="button is-success"
            >
              Login
              </button>
          </p>
        </div>
      </div>


    );
  }
}
