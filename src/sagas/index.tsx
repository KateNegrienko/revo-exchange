import { all } from "redux-saga/effects";
import { watcherDataSaga as account } from "./account.saga";

export default function* rootSaga() {
  yield all([
    account(),
    // TODO next sagas
  ]);
}
