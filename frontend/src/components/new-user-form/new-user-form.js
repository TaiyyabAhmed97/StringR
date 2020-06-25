import React, { Component } from "react";
import axios from "axios";
import "./new-user-form.css";
import { Router, withRouter } from "react-router-dom";
class NewUserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fname: "",
      lname: "",
      phoneNumber: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/users", {
        firstName: this.state.fname,
        lastName: this.state.lname,
        phoneNumber: this.state.phoneNumber,
      })
      .then((res) => {
        console.log(res);
        console.log(this.props);
        this.props.history.push("/restring", this.state);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    return (
      <div>
        <p className="subtitle">New User Form</p>
        <form>
          <div className="field is-grouped">
            <div className="field">
              <label className="label">First Name</label>
              <div className="control name">
                <input
                  className="input"
                  type="text"
                  name="fname"
                  placeholder="Alex"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Last Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="lname"
                  placeholder="Smith"
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Phone Number</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="phoneNumber"
                placeholder="e.g. 773-712-8894"
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="field">
            <p className="control">
              <button
                type="button"
                onClick={this.handleSubmit}
                className="button is-success"
              >
                Submit
              </button>
            </p>
          </div>

          <pre>{JSON.stringify(this.state, null, 2)} </pre>
        </form>
      </div>
    );
  }
}
export default withRouter(NewUserForm);
