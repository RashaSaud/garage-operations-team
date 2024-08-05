import React from "react";
import { useTranslation } from "react-i18next";
import { ColorsEnum, SizesEnum } from "src/core/enums/design-system.enum";
interface RadioButtonComponentProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  color?: ColorsEnum;
  label?: string;
  radioSize?: SizesEnum;
}

function RadioButtonComponent({
  label,
  radioSize = SizesEnum.Medium,
  color = ColorsEnum.Primary,
  ...props
}: RadioButtonComponentProps) {
  const { t } = useTranslation();

  const getSizes = () => {
    switch (radioSize) {
      case SizesEnum.Small:
        return "h-5 w-5 before:border-4";
      case SizesEnum.Medium:
        return "h-6 w-6 before:border-[5px]";
      case SizesEnum.Large:
        return "h-7 w-7 before:border-[6px]";
      default:
        return "h-6 w-6 before:border-[5px]";
    }
  };

  const getColor = () => {
    switch (color) {
      case ColorsEnum.Primary:
        return "before:border-white border-slate-500/50 checked:border-primary-50 checked:bg-primary-50 ";
      case ColorsEnum.Secondary:
        return "before:border-white border-slate-500/50 checked:border-secondary-50 checked:bg-secondary-50";
      default:
        return "before:border-white border-slate-500/50 checked:border-primary-50 checked:bg-primary-50 ";
    }
  };

  const getSizesText = () => {
    switch (radioSize) {
      case SizesEnum.Small:
        return "text-xs";
      case SizesEnum.Medium:
        return "text-sm";
      case SizesEnum.Large:
        return "text-base";
      default:
        return "text-sm";
    }
  };

  return (
    <div dir={props.dir}>
      <label
        className={`inline-flex gap-4 text-center ${getColor()} ${getSizesText()}`}
      >
        <input
          {...props}
          type="radio"
          name="toggle"
          className={`appearance-none ${getSizes()} grid place-items-center 
                        rounded-full border-[1px] 
                        ${getColor()}
                        before:rounded-full 
                        before:scale-0 before:ease-in-out 
                        before:transition-transform 
                        checked:before:scale-[1px]`}
        />
        {t(`${label}`)}
      </label>
    </div>
  );
}

export default RadioButtonComponent;
