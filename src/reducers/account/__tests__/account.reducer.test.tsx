import React from "react";
import reducer from "../account.reducer";
import * as constants from "../account.constants";
import INITIAL_ACCOUNT_MODEL from "../account.model";
import { DEFAULT_PRICES, INITIAL_ACCOUNTS } from "../../../common/constants";
import { utilsSetPriceTestData } from "../../../common/utils.data";
import { ExchangeAccountType } from "../../../pages/exchange/components/exchange-account/ExchangeAccount.interface";
import * as utils from "../../../common/utils";

describe("Account reducer", () => {
  it("Should return the initial state if action type not found", () => {
    expect(reducer(undefined, { type: "error", payload: null })).toEqual(
      INITIAL_ACCOUNT_MODEL
    );
  });

  it("Should update source account if action type SET_SOURCE_ACCOUNT", () => {
    expect(
      reducer(undefined, {
        type: constants.SET_SOURCE_ACCOUNT,
        payload: {
          account: INITIAL_ACCOUNTS[2],
        },
      }).sourceAccount
    ).toEqual(INITIAL_ACCOUNTS[2]);
  });

  it("Should update destination account if action type SET_DESTINATION_ACCOUNT", () => {
    expect(
      reducer(undefined, {
        type: constants.SET_DESTINATION_ACCOUNT,
        payload: {
          account: INITIAL_ACCOUNTS[0],
        },
      }).destinationAccount
    ).toEqual(INITIAL_ACCOUNTS[0]);
  });

  it("Should call Calculate function if action type SET_NEW_PRICE and payload data full ", () => {
    const addMock = jest.spyOn(utils, "calculatePrice");
    const payload = {
      ...utilsSetPriceTestData[0].newPriceProps,
      focusInput: ExchangeAccountType.SOURCE,
    };
    reducer(undefined, { type: constants.SET_NEW_PRICE, payload });
    expect(addMock).toBeCalledWith(payload);
    expect(addMock).toBeCalledTimes(1);
  });

  it("Should return the initial state if action type SET_NEW_PRICE but payload data not full ", () => {
    const addMock = jest.spyOn(utils, "calculatePrice");
    const payload = utilsSetPriceTestData[0].newPriceProps;
    const newState = reducer(undefined, {
      type: constants.SET_NEW_PRICE,
      payload,
    });
    expect(addMock).toBeCalledTimes(0);
    expect(newState).toEqual(INITIAL_ACCOUNT_MODEL);
  });

  it("Should call ExchangeMapping function and reset exchange prices if action type EXCHANGE_MONEY", () => {
    const addMock = jest.spyOn(utils, "exchangeMapping");
    const newState = reducer(undefined, {
      type: constants.EXCHANGE_MONEY,
      payload: {},
    });
    expect(addMock).toBeCalledTimes(INITIAL_ACCOUNT_MODEL.accounts.length);
    expect(newState.destinationPrice).toEqual(DEFAULT_PRICES.destinationPrice);
    expect(newState.sourcePrice).toEqual(DEFAULT_PRICES.sourcePrice);
  });
});
