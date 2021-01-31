import * as constants from "./account.constants";
import { store } from "../../store";
import { CURRENCIES } from "../../common/constants";

export const exchangeMoney = (
  sourceAccountId: CURRENCIES,
  destinationAccountId: CURRENCIES,
  sourcePrice: number,
  destinationPrice: number
) =>
  store.dispatch({
    type: constants.EXCHANGE_MONEY,
    payload: {
      sourceAccountId,
      destinationAccountId,
      sourcePrice,
      destinationPrice,
    },
  });
