import { FC } from "react";
import Card from "../../../../common/card/Card";
import { IAccountCardProps } from "./AccountCard.interface";
import theme from "./AccountCard.module.scss";

const AccountCard: FC<IAccountCardProps> = ({ card }) => (
  <Card className={theme.root}>
    <h4 className={theme.currency}>{card.id} Card</h4>
    <h2 className={theme.balance}>
      {card.symbol} {card.value}
    </h2>
  </Card>
);

export default AccountCard;
