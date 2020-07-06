import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../restring-form/restring-form.css";
import { withRouter } from "react-router-dom";
import axios from "axios";

class RestringForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      firstName: "",
      lastName: "",
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
    this.handleCancel = this.handleCancel.bind(this);
    this.handleStringEnter = this.handleStringEnter.bind(this);
    this.handleTensionEnter = this.handleTensionEnter.bind(this);
  }
  componentDidMount() {
    console.log(this.props.location.state);
    this.setState({
      user: this.props.location.state.user,
      firstName: this.props.location.state.fname,
      lastName: this.props.location.state.lname,
      phoneNumber: this.props.location.state.phoneNumber,
    });
  }

  handleSubmit(e) {
    let { user, dropOffDate, dueDate, rst } = this.state;
    axios
      .post("http://localhost:8000/api/stringjob", {
        user,
        dueDate,
        rst,
        dropOffDate,
      })
      .then((res) => {
        this.props.history.push("/dashboard");
      })
      .catch((e) => {});
    e.preventDefault();
  }
  handleCancel() {
    this.props.history.push("/dashboard");
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

    let rstItem = { ...rstItems[idx] };

    rstItems[idx] = this.helper(rstItem, name, e.target.value);
    this.setState({
      rst: [...rstItems],
    });
  }
  handleStringEnter(e, idx) {
    if (e.key === "Enter") {
      const rstItems = [...this.state.rst];

      let rstItem = { ...rstItems[idx] };
      rstItem.crosses.string = rstItem.mains.string;
      rstItems[idx] = rstItem;
      this.setState({
        rst: [...rstItems],
      });
    }
  }
  handleTensionEnter(e, idx) {
    if (e.key === "Enter") {
      const rstItems = [...this.state.rst];

      let rstItem = { ...rstItems[idx] };
      rstItem.crosses.tension = rstItem.mains.tension;
      rstItems[idx] = rstItem;
      this.setState({
        rst: [...rstItems],
      });
    }
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
  removeRst(idx) {
    console.log(idx);
    let rstItems = [...this.state.rst];
    let moddedRstItems = rstItems.splice(idx, 1);
    this.setState({ rst: [...moddedRstItems] });
  }
  rstFormField() {
    const rstItems = this.state.rst.map((rst, idx) => {
      return (
        <>
          <div key={idx} className="rstbox">
            <div className="field">
              <label className="label">Racket {idx + 1}</label>
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
              <div className="field-body">
                <div className="field">
                  <p className="label">Mains String</p>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      value={rst.mains.string}
                      name="mains.string"
                      placeholder="RPM Blast"
                      onChange={(e) => this.handleRstChange(e, idx)}
                      onKeyDown={(e) => this.handleStringEnter(e, idx)}
                    />
                  </div>
                </div>
                <div className="field">
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
                </div>
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
                      onKeyDown={(e) => this.handleTensionEnter(e, idx)}
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
              <p className="control removeRacket">
                <button
                  type="button"
                  onClick={(e) => this.removeRst(idx)}
                  className="button is-danger"
                >
                  Remove Racket
                </button>
              </p>
            </div>
          </div>
          <hr></hr>
        </>
      );
    });
    return rstItems;
  }

  render() {
    let name = this.state.firstName + " " + this.state.lastName;
    return (
      <div>
        <div class="notification is-success is-light">
          <button class="delete"></button>
          Primar lorem ipsum dolor sit amet, consectetur adipiscing elit lorem
          ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis
          placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet
          fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a>{" "}
          efficitur. Sit amet, consectetur adipiscing elit
        </div>
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

          {this.rstFormField()}
          <div className="field is-grouped">
            <p className="control">
              <button
                type="button"
                onClick={this.handleSubmit}
                className="button is-success"
              >
                Submit
              </button>
            </p>

            <p className="control addRacket">
              <button
                type="button"
                onClick={this.addRst}
                className="button is-primary"
              >
                Add Racket
              </button>
            </p>
            <p className="control cancel">
              <button
                type="button"
                onClick={this.handleCancel}
                className="button is-danger"
              >
                Cancel
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
