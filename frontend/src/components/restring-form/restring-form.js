import React, { Component } from "react";

export default class RestringForm extends Component {
  constructor(props) {
    super(props);

    this.state = { name: "", phoneNumber: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    console.log(this.state);
    e.preventDefault();
  }
  handleChange(e) {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
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
            <p className="control">
              <button className="button is-success">Login</button>
            </p>
          </div>
        </form>
      </div>
    );
  }
}
