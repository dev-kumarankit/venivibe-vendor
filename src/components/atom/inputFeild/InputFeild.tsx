import React, { ComponentProps, FC, memo } from "react";
import { CustomFlowbiteTheme, Flowbite, Label, TextInput } from "flowbite-react";

interface InputProps {
  labelFor?: string;
  labelValue?: string;
  labelClass?: string;
  id?: string;
  type?: "text" | "number" | "password" | "email" | "tel" | "url" | "date" | "time" | "datetime-local" | "month" | "week" | "search" | "color" | "checkbox" | "file";
  change?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  value?: string | number | readonly string[];
  inputClass?: string;
  iconLeft?: any;
  iconRight?: any;
  placeHolder?: string;
  required?: boolean;
  blur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: any;
  name?: string;
  ref?: React.RefObject<HTMLInputElement>;
  color?: any;
  autoComplete?: any;
  disabled?: any;
  onEnterPress?: any
  hidden?: boolean,
  onIconRightClick?: () => void;
  borderColor?:any; 
   onClick?: () => void;
  onIconLeftClick?: () => void;
  classIconRight?:any;
  classIconLeft?:any;
}

const inputTheme: CustomFlowbiteTheme = {
  textInput: {
    base: "flex ",
    field: {
      base: "relative w-full",
      input: {
        base: "min-h-full !p-0 block w-full  disabled:cursor-not-allowed disabled:opacity-50",
        "colors": {
          "primary": "border-transparent focus:border-transparent focus:outline-none focus:ring-transparent bg-transparent ",
          "error": "border-2 border-red-500 focus:border-red-500 focus:outline-none focus:ring-red-500 bg-transparent rounded-12",
          "rounded": "border-2 border-primary focus:border-primary focus:outline-none focus:ring-ransparent bg-transparent !rounded-[99999999px]",
          "transparent": "border border-transparent focus:border-transparent focus:ring-0 focus:outline-0 transparent"
        },
      },
    },
  },
};





const InputFeild: React.FC<InputProps> = memo(
  ({
    labelFor,
    labelValue,
    labelClass,
    id,
    type,
    change,
    value,
    iconLeft,
    iconRight,
    placeHolder,
    required,
    blur,
    error,
    name,
    ref,
    onKeyDown,
    autoComplete,
    disabled,
    color,
    onEnterPress,
    hidden,
    inputClass,
    onIconRightClick,
    onClick,
    onIconLeftClick,
    borderColor,
    classIconRight,
    classIconLeft
  }) => {
    const handleKeyPress = (event: any) => {
      if (event.key === 'Enter') {
        onEnterPress(event);
      }
    };

    return (
      <Flowbite theme={{ theme: inputTheme }}>
        <div className="w-full">
          {labelValue && <div className="mb-1.5">
            <Label htmlFor={labelFor} value={labelValue} className={labelClass ? labelClass : "text-primaryText text-sm"} />
          </div>}

          <div   onClick={onClick}  className={`min-h-[52px] w-full flex items-center justify-between px-4 py-3 bg-[#F8F8F8] rounded-[8px] ${borderColor}`}>
            {iconLeft &&
              <div className="size-6 mr-4 flex items-center justify-center" onClick={onIconLeftClick}>
                <div className="w-full">
                <span className={classIconLeft}> {iconLeft}</span>
                </div>
              </div>
            }

            <div className="w-full flex-auto">
              <TextInput
                id={id}
                type={type}
                onChange={change}
                onKeyDown={onKeyDown}
                value={value}
                color={color}
                className={`text-sm text-primaryText input-autofill ${inputClass}`}
                placeholder={placeHolder}
                required={required ? true : false}
                onBlur={blur}
                name={name}
                ref={ref}
                onKeyPress={handleKeyPress}
                hidden={hidden}
                autoComplete={autoComplete ? "off" : ""}
                disabled={disabled ? true : false}
              />
            </div>

            {iconRight &&
              <div className="size-6 mr-4 flex items-center justify-center cursor-pointer" onClick={onIconRightClick}>
                <div className="w-full">
                 <span className={classIconRight}>{iconRight}</span>
                </div>
              </div>
            }

          </div>

          {error && <div className="w-full mt-2 text-xs text-red-500 ">
            <span>{error}</span>
          </div>}
        </div>
      </Flowbite>
    );
  }
);

export default InputFeild;
