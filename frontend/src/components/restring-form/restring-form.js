import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../restring-form/restring-form.css";
import { withRouter } from "react-router-dom";

class RestringForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: "",
      name: "",
      phoneNumber: "",
      dueDate: new Date(),
      rst: [
        {
          racket: "",
          mains: { string: "", tension: "" },
          crosses: { string: "", tension: "" },
        },
      ],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.rstFormField = this.rstFormField.bind(this);
    this.addRst = this.addRst.bind(this);
    this.removeRst = this.removeRst.bind(this);
    this.handleRstChange = this.handleRstChange.bind(this);
    this.helper = this.helper.bind(this);
    this.getFullName = this.getFullName.bind(this);
  }
  getFullName() {}
  componentDidMount() {
    console.log(this.props);
    let userName =
      this.props.location.state.fname + " " + this.props.location.state.lname;
    this.setState({
      name: userName,
      phoneNumber: this.props.location.state.phoneNumber,
    });
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
  helper(obj, prop, val) {
    switch (prop) {
      case "racket":
        obj.racket = val;
        break;
      case "mains.string":
        obj.mains.string = val;
        break;
      case "crosses.string":
        obj.crosses.string = val;
        break;
      case "crosses.tension":
        obj.crosses.tension = val;
        break;
      case "mains.tension":
        obj.mains.tension = val;
        break;
    }
    return obj;
  }
  handleRstChange(e, idx) {
    const name = e.target.name;
    let rstItems = [...this.state.rst];

    let temp = { ...rstItems[idx] };

    rstItems[idx] = this.helper(temp, name, e.target.value);
    this.setState({
      rst: [...rstItems],
    });
  }
  handleDateChange(date) {
    this.setState({
      dueDate: date,
    });
  }
  addRst() {
    const rst = {
      racket: "",
      mains: {
        string: "",
        tension: 0,
      },
      crosses: {
        string: "",
        tension: 0,
      },
    };
    let rstItems = [...this.state.rst];
    rstItems.push(rst);
    this.setState({
      rst: rstItems,
    });
  }
  removeRst() {}
  rstFormField() {
    const rstItems = this.state.rst.map((rst, idx) => {
      return (
        <div key={idx}>
          <div className="field">
            <label className="label">Racket</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="racket"
                value={rst.racket}
                placeholder="Wilson Pro Staff 97"
                onChange={(e) => this.handleRstChange(e, idx)}
              />
            </div>
            <p className="label">Mains String</p>
            <div className="control">
              <input
                className="input"
                type="text"
                value={rst.mains.string}
                name="mains.string"
                placeholder="RPM Blast"
                onChange={(e) => this.handleRstChange(e, idx)}
              />
            </div>
            <p className="label">Crosses String</p>
            <div className="control">
              <input
                className="input"
                type="text"
                value={rst.crosses.string}
                name="crosses.string"
                placeholder="Wilson NXT"
                onChange={(e) => this.handleRstChange(e, idx)}
              />
            </div>
            <div className="field-body">
              <div className="field">
                <label className="label">Main's Tension</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="mains.tension"
                    value={rst.mains.tension}
                    placeholder="50"
                    onChange={(e) => this.handleRstChange(e, idx)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Crosses Tension</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="crosses.tension"
                    value={rst.crosses.tension}
                    placeholder="55"
                    onChange={(e) => this.handleRstChange(e, idx)}
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
    return (
      <div>
        <p className="subtitle">
          <b>New Restring Form </b>
        </p>
        <form>
          <fieldset disabled>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  readOnly
                  className="input"
                  type="text"
                  name="name"
                  value={this.state.name}
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
                  value={this.state.phoneNumber}
                  placeholder="e.g. 773-712-8894"
                />
              </div>
            </div>
          </fieldset>

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
          {this.rstFormField()}

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
export default withRouter(RestringForm);
