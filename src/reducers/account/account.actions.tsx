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
  price: number,
  source: Account,
  destination: Account
) => {
  const sourcePrice = rates.find(({ id }) => id === source.id)?.price;
  const destinationPrice = rates.find(({ id }) => id === destination.id)?.price;

  if (sourcePrice && destinationPrice) {
    switch (type) {
      case ExchangeAccountType.SOURCE:
        const destination = (price * sourcePrice) / destinationPrice;
        return store.dispatch({
          type: constants.SET_NEW_PRICE,
          payload: {
            sourcePrice: price,
            destinationPrice: parseFloat(destination.toString()).toFixed(2),
          },
        });

      case ExchangeAccountType.DESTINATION:
        const source = (price * destinationPrice) / sourcePrice;
        return store.dispatch({
          type: constants.SET_NEW_PRICE,
          payload: {
            sourcePrice: parseFloat(source.toString()).toFixed(2),
            destinationPrice: price,
          },
        });
    }
  }
};

export const setNewAccount = (type: string, account: Account) =>
  store.dispatch({
    type,
    payload: account,
  });
