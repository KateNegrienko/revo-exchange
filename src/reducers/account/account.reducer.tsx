import { Account } from "../../data/Account";
import * as constants from "./account.constants";
import Model from "./account.model";
import { DataState, Actions } from "./account.types";

export default function account(
  state: DataState = Model,
  { type, payload }: Actions
) {
  switch (type) {
    case constants.EXCHANGE_MONEY:
      const updatedAccounts = state.accounts.map(({ id, value }: Account) => {
        switch (id) {
          case payload.sourceAccountId:
            return {
              id,
              value: value - payload.sourcePrice,
            };

          case payload.destinationAccountId:
            return {
              id: id,
              value: value + payload.destinationPrice,
            };

          default:
            return { id, value };
        }
      });
      return state.merge({
        accounts: updatedAccounts,
      });

    default:
      return state;
  }
}
