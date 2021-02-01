import { CURRENCIES } from "../common/constants";

export interface IRate {
  price: number;
  key: CURRENCIES;
  value: CURRENCIES;
  text: CURRENCIES;
}
