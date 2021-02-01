import { FC, useCallback, useState } from "react";
import cn from "classnames";
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
      } else {
        setInputError("");
      }
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
    (e) => {
      onChangeAccount(type, e.target.value);
    },
    [onChangeAccount, type]
  );
  return (
    <Card className={theme.root}>
      <div>
        <select
          size={1}
          name={account.id}
          value={account.id}
          onChange={handleChangeAccount}
        >
          {rates.map((rate) => {
            return (
              <option key={rate.id} value={rate.id}>
                {rate.id}
              </option>
            );
          })}
        </select>
        You have {account.value}
      </div>

      <div
        className={cn(
          theme.input,
          type === ExchangeAccountType.SOURCE ? theme.source : theme.destination
        )}
      >
        <input
          type="number"
          value={price}
          step=".01"
          pattern="^\d*(\.\d{0,2})?$"
          max={account.value}
          onChange={handleChange}
        ></input>
      </div>
      {inputError}
    </Card>
  );
};

export default ExchangeAccount;
