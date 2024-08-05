import React from "react";
import { ColorsEnum } from "src/core/enums/design-system.enum";
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  value?: string;
  checkboxSize?: boolean;
  textSize?: boolean;
  color?: ColorsEnum;
}
export function CheckboxComponent({
  title,
  checkboxSize,
  textSize,
  color = ColorsEnum.Primary,
  ...props
}: InputProps) {
  const getCheckboxSize = () => {
    switch (checkboxSize) {
      case true:
        return "h-6 w-6";
      case false:
        return "h-5 w-5";
      default:
        return "h-6 w-6";
    }
  };
  const getTextSize = () => {
    switch (textSize) {
      case true:
        return "text-base";
      case false:
        return "text-xs";
      default:
        return "text-sm";
    }
  };
  const getColor = () => {
    switch (color) {
      case ColorsEnum.Danger:
        return "accent-danger text-black-900";
      case ColorsEnum.White:
        return "accent-white text-black-900";
      case ColorsEnum.Primary:
        return "accent-primary text-black-900";
      case ColorsEnum.Accent:
        return "accent-accent text-black-900";
      default:
        return "accent-primary text-black-900";
    }
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <label className={`${getTextSize()} ${getColor()}`}>{title}</label>
      <input
        {...props}
        type="checkbox"
        id="checkbox"
        name={props.name}
        value={props.value}
        className={`flex flex-row ${getColor()}
        } ${getCheckboxSize()}`}
      />
    </div>
  );
}
export default CheckboxComponent;
