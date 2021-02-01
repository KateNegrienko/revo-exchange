import { put, takeEvery } from "redux-saga/effects";
import { TEST_RATES } from "../common/utils.data";
import * as constants from "../reducers/currency/currency.constants";

export function* watcherDataSaga() {
  yield takeEvery(constants.READ_EXCHANGE_RATES, readExchangeSaga);
}

export function* readExchangeSaga() {
  try {
    yield put({
      type: constants.READ_EXCHANGE_RATES_SUCCESS,
      payload: TEST_RATES,
    });
  } catch (error) {
    yield put({
      type: constants.READ_EXCHANGE_RATES_ERROR,
      payload: { error },
    });
  }
}
