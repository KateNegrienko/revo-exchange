import { ExchangeAccountType } from "../../pages/exchange/components/exchange-account/ExchangeAccount.interface";
import { DEFAULT_PRICES, INITIAL_ACCOUNTS } from "../constants";
import {
  getPriceWithDestinationType,
  getPriceWithSourceType,
  setNewPrice,
} from "../utils";
import { utilsPriceTestData, utilsSetPriceTestData } from "../utils.data";

describe("[Utils tests]", () => {
  it("Should return correct echanged prices for SourceType", () => {
    utilsPriceTestData.forEach((element) => {
      const { sourceData, expectedDataForSource } = element;
      const newPrice = getPriceWithSourceType({ ...sourceData });
      expect(newPrice).toEqual(expectedDataForSource);
    });
  });
  it("Should return correct exchanged prices for DisitnationType", () => {
    utilsPriceTestData.forEach((element) => {
      const { sourceData, expectedDataForDestination } = element;
      const newPrice = getPriceWithDestinationType({ ...sourceData });
      expect(newPrice).toEqual(expectedDataForDestination);
    });
  });

  it("Should return correct exchanged prices after change Source input if rates found", () => {
    utilsSetPriceTestData.forEach((element) => {
      const { expectedDataForSource, newPriceProps } = element;
      const price = setNewPrice({
        ...newPriceProps,
        focusInput: ExchangeAccountType.SOURCE,
      });
      expect(price).toEqual(expectedDataForSource);
    });
  });

  it("Should return correct exchanged prices after change Disitination input if rates found", () => {
    utilsSetPriceTestData.forEach((element) => {
      const { expectedDataForDestination, newPriceProps } = element;
      const price = setNewPrice({
        ...newPriceProps,
        focusInput: ExchangeAccountType.DESTINATION,
      });
      expect(price).toEqual(expectedDataForDestination);
    });
  });

  it("Should return empty exchanged prices if rates not found", () => {
    const price = setNewPrice({
      focusInput: ExchangeAccountType.SOURCE,
      price: 10,
      rates: [],
      sourceAccount: INITIAL_ACCOUNTS[0],
      destinationAccount: INITIAL_ACCOUNTS[1],
    });
    expect(price).toEqual(DEFAULT_PRICES);
  });

  it("Should return empty exchanged prices if price = 0", () => {
    const price = setNewPrice({
      focusInput: ExchangeAccountType.SOURCE,
      price: 0,
      rates: [],
      sourceAccount: INITIAL_ACCOUNTS[0],
      destinationAccount: INITIAL_ACCOUNTS[1],
    });
    expect(price).toEqual(DEFAULT_PRICES);
  });
});
