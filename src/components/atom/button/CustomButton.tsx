import React, { memo } from "react";
import { Button } from "flowbite-react";

interface ButtonShowProps {
  type: "button" | "submit" | "reset" | undefined;
  id?: string;
  buttonClass?: string;
  action?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  icon?: React.ReactNode;
  img?: string;
  name?: string;
  size?: string;
  iconClass?: string;
  disabled?: any;
  color?: any;
  pill?: any;
  ref?:any;
}

const CustomButton: React.FC<ButtonShowProps> = memo(
  ({
    type,
    id,
    buttonClass,
    action,
    icon,
    name,
    img,
    size,
    iconClass,
    disabled,
    color,
    pill,
    ref
  }) => {
    return (
      <Button
        size={size}
        type={type}
        color={color}
        pill={pill}
        id={id}
        className={buttonClass}
        disabled={disabled ? true : false}
        onClick={action}
        ref={ref}
      >
        {img && (
          <span>
            {" "}
            <img src={img} alt="img" />{" "}
          </span>
        )}
        <span className={iconClass}>{icon}</span>
        {name}
      </Button>
    );
  }
);

export default CustomButton;
