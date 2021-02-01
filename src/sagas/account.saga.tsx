import { takeEvery, select } from "redux-saga/effects";
import { ExchangeAccountType } from "../pages/exchange/components/exchange-account/ExchangeAccount.interface";
import { IState } from "../reducers";
import { setNewPrice } from "../reducers/account/account.actions";
import * as constants from "../reducers/account/account.constants";

export function* watcherDataSaga() {
  yield takeEvery(constants.SET_SOURCE_ACCOUNT, setSourceAccountSaga);
  yield takeEvery(constants.SET_DESTINATION_ACCOUNT, setDestinationAccountSaga);
}

export function* setSourceAccountSaga() {
  const { account, currency }: IState = yield select();

  yield setNewPrice(
    currency.rates,
    ExchangeAccountType.SOURCE,
    Number(account.sourcePrice)
  );
}
export function* setDestinationAccountSaga() {
  const { account, currency }: IState = yield select();

  yield setNewPrice(
    currency.rates,
    ExchangeAccountType.DESTINATION,
    Number(account.destinationPrice)
  );
}
