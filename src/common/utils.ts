import { IBankAccount } from "../data/Account";
import { IExchangeSource } from "../data/ExchangeSource";
import { INewPriceProps } from "../data/NewPriceProps";
import { IRate } from "../data/Rate";
import { ExchangeAccountType } from "../pages/exchange/components/exchange-account/ExchangeAccount.interface";
import { DataState } from "../reducers/account/account.types";
import { DEFAULT_PRICES } from "./constants";

export const round = (value: number) => {
  return Math.ceil(value * 100) / 100;
};

export const exchangeMapping = (
  { id, value, symbol }: IBankAccount,
  state: DataState
): IBankAccount => {
  switch (id) {
    case state.sourceAccount.id:
      return {
        id,
        symbol,
        value: round(value - Number(state.sourcePrice)),
      };

    case state.destinationAccount.id:
      return {
        id,
        symbol,
        value: round(value + Number(state.destinationPrice)),
      };

    default:
      return { id, value, symbol };
  }
};

export const findRate = (rates: IRate[], rateId: string) => {
  return rates.find(({ key }: IRate) => key === rateId)?.price;
};

export const getPriceWithSourceType = ({
  price,
  sourceRate,
  destinationRate,
}: IExchangeSource) => {
  const destination = round((price / sourceRate) * destinationRate);
  return {
    destinationPrice: destination.toString(),
    sourcePrice: price.toString(),
  };
};

export const getPriceWithDestinationType = ({
  price,
  sourceRate,
  destinationRate,
}: IExchangeSource) => {
  const source = round((price / destinationRate) * sourceRate);

  return {
    destinationPrice: price.toString(),
    sourcePrice: source.toString(),
  };
};

export const setNewPrice = ({
  rates,
  focusInput,
  price,
  sourceAccount,
  destinationAccount,
}: INewPriceProps) => {
  const sourceRate = findRate(rates, sourceAccount.id);
  const destinationRate = findRate(rates, destinationAccount.id);

  if (sourceRate && destinationRate && price > 0) {
    switch (focusInput) {
      case ExchangeAccountType.SOURCE:
        return getPriceWithSourceType({ price, sourceRate, destinationRate });

      case ExchangeAccountType.DESTINATION:
        return getPriceWithDestinationType({
          price,
          sourceRate,
          destinationRate,
        });
    }
  }
  return DEFAULT_PRICES;
};
