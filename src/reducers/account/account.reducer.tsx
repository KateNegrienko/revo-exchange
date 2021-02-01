import { DEFAULT_PRICES } from "../../common/constants";
import { exchangeMapping, setNewPrice } from "../../common/utils";
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
      return state.merge(
        setNewPrice({
          ...payload,
          sourceAccount: state.sourceAccount,
          destinationAccount: state.destinationAccount,
        })
      );

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
