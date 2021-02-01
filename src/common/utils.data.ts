import { IRate } from "../data/Rate";
import { CURRENCIES, INITIAL_ACCOUNTS } from "./constants";

export const TEST_RATES: IRate[] = [
  {
    key: CURRENCIES.USD,
    value: CURRENCIES.USD,
    text: CURRENCIES.USD,
    price: 1,
  },
  {
    key: CURRENCIES.EUR,
    value: CURRENCIES.EUR,
    text: CURRENCIES.EUR,
    price: 0.82,
  },
  {
    key: CURRENCIES.GBP,
    value: CURRENCIES.GBP,
    text: CURRENCIES.GBP,
    price: 0.73,
  },
];

export const utilsPriceTestData = [
  {
    sourceData: {
      price: 10,
      sourceRate: 0.73,
      destinationRate: 0.82,
    },
    expectedDataForSource: {
      destinationPrice: "11.23",
      sourcePrice: "10",
    },
    expectedDataForDestination: {
      destinationPrice: "10",
      sourcePrice: "8.9",
    },
  },
  {
    sourceData: {
      price: 4,
      sourceRate: 0.82,
      destinationRate: 0.73,
    },
    expectedDataForSource: {
      destinationPrice: "3.56",
      sourcePrice: "4",
    },
    expectedDataForDestination: {
      destinationPrice: "4",
      sourcePrice: "4.49",
    },
  },
];

export const utilsSetPriceTestData = [
  {
    newPriceProps: {
      rates: TEST_RATES,
      price: 10,
      sourceAccount: INITIAL_ACCOUNTS[0],
      destinationAccount: INITIAL_ACCOUNTS[1],
    },
    expectedDataForSource: {
      destinationPrice: "8.9",
      sourcePrice: "10",
    },
    expectedDataForDestination: {
      destinationPrice: "10",
      sourcePrice: "11.23",
    },
  },
  {
    newPriceProps: {
      rates: TEST_RATES,
      price: 4,
      sourceAccount: INITIAL_ACCOUNTS[2],
      destinationAccount: INITIAL_ACCOUNTS[0],
    },
    expectedDataForSource: {
      destinationPrice: "3.28",
      sourcePrice: "4",
    },
    expectedDataForDestination: {
      destinationPrice: "4",
      sourcePrice: "4.87",
    },
  },
];
