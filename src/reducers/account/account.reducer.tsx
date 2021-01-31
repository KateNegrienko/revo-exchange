import { exchangeMapping } from "../../common/utils";
import { Rate } from "../../data/Rate";
import { ExchangeAccountType } from "../../pages/exchange/components/exchange-account/ExchangeAccount.interface";
import * as constants from "./account.constants";
import Model from "./account.model";
import { DataState, Actions } from "./account.types";

export default function account(
  state: DataState = Model,
  { type, payload }: Actions
) {
  switch (type) {
    case constants.SET_DESTINATION_ACCOUNT:
      return state.merge({
        destinationAccount: payload,
      });
    case constants.SET_SOURCE_ACCOUNT:
      return state.merge({
        sourceAccount: payload,
      });

    case constants.SET_NEW_PRICE:
      const sourceRate = payload.rates.find(
        ({ id }: Rate) => id === state.sourceAccount.id
      )?.price;
      const destinationRate = payload.rates.find(
        ({ id }: Rate) => id === state.destinationAccount.id
      )?.price;
      if (sourceRate && destinationRate) {
        switch (payload.type) {
          case ExchangeAccountType.SOURCE:
            const destination = (payload.price * sourceRate) / destinationRate;
            return state.merge({
              destinationPrice: parseFloat(destination.toString()).toFixed(2),
              sourcePrice: payload.price,
            });

          case ExchangeAccountType.DESTINATION:
            const source = (payload.price * destinationRate) / sourceRate;
            return state.merge({
              destinationPrice: payload.price,
              sourcePrice: parseFloat(source.toString()).toFixed(2),
            });
        }
      }
      return state;

    case constants.EXCHANGE_MONEY:
      const accounts = state.accounts.map((item) =>
        exchangeMapping(item, state)
      );
      return state.merge({
        accounts,
        destinationPrice: "",
        sourcePrice: "",
        sourceAccount: accounts[0],
        destinationAccount: accounts[1],
      });

    default:
      return state;
  }
}
