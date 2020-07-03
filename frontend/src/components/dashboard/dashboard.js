import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "../dashboard/dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stringjobs: [],
    };
    this.stringJobCards = this.stringJobCards.bind(this);
  }
  componentDidMount() {
    axios.get("http://localhost:8000/api/stringjob").then((res) => {
      this.setState({
        stringjobs: res.data.data,
      });
    });
  }

  rstFields() {}
  stringJobCards() {
    const sJobs = this.state.stringjobs.map((obj, idx) => {
      console.log(obj);
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
        <div key={idx}>
          <div className="box stringJobCard columns">
            <div className="column">
              <h3 class="title is-3">Customer Info</h3>
              <div>
                <p className="">
                  Name: {obj.user.firstName + " " + obj.user.lastName}
                </p>
                <p className="">Phone Number: {obj.user.phoneNumber}</p>
                <p className="">Due At: {obj.dueDate}</p>
              </div>
            </div>
            <div className="column">
              <h3 class="title is-3">{title} Info</h3>
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
      return <div>{this.stringJobCards()}</div>;
    }
  }
}
export default withRouter(Dashboard);
