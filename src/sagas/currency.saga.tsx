import { put, takeEvery } from "redux-saga/effects";
import { CURRENCIES } from "../common/constants";
import { Rate } from "../data/Rate";
import * as constants from "../reducers/currency/currency.constants";

export function* watcherDataSaga() {
  yield takeEvery(constants.READ_EXCHANGE_RATES, readExchangeSaga);
}

export function* readExchangeSaga() {
  try {
    const rates: Rate[] = [
      {
        id: CURRENCIES.USD,
        price: 1,
      },
      {
        id: CURRENCIES.EUR,
        price: 1 + Math.floor(Math.random() * Math.floor(3)),
      },
      {
        id: CURRENCIES.GBP,
        price: 1 + Math.floor(Math.random() * Math.floor(3)),
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
