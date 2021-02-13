import { takeEvery, select } from "redux-saga/effects";
import { ExchangeAccountType } from "../pages/exchange/components/exchange-account/ExchangeAccount.interface";
import { IState } from "../reducers";
import { setNewPrice } from "../reducers/account/account.actions";

export function* watcherDataSaga() {
  yield takeEvery("SET_SOURCE_ACCOUNT", setAccountSaga);
  yield takeEvery("SET_DESTINATION_ACCOUNT", setAccountSaga);
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
