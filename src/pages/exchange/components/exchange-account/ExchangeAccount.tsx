import { FC, useCallback, useEffect, useState } from "react";
import { Input, Icon, Select } from "semantic-ui-react";

import Card from "../../../../common/card/Card";
import { validation } from "../../../../common/utils";
import {
  ExchangeAccountType,
  IExchangeAccountProps,
} from "./ExchangeAccount.interface";
import theme from "./ExchangeAccount.module.scss";

const ExchangeAccount: FC<IExchangeAccountProps> = ({
  account,
  rates,
  price,
  type,
  onChangePrice,
  onChangeAccount,
}) => {
  const [inputError, setInputError] = useState("");

  useEffect(() => {
    setInputError(validation(type, account.value, Number(price)));
  }, [price, account.value, type, inputError]);

  const handleChange = useCallback(
    (e) => {
      e.persist();
      const float = parseFloat(e.target.value);
      onChangePrice(type, float.toFixed(2));
    },
    [onChangePrice, type]
  );
  const handleChangeAccount = useCallback(
    (e, data) => {
      onChangeAccount(type, data.value);
    },
    [onChangeAccount, type]
  );
  return (
    <Card className={theme.root}>
      <div className={theme.error}>{inputError}</div>
      <div className={theme.row}>
        <Select
          name={account.id}
          className={theme.select}
          size="small"
          onChange={handleChangeAccount}
          value={account.id}
          options={rates}
        />

        <Input
          iconPosition="left"
          type="number"
          size="small"
          className={theme.input}
        >
          <Icon name={type === ExchangeAccountType.SOURCE ? "minus" : "plus"} />
          <input
            type="number"
            value={price}
            step=".01"
            pattern="^\d*(\.\d{0,2})?$"
            max={account.value}
            onChange={handleChange}
          ></input>
        </Input>
      </div>

      <div className={theme.hint}> Balance: {account.value}</div>
    </Card>
  );
};

export default ExchangeAccount;
