import * as constants from "./account.constants";
import Model from "./account.model";
import { DataState, Actions } from "./account.types";

export default function account(
  state: DataState = Model,
  { type, payload }: Actions
) {
  switch (type) {
    case constants.ACCOUNTS:
      return state.merge({
        loading: true,
        error: undefined,
      });

    case constants.ACCOUNTS_ERROR:
      return state.merge({
        loading: false,
        error: payload.error,
      });

    case constants.ACCOUNTS_SUCCESS:
      return state.merge({
        loading: false,
        error: undefined,
        accounts: payload.accounts, // TODO
      });

    default:
      return state;
  }
}
