import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../restring-form/restring-form.css";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { devUrl } from "../../envVars";
import Autocomplete from "react-autocomplete";
import { getStringsList } from "../helpers/helpers";

class RestringForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stringsList: [],
      racketsList: [],
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
    this.newField = this.newField.bind(this);
    this.handleSelectMains = this.handleSelectMains.bind(this);
    this.handleSelectCrosses = this.handleSelectCrosses.bind(this);
    this.handleSelectRacket = this.handleSelectRacket.bind(this);
  }
  componentDidMount() {
    getStringsList()
      .then((strings) => {
        console.log(strings);
        this.setState({
          stringsList: strings.stringArray,
          racketsList: strings.rackets,
        });
      })
      .catch((e) => {
        console.log(e);
      });
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
      .post(`${devUrl}/api/stringjob`, {
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
  handleSelectCrosses(str, idx) {
    console.log(" in handle select crosses with " + str);
    const rstItems = [...this.state.rst];

    let rstItem = { ...rstItems[idx] };
    rstItem.crosses.string = str;
    rstItems[idx] = rstItem;
    this.setState({
      rst: [...rstItems],
    });
  }
  handleSelectMains(str, idx) {
    const rstItems = [...this.state.rst];

    let rstItem = { ...rstItems[idx] };
    rstItem.mains.string = str;
    rstItems[idx] = rstItem;
    this.setState({
      rst: [...rstItems],
    });
  }
  handleSelectRacket(str, idx) {
    const rstItems = [...this.state.rst];

    let rstItem = { ...rstItems[idx] };
    rstItem.racket = str;
    rstItems[idx] = rstItem;
    this.setState({
      rst: [...rstItems],
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
    rstItems.splice(idx, 1);

    this.setState({ rst: rstItems });
  }
  newField() {}

  rstFormField() {
    const inputPropsMains = {
      className: "input",
      type: "text",
      name: "mains.string",
      placeholder: "RPM Blast",
    };
    const inputPropsCrosses = {
      className: "input",
      type: "text",
      name: "crosses.string",
      placeholder: "Wilson NXT",
    };
    const inputPropsRacket = {
      className: "input",
      type: "text",
      name: "racket",
      placeholder: "Wilson Blade 98",
    };
    const menuStyle = {
      borderRadius: "3px",
      boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
      background: "rgba(255, 255, 255, 0.9)",
      padding: "2px 0",
      fontSize: "90%",
      position: "fixed",
      overflow: "auto",
      maxHeight: "50%", // TODO: don't cheat, let it flow to the bottom
      zIndex: 1,
    };
    const rstItems = this.state.rst.map((rst, idx) => {
      return (
        <>
          <div key={idx} className="rstbox">
            <div className="field">
              <label className="label">Racket {idx + 1}</label>
              <div className="control">
                <Autocomplete
                  items={this.state.racketsList}
                  getItemValue={(item) => item}
                  renderItem={(item, isHighlighted) => (
                    <div
                      className="stringbox"
                      style={{
                        background: isHighlighted ? "lightgray" : "white",
                        padding: "5px",
                        fontSize: "larger",
                        border: "1px solid #ccc",
                        borderRadius: "16px",
                        position: "relative",
                      }}
                      key={Math.random()}
                    >
                      {item}
                    </div>
                  )}
                  value={rst.racket}
                  onChange={(e) => this.handleRstChange(e, idx)}
                  onSelect={(str) => this.handleSelectRacket(str, idx)}
                  inputProps={inputPropsRacket}
                  menuStyle={menuStyle}
                ></Autocomplete>
              </div>
              <div className="field-body">
                <div className="field minContentBox">
                  <p className="label">Mains String</p>
                  <div className="control">
                    <Autocomplete
                      items={this.state.stringsList}
                      getItemValue={(item) => item}
                      renderItem={(item, isHighlighted) => (
                        <div
                          className="stringbox"
                          style={{
                            background: isHighlighted ? "lightgray" : "white",
                            padding: "5px",
                            fontSize: "larger",
                            border: "1px solid #ccc",
                            borderRadius: "16px",
                            position: "relative",
                          }}
                          key={Math.random()}
                        >
                          {item}
                        </div>
                      )}
                      value={rst.mains.string}
                      onChange={(e) => this.handleRstChange(e, idx)}
                      onSelect={(str) => this.handleSelectMains(str, idx)}
                      inputProps={inputPropsMains}
                      menuStyle={menuStyle}
                    ></Autocomplete>
                  </div>
                </div>
                <div className="field tensionBox">
                  <label className="label">Tension</label>
                  <div className="control tension">
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
                <div className="field minContentBox">
                  <p className="label">Crosses String</p>
                  <div className="control">
                    <Autocomplete
                      items={this.state.stringsList}
                      getItemValue={(item) => item}
                      renderItem={(item, isHighlighted) => (
                        <div
                          className="stringbox"
                          style={{
                            background: isHighlighted ? "lightgray" : "white",
                            padding: "5px",
                            fontSize: "larger",
                            border: "1px solid #ccc",
                            borderRadius: "16px",
                            zIndex: "1",
                            position: "relative",
                          }}
                          key={Math.random()}
                        >
                          {item}
                        </div>
                      )}
                      value={rst.crosses.string}
                      onChange={(e) => this.handleRstChange(e, idx)}
                      onSelect={(str) => this.handleSelectCrosses(str, idx)}
                      inputProps={inputPropsCrosses}
                      menuStyle={menuStyle}
                    ></Autocomplete>
                  </div>
                </div>
                <div className="field tensionBox">
                  <label className="label">Tension</label>
                  <div className="control tension">
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
          {this.newField()}
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
