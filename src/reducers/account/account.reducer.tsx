import { Account } from "../../data/Account";
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
      return state.merge({
        destinationPrice: payload.destinationPrice,
        sourcePrice: payload.sourcePrice,
      });

    case constants.EXCHANGE_MONEY:
      const accounts = state.accounts.map(({ id, value }: Account) => {
        switch (id) {
          case state.sourceAccount.id:
            return {
              id,
              value: value - Number(state.sourcePrice),
            };

          case state.destinationAccount.id:
            return {
              id: id,
              value: value + Number(state.destinationPrice),
            };

          default:
            return { id, value };
        }
      });
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
