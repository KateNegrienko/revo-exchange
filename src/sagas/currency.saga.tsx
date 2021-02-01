import { put, takeEvery, call } from "redux-saga/effects";
import { CURRENCIES } from "../common/constants";
import { IRate } from "../data/Rate";
import * as constants from "../reducers/currency/currency.constants";

export function* watcherDataSaga() {
  yield takeEvery(constants.READ_EXCHANGE_RATES, readExchangeSaga);
}

export function* readExchangeSaga() {
  try {
    const url = `https://openexchangerates.org/api/latest.json?app_id=daa76811480f490f948a7af96e127438`;
    const response = yield call(fetch, url);
    if (!response.ok) throw Error("Something went wrong!");
    const responseJson: { rates: any } = yield response.json();
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
        price: responseJson.rates[CURRENCIES.EUR], // ~0.82
      },
      {
        key: CURRENCIES.GBP,
        value: CURRENCIES.GBP,
        text: CURRENCIES.GBP,
        price: responseJson.rates[CURRENCIES.GBP], // ~0.73
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
