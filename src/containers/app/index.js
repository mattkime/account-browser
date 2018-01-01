import React, { Component } from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import { isAddress } from "ethereum-address";
import Address from "../address";
import Block from "../block";

class App extends Component {
  constructor() {
    super();
    this.addressLookup = this.addressLookup.bind(this);
  }
  addressLookup(e) {
    const input = this.refs.input.value;
    const isBlock = !input.startsWith("0x");
    const isValidAddress = isAddress(input);

    if (isBlock) {
      this.props.history.push(`/block/${input}`);
      this.refs.input.value = "";
    } else if (isValidAddress) {
      this.props.history.push(`/address/${input}`);
      this.refs.input.value = "";
    }
  }
  render() {
    return (
      <div>
        <div>
          <input ref="input" placeholder="address / block" />
          <button onClick={this.addressLookup}>Submit</button>
        </div>
        <main>
          <Route path="/address/:address" component={Address} />
          <Route path="/block/:blockno" component={Block} />
        </main>
      </div>
    );
  }
}

export default withRouter(App);
