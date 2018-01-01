import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

const TRANSACTIONS_UPDATE = "transactions/update";
const BLOCK_UPDATE = "block/update";

export const updateTransactions = payload => ({
  type: TRANSACTIONS_UPDATE,
  payload
});

export const updateBlock = payload => ({
  type: BLOCK_UPDATE,
  payload
});

const transactions = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case TRANSACTIONS_UPDATE:
      return action.payload;
    default:
      return state;
  }
};

const block = (state = {}, action) => {
  switch (action.type) {
    case BLOCK_UPDATE:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  transactions,
  block,
  router: routerReducer
});
