import { FC } from "react";
import cn from "classnames";
import { IButtonProps } from "./Button.interface";
import theme from "./Button.module.scss";

const Button: FC<IButtonProps> = ({
  onClick,
  className,
  children,
  disabled = false,
}) => (
  <button
    className={cn(theme.button, disabled && theme.disabled, className)}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
