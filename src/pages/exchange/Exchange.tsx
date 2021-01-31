import { FC, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { CURRENCIES } from "../../common/constants";
import { accountState } from "../../reducers/account/account.types";
import { readExchangeRate } from "../../reducers/currency/currency.actions";
import { currencyState } from "../../reducers/currency/currency.types";
import ExchangeAccount from "./components/exchange-account/ExchangeAccount";
import { ExchangeAccountType } from "./components/exchange-account/ExchangeAccount.interface";
import * as constants from "../../reducers/account/account.constants";
import {
  exchangeMoney,
  setNewAccount,
  setNewPrice,
} from "../../reducers/account/account.actions";
import { ROOT } from "../../router/Root.constants";
import theme from "./Exchange.module.scss";

const Exchange: FC = () => {
  const history = useHistory();
  const {
    accounts,
    destinationAccount,
    destinationPrice,
    sourceAccount,
    sourcePrice,
  }: accountState = useSelector((state: any) => state.account, shallowEqual);
  const { rates }: currencyState = useSelector(
    (state: any) => state.currency,
    shallowEqual
  );

  useEffect(() => {
    readExchangeRate();
  }, []);

  const handleChangePrice = useCallback(
    (type: ExchangeAccountType, price: number | string) => {
      setNewPrice(
        rates,
        type,
        Number(price),
        sourceAccount,
        destinationAccount
      );
    },
    [destinationAccount, sourceAccount, rates]
  );

  const handleChangeAccount = useCallback(
    (type: ExchangeAccountType, accountId: CURRENCIES) => {
      const newAccount = accounts.find((item) => item.id === accountId);
      if (newAccount) {
        switch (type) {
          case ExchangeAccountType.SOURCE:
            setNewAccount(constants.SET_SOURCE_ACCOUNT, newAccount);

            setNewPrice(
              rates,
              type,
              Number(sourcePrice),
              newAccount,
              destinationAccount
            );
            break;
          case ExchangeAccountType.DESTINATION:
            setNewAccount(constants.SET_DESTINATION_ACCOUNT, newAccount);
            setNewPrice(
              rates,
              type,
              Number(destinationPrice),
              sourceAccount,
              newAccount
            );
            break;
        }
      }
    },
    [
      accounts,
      destinationPrice,
      sourcePrice,
      destinationAccount,
      sourceAccount,
      rates,
    ]
  );

  const handleExchange = useCallback(() => {
    exchangeMoney();
    history.push(ROOT.ACCOUNT);
  }, [history]);

  return (
    <div className={theme.root}>
      Exchange
      {sourceAccount && (
        <ExchangeAccount
          rates={rates}
          price={sourcePrice}
          account={sourceAccount}
          type={ExchangeAccountType.SOURCE}
          onChangePrice={handleChangePrice}
          onChangeAccount={handleChangeAccount}
        />
      )}
      {destinationAccount && (
        <ExchangeAccount
          rates={rates}
          price={destinationPrice}
          account={destinationAccount}
          type={ExchangeAccountType.DESTINATION}
          onChangePrice={handleChangePrice}
          onChangeAccount={handleChangeAccount}
        />
      )}
      <button
        onClick={handleExchange}
        disabled={sourceAccount.id === destinationAccount.id}
      >
        Exchange
      </button>
    </div>
  );
};

export default Exchange;
