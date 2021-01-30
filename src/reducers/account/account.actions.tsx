import * as constants from "./account.constants";
import { store } from "../../store";

export const readAccounts = () =>
  store.dispatch({
    type: constants.ACCOUNTS
  });
