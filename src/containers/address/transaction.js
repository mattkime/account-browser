import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Transaction = ({ hash, blockNumber, from, to, value }) => {
  const valToEthereum = val => val / 1000000000000000000;
  return (
    <tr>
      <td>{hash.substring(0, 16)}</td>
      <td>
        <Link to={`/block/${blockNumber}`}>{blockNumber}</Link>
      </td>
      <td>
        <Link to={`/address/${from}`}>{from.substring(0, 16)}…</Link>
      </td>
      <td>
        <Link to={`/address/${to}`}>{to.substring(0, 16)}…</Link>
      </td>
      <td>{valToEthereum(value)}</td>
    </tr>
  );
};

Transaction.propTypes = {
  hash: PropTypes.string.isRequired,
  blockNumber: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default Transaction;
