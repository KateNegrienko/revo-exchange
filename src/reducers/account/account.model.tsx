import Immutable from "seamless-immutable";
import { DEFAULT_PRICES, INITIAL_ACCOUNTS } from "../../common/constants";
export const INITIAL_ACCOUNT_MODEL = {
  ...DEFAULT_PRICES,
  sourceAccount: INITIAL_ACCOUNTS[0],
  destinationAccount: INITIAL_ACCOUNTS[1],
  accounts: INITIAL_ACCOUNTS, // TODO in real app we have empty array here and get current situation from server using redux and saga
};

export default Immutable(INITIAL_ACCOUNT_MODEL);
