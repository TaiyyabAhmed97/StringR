import React, { Component } from "react";
import axios from "axios";
import "./find-user.css";
import { withRouter } from "react-router-dom";
import { devUrl } from "../../envVars";
import { getNumbers } from "../helpers/helpers";
import Autocomplete from "react-autocomplete";

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
    this.handleSelect = this.handleSelect.bind(this);
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
  handleSelect(str) {
    this.setState({
      phoneNumber: str,
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
    let inputProps = {
      className: "input",
      type: "text",
      name: "phoneNumber",
      placeholder: "e.g. 773-712-8894",
    };
    return (
      <div>
        <p className="subtitle">Find Customer Form</p>
        <form>
          <label className="label">Phone Number</label>
          <div className="field has-addons">
            <div className="control">
              <Autocomplete
                items={this.state.phoneNumberList}
                getItemValue={(item) => item}
                renderItem={(item, isHighlighted) => (
                  <div
                    style={{
                      background: isHighlighted ? "lightgray" : "white",
                      padding: "5px",
                      fontSize: "larger",
                      border: "1px solid #ccc",
                      borderRadius: "16px",
                    }}
                    key={Math.random()}
                  >
                    {item}
                  </div>
                )}
                value={this.state.phoneNumber}
                onChange={this.handleChange}
                inputProps={inputProps}
                onSelect={this.handleSelect}
              ></Autocomplete>
            </div>
            <div className="control">
              <button
                type="button"
                onClick={this.handleSubmit}
                className="button is-success"
              >
                Submit
              </button>
            </div>
          </div>

          <pre>{JSON.stringify(this.state, null, 2)} </pre>
        </form>
      </div>
    );
  }
}
export default withRouter(FindUserForm);
