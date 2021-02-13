import { runSaga } from "redux-saga";
import { takeEvery } from "redux-saga/effects";
import { watcherDataSaga, setAccountSaga } from "../account.saga";
import {
  SET_DESTINATION_ACCOUNT,
  SET_SOURCE_ACCOUNT,
} from "../../reducers/account/account.constants";

import { setNewPrice } from "../../reducers/account/account.actions";
import { TEST_RATES } from "../../common/utils.data";

describe("Watcher Data Saga", () => {
  let genObject: Generator = watcherDataSaga();

  it("Should wait for every SET_SOURCE_ACCOUNT action and call setAccountSaga", () => {
    expect(genObject.next().value).toEqual(
      takeEvery(SET_SOURCE_ACCOUNT, setAccountSaga)
    );
  });

  it("Should wait for every SET_SOURCE_ACCOUNT action and call setAccountSaga", () => {
    expect(genObject.next().value).toEqual(
      takeEvery(SET_DESTINATION_ACCOUNT, setAccountSaga)
    );
  });
  it("Should be done on next iteration", () => {
    expect(genObject.next().done).toBeTruthy();
  });
});
