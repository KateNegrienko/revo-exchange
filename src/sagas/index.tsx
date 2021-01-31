import { all } from "redux-saga/effects";
import { watcherDataSaga as currency } from "./currency.saga";
import { watcherDataSaga as account } from "./account.saga";

export default function* rootSaga() {
  yield all([
    currency(),
    account(),
    // TODO next sagas
  ]);
}
