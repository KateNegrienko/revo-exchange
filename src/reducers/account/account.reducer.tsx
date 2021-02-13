import { DEFAULT_PRICES } from "../../common/constants";
import { calculatePrice, exchangeMapping } from "../../common/utils";
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
        destinationAccount: payload.account,
      });
    case constants.SET_SOURCE_ACCOUNT:
      return state.merge({
        sourceAccount: payload.account,
      });

    case constants.SET_NEW_PRICE:
      const { rates, focusInput, price } = payload;
      return rates && rates.length && focusInput && price
        ? state.merge(
            calculatePrice({
              rates,
              focusInput,
              price,
              sourceAccount: state.sourceAccount,
              destinationAccount: state.destinationAccount,
            })
          )
        : state;

    case constants.EXCHANGE_MONEY:
      const accounts = state.accounts.map((item) =>
        exchangeMapping(item, state)
      );
      return state.merge({
        ...DEFAULT_PRICES,
        accounts,
        sourceAccount: accounts[0],
        destinationAccount: accounts[1],
      });

    default:
      return state;
  }
}
