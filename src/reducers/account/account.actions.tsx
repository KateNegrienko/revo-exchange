import * as constants from "./account.constants";
import { store } from "../../store";
import { ExchangeAccountType } from "../../pages/exchange/components/exchange-account/ExchangeAccount.interface";
import { Rate } from "../../data/Rate";
import { Account } from "../../data/Account";

export const exchangeMoney = () =>
  store.dispatch({
    type: constants.EXCHANGE_MONEY,
  });

export const setNewPrice = (
  rates: Rate[],
  type: ExchangeAccountType,
  price: number
) => {
  store.dispatch({
    type: constants.SET_NEW_PRICE,
    payload: {
      type,
      rates,
      price,
    },
  });
};

export const setNewAccount = (type: string, account: Account) =>
  store.dispatch({
    type,
    payload: account,
  });
