import React, { Component } from "react";
import axios from "axios";
import "./find-user.css";
import { withRouter } from "react-router-dom";
import { devUrl } from "../../envVars";
import { getNumbers } from "../helpers/helpers";
import Autocomplete from "../autocomplete/autocomplete";
class FindUserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: "",
      user: {},
      phoneNumberList: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    getNumbers()
      .then((numbers) => {
        this.setState({
          phoneNumberList: [...numbers],
        });
      })
      .catch((e) => {
        console.log("e");
      });
  }

  handleChange(e) {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  }
  handleSubmit(e) {
    axios
      .get(`${devUrl}/api/user/` + this.state.phoneNumber)
      .then((res) => {
        this.setState(
          {
            user: res.data.data,
          },
          () => {
            this.props.history.push("/restring", {
              fname: this.state.user.firstName,
              lname: this.state.user.lastName,
              phoneNumber: this.state.phoneNumber,
              user: this.state.user._id,
            });
          }
        );
      })
      .catch((e) => {
        this.props.history.push("/", {
          phoneNumber: this.state.phoneNumber,
        });
        console.log("no user found");
        //console.error(e);
      });
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <p className="subtitle">Find Customer Form</p>
        <Autocomplete text={this.state.phoneNumber}></Autocomplete>
        <form>
          <div className="field is-grouped">
            <div className="field">
              <label className="label">Phone Number</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="phoneNumber"
                  value={this.state.phoneNumber}
                  placeholder="e.g. 773-712-8894"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <div className="control"></div>
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
export default withRouter(FindUserForm);
