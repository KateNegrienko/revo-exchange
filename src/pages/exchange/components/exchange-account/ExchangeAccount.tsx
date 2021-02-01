import { FC, useCallback, useState } from "react";
import { Input, Icon, Select } from "semantic-ui-react";

import Card from "../../../../common/card/Card";
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
  const handleChangeValidation = useCallback(
    (value: number) => {
      if (value > account.value) {
        setInputError(
          "you cannot change more money than there is in your account"
        );
        return false;
      }
      setInputError("");
      return true;
    },
    [account.value]
  );

  const handleChange = useCallback(
    (e) => {
      e.persist();
      const float = parseFloat(e.target.value);
      handleChangeValidation(e.target.value);
      onChangePrice(type, float.toFixed(2));
    },
    [onChangePrice, handleChangeValidation, type]
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
