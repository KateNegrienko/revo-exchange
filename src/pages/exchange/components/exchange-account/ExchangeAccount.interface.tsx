import { CURRENCIES } from "../../../../common/constants";
import { Account } from "../../../../data/Account";
import { Rate } from "../../../../data/Rate";

export enum ExchangeAccountType {
  SOURCE = "source",
  DESTINATION = "destination",
}

export interface IExchangeAccountProps {
  account: Account;
  rates: Rate[];
  price?: number | string;
  type: ExchangeAccountType;
  onChangePrice: (type: ExchangeAccountType, price: number | string) => void;
  onChangeAccount: (type: ExchangeAccountType, accountId: CURRENCIES) => void;
}
