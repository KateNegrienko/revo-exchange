import { FC, useCallback } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { accountState } from "../../reducers/account/account.types";
import { ROOT } from "../../router/Root.constants";
import theme from "./Account.module.scss";
import AccountCard from "./components/account-card/AccountCard";

const Account: FC = () => {
  const { accounts }: accountState = useSelector(
    (state: any) => state.account,
    shallowEqual
  );
  const history = useHistory();
  const handleEchangeClick = useCallback(() => {
    history.push(ROOT.EXCHANGE);
  }, [history]);
  return (
    <div className={theme.root}>
      {accounts.map((card) => (
        <AccountCard card={card} />
      ))}
      <button onClick={handleEchangeClick}>Echange</button>
    </div>
  );
};

export default Account;
