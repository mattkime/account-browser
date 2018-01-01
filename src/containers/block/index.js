import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import { updateBlock } from "../../modules";

function mapStateToProps(state) {
  return {
    pathname: state.router.location.pathname,
    block: state.block
  };
}

const mapDispatchToProps = dispatch => ({
  dispatchBlock: block => dispatch(updateBlock(block))
});

class Block extends Component {
  constructor() {
    super();
    this.blockFetch = this.blockFetch.bind(this);
  }
  componentDidMount() {
    this.blockFetch(this.props.match.params.blockno);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.blockno !== this.props.match.params.blockno) {
      this.blockFetch(nextProps.match.params.blockno);
    }
  }
  blockFetch(blockno) {
    const params = new URLSearchParams({
      module: "block",
      action: "getblockreward",
      blockno,
      apikey: "VEZ1FMIZEQ7R9VJ9KWW4D43J76P26DXP9"
    });
    //address=0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae
    //https://api.etherscan.io/api?module=block&action=getblockreward&blockno=2165403&apikey=YourApiKeyToken

    fetch(`http://api.etherscan.io/api?${params.toString()}`)
      .then(results => results.json())
      .then(content => {
        console.log("hi", content.result);
        this.props.dispatchBlock(content.result);
      });
  }
  render() {
    const { block } = this.props;
    const valToEthereum = val => val / 1000000000000000000;

    return block && block.blockNumber ? (
      <table className="data_table">
        <tbody>
          <tr>
            <td>Block Number</td>
            <td>{block.blockNumber}</td>
          </tr>
          <tr>
            <td>Miner</td>
            <td>
              <Link to={`/address/${block.blockMiner}`}>
                {block.blockMiner}
              </Link>
            </td>
          </tr>
          <tr>
            <td>Reward</td>
            <td>{valToEthereum(block.blockReward)}</td>
          </tr>
        </tbody>
      </table>
    ) : null;
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Block));
