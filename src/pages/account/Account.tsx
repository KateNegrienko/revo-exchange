import { FC, useCallback } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IState } from "../../reducers";
import { accountState } from "../../reducers/account/account.types";
import { ROOT } from "../../router/Root.constants";
import theme from "./Account.module.scss";
import AccountCard from "./components/account-card/AccountCard";
import Card from "../../common/card/Card";
import Button from "../../common/button/Button";

const Account: FC = () => {
  const { accounts }: accountState = useSelector(
    (state: IState) => state.account,
    shallowEqual
  );
  const history = useHistory();
  const handleExchangeClick = useCallback(() => {
    history.push(ROOT.EXCHANGE);
  }, [history]);
  return (
    <div className={theme.root}>
      <Card className={theme.card}>
        <h1 className={theme.header}>Bank accounts</h1>
        {accounts.map((card) => (
          <AccountCard card={card} key={card.id} />
        ))}
        <Button onClick={handleExchangeClick}>Exchange</Button>
      </Card>
    </div>
  );
};

export default Account;
