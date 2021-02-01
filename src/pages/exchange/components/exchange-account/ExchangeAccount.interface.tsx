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
  price?: string;
  type: ExchangeAccountType;
  onChangePrice: (type: ExchangeAccountType, price: string) => void;
  onChangeAccount: (type: ExchangeAccountType, accountId: CURRENCIES) => void;
}
