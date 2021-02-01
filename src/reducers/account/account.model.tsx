import Immutable from "seamless-immutable";
import { CURRENCIES, DEFAULT_PRICES } from "../../common/constants";
import { IBankAccount } from "../../data/Account";

export const INITIAL_ACCOUNTS: IBankAccount[] = [
  {
    id: CURRENCIES.EUR,
    value: 50.3,
    symbol: "€",
  },
  {
    id: CURRENCIES.GBP,
    value: 100,
    symbol: "£",
  },
  {
    id: CURRENCIES.USD,
    value: 50,
    symbol: "$",
  },
];

export default Immutable({
  ...DEFAULT_PRICES,
  sourceAccount: INITIAL_ACCOUNTS[0],
  destinationAccount: INITIAL_ACCOUNTS[1],
  accounts: INITIAL_ACCOUNTS, // TODO in real app we have empty array here and get current situation from server using redux and saga
});
