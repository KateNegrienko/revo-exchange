import { FC } from "react";
import cn from "classnames";
import { ICardProps } from "./Card.interface";
import theme from "./Card.module.scss";

const Card: FC<ICardProps> = ({ children, className }) => (
  <div className={cn(theme.card, className)}>{children}</div>
);

export default Card;
