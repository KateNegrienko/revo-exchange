import { combineReducers } from "redux";
import account from "./account/account.reducer";
import { accountState } from "./account/account.types";
import currency from "./currency/currency.reducer";
import { currencyState } from "./currency/currency.types";

export interface IState {
  account: accountState;
  currency: currencyState;
}

export default combineReducers({
  account,
  currency,
  // TODO next reducers
});
