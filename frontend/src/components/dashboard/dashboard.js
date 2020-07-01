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
      const rsts = obj.rst.map((rst, idx) => {
        return (
          <div key={idx}>
            <p>
              {idx}
              {". "}
              {rst.racket +
                " " +
                "mains: " +
                rst.mains.string +
                " at " +
                rst.mains.tension +
                "lbs" +
                "\n" +
                "crosses: " +
                rst.crosses.string +
                " at " +
                rst.crosses.tension +
                "lbs"}
            </p>
          </div>
        );
      });
      return (
        <div key={idx}>
          <div className="box stringJobCard">
            <p>
              Customer: {obj.user.firstName + " " + obj.user.lastName}
              <br></br>
              Due At: {obj.dueDate}
            </p>
            <div>{rsts}</div>
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
          <pre>{JSON.stringify(this.state, null, 2)} </pre>
        </div>
      );
    }
  }
}
export default withRouter(Dashboard);
