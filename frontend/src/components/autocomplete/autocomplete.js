import React from "react";

export default class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      text: "",
    };
  }

  render() {
    const { text } = this.props;
    {
      return <h1>Hello {text}</h1>;
    }
  }
}
