import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { updateTransactions } from "../../modules";
import Transaction from "./transaction";

function mapStateToProps(state) {
  return {
    pathname: state.router.location.pathname,
    transactions: state.transactions
  };
}

const mapDispatchToProps = dispatch => ({
  dispatchTransactions: transactions =>
    dispatch(updateTransactions(transactions))
});

class Address extends Component {
  constructor() {
    super();
    this.state = {
      transactions: []
    };
    this.addressFetch = this.addressFetch.bind(this);
  }
  componentDidMount() {
    this.addressFetch(this.props.match.params.address);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.address !== this.props.match.params.address) {
      this.addressFetch(nextProps.match.params.address);
    }
  }
  addressFetch(address) {
    const params = new URLSearchParams({
      module: "account",
      action: "txlist",
      address,
      page: 1,
      offset: 10,
      sort: "desc",
      apikey: "VEZ1FMIZEQ7R9VJ9KWW4D43J76P26DXP9"
    });

    fetch(`http://api.etherscan.io/api?${params.toString()}`)
      .then(results => results.json())
      .then(content => {
        this.props.dispatchTransactions(content.result);
      });
  }
  render() {
    const { transactions } = this.props;
    const transactionRows = transactions.map(item => (
      <Transaction {...item} key={item.hash} hash={item.hash} />
    ));

    return (
      <table className="data_table">
        <thead>
          <tr>
            <td>txHash</td>
            <td>Block</td>
            <td>From</td>
            <td>To</td>
            <td>Value (Ether)</td>
          </tr>
        </thead>
        <tbody>{transactionRows}</tbody>
      </table>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Address)
);
