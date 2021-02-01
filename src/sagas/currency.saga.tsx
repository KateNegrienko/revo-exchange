import { put, takeEvery } from "redux-saga/effects";
import { CURRENCIES } from "../common/constants";
import { IRate } from "../data/Rate";
import * as constants from "../reducers/currency/currency.constants";

export function* watcherDataSaga() {
  yield takeEvery(constants.READ_EXCHANGE_RATES, readExchangeSaga);
}

export function* readExchangeSaga() {
  try {
    const rates: IRate[] = [
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
        price: 2, //1 + Math.floor(Math.random() * Math.floor(3)),
      },
      {
        key: CURRENCIES.GBP,
        value: CURRENCIES.GBP,
        text: CURRENCIES.GBP,
        price: 3, //1 + Math.floor(Math.random() * Math.floor(3)),
      },
    ];
    yield put({
      type: constants.READ_EXCHANGE_RATES_SUCCESS,
      payload: rates,
    });
  } catch (error) {
    yield put({
      type: constants.READ_EXCHANGE_RATES_ERROR,
      payload: { error },
    });
  }
}
