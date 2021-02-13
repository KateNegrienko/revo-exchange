import Immutable from "seamless-immutable";

import { ExchangeAccountType } from "../../pages/exchange/components/exchange-account/ExchangeAccount.interface";
import { DEFAULT_PRICES, INITIAL_ACCOUNTS } from "../constants";
import {
  calculatePrice,
  exchangeMapping,
  getPriceWithDestinationType,
  getPriceWithSourceType,
  validation,
} from "../utils";
import { utilsPriceTestData, utilsSetPriceTestData } from "../utils.data";

describe("[Utils tests]", () => {
  it("[getPriceWithSourceType] Should return correct echanged prices for SourceType", () => {
    utilsPriceTestData.forEach((element) => {
      const { sourceData, expectedDataForSource } = element;
      const newPrice = getPriceWithSourceType(sourceData);
      expect(newPrice).toEqual(expectedDataForSource);
    });
  });
  it("[getPriceWithDestinationType] Should return correct exchanged prices for DisitnationType", () => {
    utilsPriceTestData.forEach((element) => {
      const { sourceData, expectedDataForDestination } = element;
      const newPrice = getPriceWithDestinationType(sourceData);
      expect(newPrice).toEqual(expectedDataForDestination);
    });
  });

  it("[calculatePrice] Should return correct exchanged prices after change Source input if rates found", () => {
    utilsSetPriceTestData.forEach((element) => {
      const { expectedDataForSource, newPriceProps } = element;
      const price = calculatePrice({
        ...newPriceProps,
        focusInput: ExchangeAccountType.SOURCE,
      });
      expect(price).toEqual(expectedDataForSource);
    });
  });

  it("[calculatePrice] Should return correct exchanged prices after change Disitination input if rates found", () => {
    utilsSetPriceTestData.forEach((element) => {
      const { expectedDataForDestination, newPriceProps } = element;
      const price = calculatePrice({
        ...newPriceProps,
        focusInput: ExchangeAccountType.DESTINATION,
      });
      expect(price).toEqual(expectedDataForDestination);
    });
  });

  it("[calculatePrice] Should return empty exchanged prices if rates not found", () => {
    const price = calculatePrice({
      focusInput: ExchangeAccountType.SOURCE,
      price: 10,
      rates: [],
      sourceAccount: INITIAL_ACCOUNTS[0],
      destinationAccount: INITIAL_ACCOUNTS[1],
    });
    expect(price).toEqual(DEFAULT_PRICES);
  });

  it("[calculatePrice] Should return empty exchanged prices if price = 0", () => {
    const price = calculatePrice({
      focusInput: ExchangeAccountType.SOURCE,
      price: 0,
      rates: [],
      sourceAccount: INITIAL_ACCOUNTS[0],
      destinationAccount: INITIAL_ACCOUNTS[1],
    });
    expect(price).toEqual(DEFAULT_PRICES);
  });

  it("[exchangeMapping] Should return same account if current account != destination and source accounts", () => {
    const state = Immutable({
      sourcePrice: "10",
      destinationPrice: "10",
      sourceAccount: INITIAL_ACCOUNTS[1],
      destinationAccount: INITIAL_ACCOUNTS[2],
      accounts: INITIAL_ACCOUNTS,
    });
    const initialAccount = INITIAL_ACCOUNTS[0];

    const changedAccount = exchangeMapping(initialAccount, state);

    expect(changedAccount).toEqual(initialAccount);
  });

  it("[exchangeMapping] Should return residual from source and current price for price if current account == source account", () => {
    const state = Immutable({
      destinationPrice: "",
      sourcePrice: "10",
      sourceAccount: INITIAL_ACCOUNTS[1],
      destinationAccount: INITIAL_ACCOUNTS[2],
      accounts: INITIAL_ACCOUNTS,
    });
    const initialAccount = INITIAL_ACCOUNTS[1];

    const { id, value } = exchangeMapping(initialAccount, state);

    expect(value).toEqual(90);
    expect(id).toEqual(initialAccount.id);
  });

  it("[exchangeMapping] Should return sum from destination and current price for price if current account == destination account", () => {
    const state = Immutable({
      destinationPrice: "10",
      sourcePrice: "",
      sourceAccount: INITIAL_ACCOUNTS[2],
      destinationAccount: INITIAL_ACCOUNTS[0],
      accounts: INITIAL_ACCOUNTS,
    });
    const initialAccount = INITIAL_ACCOUNTS[0];

    const { id, value } = exchangeMapping(initialAccount, state);

    expect(value).toEqual(60.3);
    expect(id).toEqual(initialAccount.id);
  });

  it("[validation] Should return empty string if balance >- than exhangedMoney and type == source", () => {
    const error = validation(ExchangeAccountType.SOURCE, 500, 10);
    expect(error).toEqual("");
  });

  it("[validation] Should return empty string if type == destination", () => {
    let error = validation(ExchangeAccountType.DESTINATION, 500, 10);
    expect(error).toEqual("");

    error = validation(ExchangeAccountType.DESTINATION, 0, 10);
    expect(error).toEqual("");
  });

  it("[validation] Should return error message string if balance < than exhangedMoney and type == source", () => {
    const error = validation(ExchangeAccountType.SOURCE, 0, 10);
    expect(error).toEqual(
      "You cannot change more money than there is in your account"
    );
  });
});
