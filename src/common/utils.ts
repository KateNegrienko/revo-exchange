import { Account } from "../data/Account";
import { Rate } from "../data/Rate";
import { ExchangeAccountType } from "../pages/exchange/components/exchange-account/ExchangeAccount.interface";
import { DataState } from "../reducers/account/account.types";

export const exchangeMapping = (
  { id, value }: Account,
  state: DataState
): Account => {
  switch (id) {
    case state.sourceAccount.id:
      return {
        id,
        value: value - Number(state.sourcePrice),
      };

    case state.destinationAccount.id:
      return {
        id: id,
        value: value + Number(state.destinationPrice),
      };

    default:
      return { id, value };
  }
};

export const setNewPrice = (
  rates: Rate[],
  type: ExchangeAccountType,
  price: number,
  sourceAccount: Account,
  destinationAccount: Account
): { destinationPrice: string; sourcePrice: string } => {
  const sourceRate = rates.find(({ id }: Rate) => id === sourceAccount.id)
    ?.price;
  const destinationRate = rates.find(
    ({ id }: Rate) => id === destinationAccount.id
  )?.price;
  if (sourceRate && destinationRate) {
    switch (type) {
      case ExchangeAccountType.SOURCE:
        const destination = (price * sourceRate) / destinationRate;
        return {
          destinationPrice: parseFloat(destination.toString()).toFixed(2),
          sourcePrice: price.toString(),
        };

      case ExchangeAccountType.DESTINATION:
        const source = (price * destinationRate) / sourceRate;
        return {
          destinationPrice: price.toString(),
          sourcePrice: parseFloat(source.toString()).toFixed(2),
        };
    }
  }
  return {
    destinationPrice: "",
    sourcePrice: "",
  };
};
