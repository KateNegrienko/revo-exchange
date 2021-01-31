import { Account } from "../data/Account";
import { DataState } from "../reducers/account/account.types";

export const exchangeMapping = (
  { id, value }: Account,
  state: DataState
): Account => {
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
};
