import { FC, useCallback, useEffect, useState } from "react";
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
import { IState } from "../../reducers";

const Exchange: FC = () => {
  const history = useHistory();
  const [type, setType] = useState(ExchangeAccountType.SOURCE);
  const {
    accounts,
    sourcePrice,
    sourceAccount,
    destinationPrice,
    destinationAccount,
  }: accountState = useSelector((state: IState) => state.account, shallowEqual);

  const { rates }: currencyState = useSelector(
    (state: IState) => state.currency,
    shallowEqual
  );

  useEffect(() => {
    readExchangeRate();
    const timer = window.setInterval(() => {
      //readExchangeRate();
    }, 10000);
    return () => {
      // Return callback to run on unmount.
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (sourcePrice && destinationPrice) {
      setNewPrice(
        rates,
        type,
        type === ExchangeAccountType.SOURCE
          ? Number(sourcePrice)
          : Number(destinationPrice)
      );
    }
  }, [rates]);

  const handleChangePrice = useCallback(
    (type: ExchangeAccountType, price: number | string) => {
      setType(type);
      setNewPrice(rates, type, Number(price));
    },
    [rates]
  );

  const handleChangeAccount = useCallback(
    (accountType: ExchangeAccountType, accountId: CURRENCIES) => {
      const newAccount = accounts.find((item) => item.id === accountId);
      if (newAccount) {
        setNewAccount(
          accountType === ExchangeAccountType.SOURCE
            ? constants.SET_SOURCE_ACCOUNT
            : constants.SET_DESTINATION_ACCOUNT,
          newAccount
        );
      }
    },
    [accounts]
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
