import { ExchangeAccountType } from "../pages/exchange/components/exchange-account/ExchangeAccount.interface";
import { IBankAccount } from "./Account";
import { IRate } from "./Rate";

export interface INewPriceProps {
  rates: IRate[];
  type: ExchangeAccountType;
  price: number;
  sourceAccount: IBankAccount;
  destinationAccount: IBankAccount;
}
