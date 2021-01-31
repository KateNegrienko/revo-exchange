import { FC } from "react";
import { IAccountCardProps } from "./AccountCard.interface";
import theme from "./AccountCard.module.scss";

const AccountCard: FC<IAccountCardProps> = ({ card }) => {
  return (
    <div className={theme.root}>
      {card.id} {card.value}
    </div>
  );
};

export default AccountCard;
