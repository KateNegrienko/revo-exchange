import { CURRENCIES } from "../../../../common/constants";
import { IBankAccount } from "../../../../data/Account";
import { IRate } from "../../../../data/Rate";

export enum ExchangeAccountType {
  SOURCE = "source",
  DESTINATION = "destination",
}

export interface IExchangeAccountProps {
  account: IBankAccount;
  rates: IRate[];
  price?: number | string;
  type: ExchangeAccountType;
  onChangePrice: (type: ExchangeAccountType, price: number | string) => void;
  onChangeAccount: (type: ExchangeAccountType, accountId: CURRENCIES) => void;
}
