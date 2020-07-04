import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../restring-form/restring-form.css";
import "../confirm-restring.js/confirm-restring.css";
import { withRouter } from "react-router-dom";
import axios from "axios";

class ConfirmRestring extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
      },
      status: "",
      dropOffDate: "",
      dueDate: new Date(),
      rst: [
        {
          racket: "",
          mains: { string: "", tension: "" },
          crosses: { string: "", tension: "" },
        },
      ],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancel = this.cancel.bind(this);
    this.rstFormField = this.rstFormField.bind(this);

    //this.getFullName = this.getFullName.bind(this);
  }
  componentDidMount() {
    const passedState = this.props.location.state;

    this.setState({
      id: passedState._id,
      user: passedState.user,
      status: passedState.status,
      dueDate: passedState.dueDate,
      createdAt: passedState.dropOffDate,
      rst: [...passedState.rst],
    });
  }
  cancel() {
    this.props.history.push("/dashboard");
  }
  handleSubmit(e) {
    console.log("in here");
    let { id } = this.state;
    axios
      .post("http://localhost:8000/api/stringjob/done", {
        id,
      })
      .then((res) => {
        this.props.history.push("/dashboard");
      })
      .catch((e) => {});
    e.preventDefault();
  }

  rstFormField() {
    const rstItems = this.state.rst.map((rst, idx) => {
      return (
        <div key={idx}>
          <div className="field">
            <label className="label">Racket</label>
            <div className="control">
              <input
                readOnly
                className="input"
                type="text"
                name="racket"
                value={rst.racket}
                placeholder="Wilson Pro Staff 97"
                //onChange={(e) => this.handleRstChange(e, idx)}
              />
            </div>
            <p className="label">Mains String</p>
            <div className="control">
              <input
                readOnly
                className="input"
                type="text"
                value={rst.mains.string}
                name="mains.string"
                placeholder="RPM Blast"
                //onChange={(e) => this.handleRstChange(e, idx)}
              />
            </div>
            <p className="label">Crosses String</p>
            <div className="control">
              <input
                readOnly
                className="input"
                type="text"
                value={rst.crosses.string}
                name="crosses.string"
                placeholder="Wilson NXT"
                //onChange={(e) => this.handleRstChange(e, idx)}
              />
            </div>
            <div className="field-body">
              <div className="field">
                <label className="label">Main's Tension</label>
                <div className="control">
                  <input
                    readOnly
                    className="input"
                    type="text"
                    name="mains.tension"
                    value={rst.mains.tension}
                    placeholder="50"
                    //onChange={(e) => this.handleRstChange(e, idx)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Crosses Tension</label>
                <div className="control">
                  <input
                    readOnly
                    className="input"
                    type="text"
                    name="crosses.tension"
                    value={rst.crosses.tension}
                    placeholder="55"
                    //onChange={(e) => this.handleRstChange(e, idx)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return rstItems;
  }

  render() {
    let name = this.state.user.firstName + " " + this.state.user.lastName;
    let dueDate = new Date(this.state.dueDate);
    let createdAt = new Date(this.state.dropOffDate);
    let dateString = `${dueDate.getMonth()}/${dueDate.getDate()}/${dueDate.getFullYear()}`;
    return (
      <div>
        <p className="subtitle">
          <b></b>
        </p>
        <form>
          <fieldset>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  readOnly
                  className="input"
                  type="text"
                  name="name"
                  value={name}
                  placeholder="e.g Alex Smith"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Phone Number</label>
              <div className="control">
                <input
                  readOnly
                  className="input"
                  type="text"
                  name="phoneNumber"
                  value={this.state.user.phoneNumber}
                  placeholder="e.g. 773-712-8894"
                />
              </div>
            </div>
          </fieldset>

          <div className="field">
            <label className="label">Due Date</label>
            <div className="control">
              <input
                readOnly
                className="input"
                type="text"
                name="dueDate"
                value={dateString}
              />
            </div>
          </div>

          {this.rstFormField()}
          <div className="field is-grouped groups">
            <p className="control">
              <button
                type="button"
                onClick={this.handleSubmit}
                className="button is-success"
              >
                String Job Completed
              </button>
            </p>

            <p className="control addRacket">
              <button
                type="button"
                onClick={this.cancel}
                className="button is-primary"
              >
                Cancel
              </button>
            </p>
          </div>

          <pre>{JSON.stringify(this.state, null, 2)} </pre>
          <pre>{JSON.stringify(this.props.location.state, null, 2)} </pre>
        </form>
      </div>
    );
  }
}
export default withRouter(ConfirmRestring);
