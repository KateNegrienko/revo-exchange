import { FC, useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { CURRENCIES } from "../../common/constants";
import { accountState } from "../../reducers/account/account.types";
import { readExchangeRate } from "../../reducers/currency/currency.actions";
import { currencyState } from "../../reducers/currency/currency.types";
import ExchangeAccount from "./components/exchange-account/ExchangeAccount";
import { ExchangeAccountType } from "./components/exchange-account/ExchangeAccount.interface";
import { Account } from "../../data/Account";
import theme from "./Exchange.module.scss";
import { exchangeMoney } from "../../reducers/account/account.actions";
import { ROOT } from "../../router/Root.constants";

const Exchange: FC = () => {
  const history = useHistory();
  const { accounts }: accountState = useSelector(
    (state: any) => state.account,
    shallowEqual
  );
  const { rates }: currencyState = useSelector(
    (state: any) => state.currency,
    shallowEqual
  );

  const [sourceAccount, setSourceAccount] = useState(accounts[0]);
  const [destinationAccount, setDestinationAccount] = useState(accounts[1]);

  const [sourcePrice, setSourcePrice] = useState<number | string>("");
  const [destinationPrice, setDestinationPrice] = useState<number | string>("");

  useEffect(() => {
    readExchangeRate();
  }, []);

  const setNewPrice = useCallback(
    (
      type: ExchangeAccountType,
      price: number,
      source: Account,
      destination: Account
    ) => {
      const sourcePrice = rates.find(({ id }) => id === source.id)?.price;
      const destinationPrice = rates.find(({ id }) => id === destination.id)
        ?.price;

      if (sourcePrice && destinationPrice) {
        switch (type) {
          case ExchangeAccountType.SOURCE:
            setSourcePrice(price);
            const destination = (price * sourcePrice) / destinationPrice;
            setDestinationPrice(parseFloat(destination.toString()).toFixed(2));

            break;
          case ExchangeAccountType.DESTINATION:
            setDestinationPrice(price);
            const source = (price * destinationPrice) / sourcePrice;
            setSourcePrice(parseFloat(source.toString()).toFixed(2));

            break;
        }
      }
    },
    [rates]
  );

  const handleChangePrice = useCallback(
    (type: ExchangeAccountType, price: number | string) => {
      setNewPrice(type, Number(price), sourceAccount, destinationAccount);
    },
    [destinationAccount, sourceAccount, setNewPrice]
  );

  const handleChangeAccount = useCallback(
    (type: ExchangeAccountType, accountId: CURRENCIES) => {
      const newAccount = accounts.find((item) => item.id === accountId);
      if (newAccount) {
        switch (type) {
          case ExchangeAccountType.SOURCE:
            setSourceAccount(newAccount);
            setNewPrice(
              type,
              Number(sourcePrice),
              newAccount,
              destinationAccount
            );
            break;
          case ExchangeAccountType.DESTINATION:
            setDestinationAccount(newAccount);
            setNewPrice(
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
      setNewPrice,
    ]
  );

  const handleExchange = useCallback(() => {
    exchangeMoney(
      sourceAccount.id,
      destinationAccount.id,
      Number(sourcePrice),
      Number(destinationPrice)
    );
    history.push(ROOT.ACCOUNT);
  }, [
    sourceAccount.id,
    sourcePrice,
    destinationPrice,
    destinationAccount.id,
    history,
  ]);

  return (
    <div className={theme.root}>
      Exchange
      {sourceAccount && (
        <ExchangeAccount
          onChangeAccount={handleChangeAccount}
          account={sourceAccount}
          rates={rates}
          type={ExchangeAccountType.SOURCE}
          price={sourcePrice}
          onChangePrice={handleChangePrice}
        />
      )}
      {destinationAccount && (
        <ExchangeAccount
          account={destinationAccount}
          rates={rates}
          type={ExchangeAccountType.DESTINATION}
          price={destinationPrice}
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
