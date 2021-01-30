import { put, takeEvery } from "redux-saga/effects";
import * as constants from "../reducers/account/account.constants";

export function* watcherDataSaga() {
  yield takeEvery(constants.ACCOUNTS, accountsSaga);
}

export function* accountsSaga() {
  try {
    
    yield put({
      type: constants.ACCOUNTS_SUCCESS,
      payload: {
        accounts: []
      },
    });
  } catch (error) {
    yield put({ type: constants.ACCOUNTS_ERROR, payload: { error } });
  }
}
