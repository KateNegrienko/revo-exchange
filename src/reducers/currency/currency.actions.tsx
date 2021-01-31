import * as constants from "./currency.constants";
import { store } from "../../store";

export const readExchangeRate = () =>
  store.dispatch({
    type: constants.READ_EXCHANGE_RATES,
  });
