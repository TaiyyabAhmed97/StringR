import React from "react";
import "../register/register.css"

export class Register extends React.Component {
    handleSignup = (username, email, password) => { };
    handleLogin = (username, password) => { }

    render() {
        return (
            <div className="register-box box">
                <div class="field">
                    <label class="label">Name</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Alex Smith" />
                    </div>
                </div>
                <div class="field">
                    <label class="label">Email</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="mystore@gmail.com" />
                    </div>
                </div>
                <div class="field">
                    <label class="label">Number</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="7731238956" />
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
                            Sign Up
              </button>
                    </p>
                </div>
            </div>


        );
    }
}
