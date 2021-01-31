import { FC } from "react";
import { useSelector } from "react-redux";
import { accountState } from "../../reducers/account/account.types";
import theme from "./Account.module.scss";
import AccountCard from "./components/account-card/AccountCard";

const Account: FC = () => {
  const { accounts }: accountState = useSelector((state: any) => state.account);
  return (
    <div className={theme.root}>
      {accounts.map((card) => (
        <AccountCard card={card} />
      ))}
    </div>
  );
};

export default Account;
