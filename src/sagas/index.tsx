import { all } from "redux-saga/effects";
import { watcherDataSaga as currency } from "./currency.saga";

export default function* rootSaga() {
  yield all([
    currency(),
    // TODO next sagas
  ]);
}
