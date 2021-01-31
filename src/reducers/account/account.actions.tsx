import * as constants from "./account.constants";
import { store } from "../../store";
import { CURRENCIES } from "../../common/constants";

export const exchangeMoney = (currency: CURRENCIES, money: number) =>
  store.dispatch({
    type: constants.EXCHANGE_MONEY,
    payload: {
      currency,
      money,
    },
  });
