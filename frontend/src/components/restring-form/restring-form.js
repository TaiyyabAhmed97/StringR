import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../restring-form/restring-form.css";

export default class RestringForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      phoneNumber: "",
      dueDate: new Date(),
      rst: [{ racket: "", strings: [{ string: "", tension: 0 }] }],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.rstFormField = this.rstFormField.bind(this);
    this.addRst = this.addRst.bind(this);
    this.removeRst = this.removeRst.bind(this);
  }

  handleSubmit(e) {
    this.setState(
      {
        currentDate: new Date(),
      },
      () => {
        console.log(this.state);
      }
    );

    e.preventDefault();
  }
  handleChange(e) {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  }
  handleDateChange(date) {
    this.setState({
      dueDate: date,
    });
  }
  addRst() {}
  removeRst() {}
  rstFormField() {
    const rstItems = this.state.rst.map((val, idx) => {});
  }

  render() {
    return (
      <div>
        <form>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="name"
                placeholder="e.g Alex Smith"
                onChange={this.handleChange}
              />
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
            <label className="label">Due Date</label>
            <div className="control">
              <div className="datePicker">
                <DatePicker
                  selected={this.state.dueDate}
                  onChange={this.handleDateChange}
                />
              </div>
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

          <div onClick={this.addRst} className="field">
            <p className="control">
              <button type="button" className="button is-primary">
                Add Racket
              </button>
            </p>
          </div>
          <pre>{JSON.stringify(this.state, null, 2)} </pre>
        </form>
      </div>
    );
  }
}
