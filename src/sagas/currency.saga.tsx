import { put, takeEvery } from "redux-saga/effects";
import * as constants from "../reducers/currency/currency.constants";

export function* watcherDataSaga() {
  yield takeEvery(constants.READ_EXCHANGE_RATES, readExchangeSaga);
}

export function* readExchangeSaga() {
  try {
    yield put({
      type: constants.READ_EXCHANGE_RATES_SUCCESS,
      payload: {
        currencys: [],
      },
    });
  } catch (error) {
    yield put({
      type: constants.READ_EXCHANGE_RATES_ERROR,
      payload: { error },
    });
  }
}
