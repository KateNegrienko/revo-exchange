import { FC, useCallback } from "react";
import cn from "classnames";
import { IButtonProps } from "./Button.interface";
import theme from "./Button.module.scss";

const Button: FC<IButtonProps> = ({
  onClick,
  className,
  children,
  disabled = false,
}) => {
  const handleClick = useCallback(() => {
    if (!disabled) {
      onClick();
    }
  }, [disabled, onClick]);
  return (
    <button
      className={cn(theme.button, disabled && theme.disabled, className)}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
