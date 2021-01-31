import { CURRENCIES } from "../common/constants";

export interface Rate {
  id: CURRENCIES;
  price: number;
}
