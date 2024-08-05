import {
  BorderRadiusEnum,
  ButtonStyleEnum,
  ColorsEnum,
  SizesButtonEnum,
} from "src/core/enums/design-system.enum";

interface ButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  text?: string;
  color?: ColorsEnum;
  buttonSize?: SizesButtonEnum;
  iconStart?: JSX.Element;
  iconEnd?: JSX.Element;
  borderRadus?: BorderRadiusEnum;
  buttonStyle?: ButtonStyleEnum;
  colorStyle?: string;
  backgroundColor?: string;
}

function Button({
  color = ColorsEnum.Primary,
  buttonStyle = ButtonStyleEnum.Filled,
  buttonSize = SizesButtonEnum.Medium,
  text,
  borderRadus = BorderRadiusEnum.Medium,
  iconEnd,
  iconStart,
}: ButtonProps) {
  const getButtonStyleClasses = () => {
    switch (buttonStyle) {
      case "filled":
        return `bg-${getColorClasses()}-400 text-white hover:bg-${getColorClasses()}-700`;
      case "outlineStyleOne":
        return `border border-solid border-${getColorClasses()}-600 bg-transparent`;
      case "outlineStyleTow": //if the background has diffrent color and broder has diffrent color
        return `border border-solid border-${getColorClasses()}-600 bg-${getColorClasses()}`;
      case "muted":
        return `bg-${getColorClasses()}-200 bg-transparent`;
      case "disabled": //null bg null bordr only text and icons
        return `bg-transparent`;
      default:
        return `bg-${getColorClasses()}-400 text-white hover:bg-${getColorClasses()}-700`;
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case ColorsEnum.Success:
        return "emerald";
      case ColorsEnum.Danger:
        return "red";
      case ColorsEnum.Primary:
        return "amber";
      case ColorsEnum.Secondary:
        return "gray";
      default:
        return "amber";
    }
  };

  return (
    <div
      // {...props}
      className={`${buttonSize}
         ${borderRadus} flex items-center justify-between px-2
         ${getButtonStyleClasses()} cursor-pointer `}
    >
      <div className="w-3.5 h-3.5">{iconEnd}</div>
      <p className="font-bold text-sm flex justify-center">{text}</p>
      <div className="w-3.5 h-3.5">{iconStart}</div>
    </div>
  );
}
export default Button;
