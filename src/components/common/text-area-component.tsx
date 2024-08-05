import { useTranslation } from "react-i18next";
import {
  ColorsEnum,
  DirectionEnum,
  InputStylesEnum,
} from "src/core/enums/design-system.enum";
interface TextAreaStlyeProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  limit?: number;
  label?: string;
  icon?: JSX.Element;
  helperText?: string;
  errorMsg?: string;
  isValid?: boolean;
  textColor?: ColorsEnum;
  borderColor?: ColorsEnum;
  borderFoucsColor?: ColorsEnum;
  variant?: InputStylesEnum;
}
function TextAreaStlye({
  limit = 20,
  icon,
  label,
  helperText,
  errorMsg = "",
  isValid = true,

  variant = InputStylesEnum.STYLE3,
  ...props
}: TextAreaStlyeProps): JSX.Element {
  const { t } = useTranslation();

  const rows = props.rows || 4;

  const getError = () => {
    return errorMsg !== ""
      ? ((isValid = false),
        "focus:border-red-500 border-red-500 peer-focus:text-red-600 hover:border-red-500")
      : (props.value?.toString().length || 0) > limit
        ? ((isValid = false),
          "border-red-500 focus:border-red-500 focus:border-2" + true)
        : ((isValid = true), "");
  };
  const getLabelVarient = () => {
    const commonStyle = `${
      props.dir === DirectionEnum.LTR
        ? "left-2 ml-7 peer-focus:-translate-x-1.5"
        : "right-7 mr-3 peer-focus:translate-x-1.5"
    } ${
      props.value && props.dir === DirectionEnum.LTR
        ? "transform -translate-y-3 -translate-x-1.5 scale-75 text-xs"
        : props.value && props.dir === DirectionEnum.RTL
          ? "transform -translate-y-3 translate-x-1.5 scale-75 text-xs"
          : props.value
            ? "transform -translate-y-3 translate-x-1.5 scale-75 text-xs"
            : ""
    } ${isValid ? "" : "text-red-500 peer-focus:text-red-500"}`;

    switch (variant) {
      case InputStylesEnum.STYLE1:
        return `bg-white text-xs top-5 peer-focus:transform peer-focus:-translate-y-6 peer-focus:scale-75 transition duration-200 ${commonStyle}
        ${
          props.dir === DirectionEnum.LTR
            ? "left-2 ml-7 peer-focus:-translate-x-8"
            : "right-7 mr-3 peer-focus:translate-x-8"
        } ${
          props.value && props.dir === DirectionEnum.LTR
            ? "transform -translate-y-6 -translate-x-8 scale-75"
            : props.value && props.dir === DirectionEnum.RTL
              ? "transform -translate-y-6 translate-x-8 scale-75"
              : props.value
                ? "translate-x-8 -translate-y-6 scale-75"
                : ""
        }
        ${isValid ? "" : "text-red-500 peer-focus:text-red-500"}`;
      case InputStylesEnum.STYLE2:
        return `top-5 peer-focus:text-xs peer-focus:transform peer-focus:-translate-y-3 peer-focus:scale-75 transition duration-200 ${commonStyle}`;
      case InputStylesEnum.STYLE3:
        return `bg-transparent -top-5  ${
          isValid ? "" : "text-red-500 peer-focus:text-red-500"
        }`;
      case InputStylesEnum.STYLE4:
        return `top-5 peer-focus:text-xs peer-focus:transform peer-focus:-translate-y-3 peer-focus:scale-75 bg-transparent transition duration-200  ${commonStyle}`;
    }
  };
  const getInputVarient = () => {
    const commonStyle = `${props.value ? "pt-5" : ""}`;
    switch (variant) {
      case InputStylesEnum.STYLE1:
        return `border-[1px] py-4 px-3 rounded-md bg-transparent disabled:bg-transparent border-opacity-50 placeholder:opacity-0 focus:placeholder:opacity-100 duration-100 ${
          icon ? "px-9" : ""
        } ${getError()}`;
      case InputStylesEnum.STYLE2:
        return `border-[1px] py-3 px-3 focus:py-5 rounded-md bg-transparent placeholder:opacity-0 focus:placeholder:opacity-100 duration-100 ${
          icon ? "px-9" : ""
        } ${commonStyle}
        ${getError()}`;
      case InputStylesEnum.STYLE3:
        return `border-[1px] py-4 px-3 rounded-md bg-transparent ${
          icon ? "px-9" : ""
        } ${getError()}`;
      case InputStylesEnum.STYLE4:
        return `border-b-2 py-3 px-3 focus:py-5 bg-gray-100 hover:border-gray-300 focus:border-b-2  border-opacity-50 placeholder:opacity-0 focus:placeholder:opacity-100 duration-100  ${
          icon ? "px-9" : ""
        } 
        ${commonStyle}
        ${getError()}`;
    }
  };

  return (
    <div dir={props.dir} className="flex flex-col relative">
      <div
        className={`absolute top-5 ${
          props.dir === DirectionEnum.LTR ? "left-3" : "right-3"
        }`}
      >
        {icon}
      </div>
      <textarea
        {...props}
        rows={rows}
        className={`${getInputVarient()} peer w-full mt-1 resize-none text-sm border-gray-300 hover:border-gray-400 disabled:bg-white focus:outline-none focus:border-blue-500 border-opacity-50 transition`}
      />
      <label
        className={`${getLabelVarient()} absolute px-1 text-sm text-opacity-80 peer-focus:text-blue-500 text-gray-500 disabled:!bg-transparent disabled:bg-none`}
      >
        {t(`${label}`)}
      </label>
      <div className={`flex justify-between px-2 py-1 text-xs text-gray-500`}>
        {(limit && limit < (props.value?.toString().length || 0)) ||
        errorMsg !== "" ? (
          <p className={`${getError()} text-red-600`}>{t(`${errorMsg}`)}</p>
        ) : (
          <p className={`${getError()}`}>{t(`${helperText}`)}</p>
        )}
        {limit && (
          <span
            className={`${
              (props.value?.toString().length || 0) > limit
                ? "text-red-500"
                : ""
            }`}
          >
            {props.value?.toString().length} / {limit}
          </span>
        )}
      </div>
    </div>
  );
}
export default TextAreaStlye;
