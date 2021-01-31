import { put, takeEvery, select } from "redux-saga/effects";
import { ExchangeAccountType } from "../pages/exchange/components/exchange-account/ExchangeAccount.interface";
import { setNewPrice } from "../reducers/account/account.actions";

import * as constants from "../reducers/account/account.constants";
import { accountState } from "../reducers/account/account.types";
import { currencyState } from "../reducers/currency/currency.types";

export function* watcherDataSaga() {
  yield takeEvery(constants.SET_SOURCE_ACCOUNT, setSourceAccountSaga);
  yield takeEvery(constants.SET_DESTINATION_ACCOUNT, setDestinationAccountSaga);
}

export function* setSourceAccountSaga() {
  const {
    account,
    currency,
  }: { account: accountState; currency: currencyState } = yield select();

  yield setNewPrice(
    currency.rates,
    ExchangeAccountType.SOURCE,
    Number(account.sourcePrice),
    account.sourceAccount,
    account.destinationAccount
  );
}
export function* setDestinationAccountSaga() {
  const {
    account,
    currency,
  }: { account: accountState; currency: currencyState } = yield select();

  yield setNewPrice(
    currency.rates,
    ExchangeAccountType.DESTINATION,
    Number(account.destinationPrice),
    account.sourceAccount,
    account.destinationAccount
  );
}
