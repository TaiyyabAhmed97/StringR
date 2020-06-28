import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stringjobs: [],
    };
  }
  componentDidMount() {
    axios.get("http://localhost:8000/api/stringjob/notdone").then((res) => {
      console.log(res);
      this.setState({
        stringjobs: res.data.data,
      });
    });
  }
  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.state, null, 2)} </pre>
      </div>
    );
  }
}
export default withRouter(Dashboard);
