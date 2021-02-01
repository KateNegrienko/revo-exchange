import * as constants from "./account.constants";
import { store } from "../../store";
import { ExchangeAccountType } from "../../pages/exchange/components/exchange-account/ExchangeAccount.interface";
import { IRate } from "../../data/Rate";
import { IBankAccount } from "../../data/Account";

export const exchangeMoney = () =>
  store.dispatch({
    type: constants.EXCHANGE_MONEY,
  });

export const setNewPrice = (
  rates: IRate[],
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

export const setNewAccount = (type: string, payload: IBankAccount) =>
  store.dispatch({
    type,
    payload,
  });
