import { combineReducers } from "redux";
import account from "./account/account.reducer";
import currency from "./currency/currency.reducer";

export default combineReducers({
  account,
  currency,
  // TODO next reducers
});
