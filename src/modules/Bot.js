import React, { Component } from "react";
class Bot extends Component {
  state = {
    resp: []
  };
  componentDidMount() {
    const socket = new WebSocket("ws://localhost:3001/coinbase-stream");
  }

  render() {
    return (
      <div id="bot">
        <h3>I am cool bot</h3>
        <p>Response from Coinbase: </p>
        {this.state.resp.map((d, idx) => {
          return <li key={idx}>{d}</li>;
        })}
      </div>
    );
  }
}

export default Bot;
