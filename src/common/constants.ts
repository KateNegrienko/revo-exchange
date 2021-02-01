import { IBankAccount } from "../data/Account";

export enum CURRENCIES {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
}

export const DEFAULT_PRICES = {
  destinationPrice: "",
  sourcePrice: "",
};

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
