import { IBankAccount } from "../data/Account";
import { IExchangeSource } from "../data/ExchangeSource";
import { INewPriceProps } from "../data/NewPriceProps";
import { IRate } from "../data/Rate";
import { ExchangeAccountType } from "../pages/exchange/components/exchange-account/ExchangeAccount.interface";
import { DataState } from "../reducers/account/account.types";
import { DEFAULT_PRICES } from "./constants";

export const round = (value: number) => {
  return Math.floor(value * 100) / 100;
};

export const validation = (
  type: ExchangeAccountType,
  balance: number,
  money: number
): string => {
  return money > balance && type === ExchangeAccountType.SOURCE
    ? "You cannot change more money than there is in your account"
    : "";
};

export const exchangeMapping = (
  item: IBankAccount,
  state: DataState
): IBankAccount => {
  switch (item.id) {
    case state.sourceAccount.id:
      return {
        ...item,
        value: round(item.value - Number(state.sourcePrice)),
      };

    case state.destinationAccount.id:
      return {
        ...item,
        value: round(item.value + Number(state.destinationPrice)),
      };

    default:
      return item;
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

export const calculatePrice = ({
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
