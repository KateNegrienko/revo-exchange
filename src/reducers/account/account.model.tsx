import Immutable from "seamless-immutable";
import { CURRENCIES } from "../../common/constants";
import { Account } from "../../data/Account";

export const INITIAL_ACCOUNTS: Account[] = [
  {
    id: CURRENCIES.EUR,
    value: 50.3,
  },
  {
    id: CURRENCIES.GBP,
    value: 100,
  },
  {
    id: CURRENCIES.USD,
    value: 50,
  },
];

export default Immutable({
  loading: false,
  error: undefined,
  accounts: INITIAL_ACCOUNTS, // TODO in real app we have empty array here and get current situation from server using redux and saga
});
