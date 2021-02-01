import { takeEvery, select } from "redux-saga/effects";
import { ExchangeAccountType } from "../pages/exchange/components/exchange-account/ExchangeAccount.interface";
import { IState } from "../reducers";
import { setNewPrice } from "../reducers/account/account.actions";
import * as constants from "../reducers/account/account.constants";

export function* watcherDataSaga() {
  yield takeEvery(constants.SET_SOURCE_ACCOUNT, setAccountSaga);
  yield takeEvery(constants.SET_DESTINATION_ACCOUNT, setAccountSaga);
}

export function* setAccountSaga({ payload }: any) {
  const { account, currency }: IState = yield select();

  yield setNewPrice({
    rates: currency.rates,
    focusInput: payload.focusInput,
    price: Number(
      payload.focusInput === ExchangeAccountType.SOURCE
        ? account.sourcePrice
        : account.destinationPrice
    ),
  });
}
