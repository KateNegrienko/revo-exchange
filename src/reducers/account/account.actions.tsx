import * as constants from "./account.constants";
import { store } from "../../store";
import { ExchangeAccountType } from "../../pages/exchange/components/exchange-account/ExchangeAccount.interface";
import { IRate } from "../../data/Rate";
import { IBankAccount } from "../../data/Account";

export const exchangeMoney = () =>
  store.dispatch({
    type: constants.EXCHANGE_MONEY,
  });

export const setNewPrice = (payload: {
  rates: IRate[];
  focusInput: ExchangeAccountType;
  price: number;
}) => {
  store.dispatch({
    type: constants.SET_NEW_PRICE,
    payload,
  });
};

export const setNewAccount = (
  type: string,
  account: IBankAccount,
  focusInput: ExchangeAccountType
) =>
  store.dispatch({
    type,
    payload: {
      account,
      focusInput,
    },
  });
