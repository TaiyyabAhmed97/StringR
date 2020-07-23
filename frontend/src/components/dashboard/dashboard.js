import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "../dashboard/dashboard.css";
import { devUrl } from "../../envVars";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stringjobs: [],
    };
    this.stringJobCards = this.stringJobCards.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  componentDidMount() {
    axios.get(`${devUrl}/api/stringjob`).then((res) => {
      this.setState({
        stringjobs: res.data.data,
      });
    });
  }

  handleOnClick(e, idx) {
    this.props.history.push("/confirm", {
      ...this.state.stringjobs[idx],
    });
  }
  stringJobCards() {
    const sJobs = this.state.stringjobs.map((obj, idx) => {
      let date = new Date(obj.dueDate);
      date = date.toDateString();
      const status = obj.status;
      const statusClass = status == "NOT DONE" ? "notdone" : " done";
      const title = obj.rst.length > 1 ? "Rackets" : "Racket";
      const rsts = obj.rst.map((rst, idx) => {
        return (
          <div key={idx}>
            <p>
              {idx + 1}
              {". "}
              {rst.racket}
            </p>
            <ul>
              <li>
                mains: {rst.mains.string} @ <b>{rst.mains.tension} lbs</b>
              </li>
              <li>
                crosses: {rst.crosses.string} @ <b>{rst.crosses.tension} lbs</b>
              </li>
            </ul>
          </div>
        );
      });
      return (
        <div
          className="pointer"
          key={idx}
          onClick={(e) => this.handleOnClick(e, idx)}
        >
          <div className="box stringJobCard columns">
            <div className="column">
              <h3 className="title is-3">Customer Info</h3>
              <div>
                <p className="">
                  Name: {obj.user.firstName + " " + obj.user.lastName}
                </p>
                <p className="">Phone Number: {obj.user.phoneNumber}</p>
                <p className="">Due At: {date}</p>
              </div>
            </div>
            <div className="column">
              <h3 className="title is-3">{title} Info</h3>
              <h2 className="subtitle restringStatus">
                Restring Status: <b className={statusClass}>{status}</b>
              </h2>
              {rsts}
            </div>
          </div>
        </div>
      );
    });
    return sJobs;
  }

  render() {
    if (this.state.stringjobs.length == 0) {
      return null;
    } else {
      return (
        <div>
          {this.stringJobCards()}
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
        </div>
      );
    }
  }
}
export default withRouter(Dashboard);
