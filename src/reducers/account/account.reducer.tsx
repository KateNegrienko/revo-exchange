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
      const updatedAccounts = state.accounts.map((item: Account) => {
        if (item.id !== payload.currency) return item;
        return {
          id: item.id,
          value: item.value - payload.money,
        };
      });
      return state.merge({
        accounts: updatedAccounts,
      });

    default:
      return state;
  }
}
