import { FC, useEffect } from "react";
import { readExchangeRate } from "../../reducers/currency/currency.actions";
import theme from "./Exchange.module.scss";

const Exchange: FC = () => {
  useEffect(() => {
    readExchangeRate();
  }, []);

  return <div className={theme.root}>Exchange</div>;
};

export default Exchange;
