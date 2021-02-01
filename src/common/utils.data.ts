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
    price: 2,
  },
  {
    key: CURRENCIES.GBP,
    value: CURRENCIES.GBP,
    text: CURRENCIES.GBP,
    price: 3,
  },
];

export const utilsPriceTestData = [
  {
    sourceData: {
      price: 10,
      sourceRate: 2,
      destinationRate: 3,
    },
    expectedDataForSource: {
      destinationPrice: "6.67",
      sourcePrice: "10",
    },
    expectedDataForDestination: {
      destinationPrice: "10",
      sourcePrice: "15",
    },
  },
  {
    sourceData: {
      price: 4,
      sourceRate: 1,
      destinationRate: 3,
    },
    expectedDataForSource: {
      destinationPrice: "1.34",
      sourcePrice: "4",
    },
    expectedDataForDestination: {
      destinationPrice: "4",
      sourcePrice: "12",
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
      destinationPrice: "6.67",
      sourcePrice: "10",
    },
    expectedDataForDestination: {
      destinationPrice: "10",
      sourcePrice: "15",
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
      destinationPrice: "2",
      sourcePrice: "4",
    },
    expectedDataForDestination: {
      destinationPrice: "4",
      sourcePrice: "8",
    },
  },
];
