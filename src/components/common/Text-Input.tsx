import { t } from "i18next";
import { InputHTMLAttributes } from "react";
import { HiOutlineEye, HiOutlineUser } from "react-icons/hi";
import { DirectionEnum, InputStylesEnum } from "src/core/enums/example.enum";
interface TextInputprops extends InputHTMLAttributes<HTMLInputElement> {
  prefix?: any;
  sufix?: any;
  limit?: number;
  helperText?: string;
  label?: string;
  variant: InputStylesEnum;
  error?: boolean;
  errorMsg?: string;
}
function TextInputS1({
  prefix = <HiOutlineUser size={24} className="text-gray-500" />,
  sufix = <HiOutlineEye size={24} className="text-gray-500" />,
  label = "Label",
  limit = 20,
  helperText = "Helper Text",
  errorMsg = "",
  variant,
  ...props
}: TextInputprops): JSX.Element {
  let isValid: boolean;
  const getError = () => {
    if (errorMsg !== "") {
      isValid = false;
      return "border-red-500 focus:border-red-500 focus:border-2";
    }
    if ((props.value?.toString().length || 0) > limit) {
      isValid = false;
      return "border-red-500 focus:border-red-500 focus:border-2";
    } else {
      isValid = true;
      return "";
    }
  };
  const getLabelVarient = () => {
    const commonStyle = `${
      props.dir === DirectionEnum.LTR
        ? "left-2 ml-9 peer-focus:-translate-x-4"
        : "right-7 mr-3 peer-focus:translate-x-3"
    } 
 ${
   props.value && props.dir === DirectionEnum.LTR
     ? `transform -translate-y-5 -translate-x-4 scale-75`
     : props.value && props.dir === DirectionEnum.RTL
       ? "transform -translate-y-5 translate-x-3 scale-75"
       : props.value
         ? "text-gray-500 translate-x-4 -translate-y-5 scale-75"
         : ""
 }
  ${isValid ? "" : "text-red-500 peer-focus:text-red-500 focus:text-red-500"}}`;
    switch (variant) {
      case InputStylesEnum.STYLE1:
        return `flex text-sm peer-focus:transform peer-focus:-translate-y-8 peer-focus:scale-75 text-opacity-80 bg-white px-1 ${commonStyle} ${
          props.dir === DirectionEnum.LTR
            ? "peer-focus:-translate-x-10"
            : "peer-focus:translate-x-8"
        } 
        ${
          props.value && props.dir === DirectionEnum.LTR
            ? ` -translate-y-8 -translate-x-8`
            : props.value && props.dir === DirectionEnum.RTL
              ? "-translate-y-8 translate-x-8"
              : props.value
                ? "translate-x-8 -translate-y-8"
                : ""
        }`;
      case InputStylesEnum.STYLE2:
        return `flex text-sm peer-focus:transform peer-focus:-translate-y-5 peer-focus:scale-75 text-opacity-80 bg-transparent px-1 ${commonStyle}`;
      case InputStylesEnum.STYLE3:
        return `text-sm bg-transparent pb-12 ${
          isValid ? "" : "text-red-500 peer-focus:text-red-500"
        }`;
      case InputStylesEnum.STYLE4:
        return `flex text-sm peer-focus:transform peer-focus:-translate-y-5 peer-focus:scale-75 text-opacity-80 bg-transparent px-1 ${commonStyle}`;
    }
  };
  const getInputVarient = () => {
    const commonStyle = `border-[1px] rounded-md bg-transparent  border-opacity-50 placeholder:opacity-0 focus:placeholder:opacity-100 duration-100 ${
      prefix ? "px-9" : ""
    } ${getError()}`;
    switch (variant) {
      case InputStylesEnum.STYLE1:
        return `${commonStyle}`;
      case InputStylesEnum.STYLE2:
        return `${commonStyle}`;
      case InputStylesEnum.STYLE3:
        return `border-[1px] rounded-md bg-transparent ${
          prefix ? "px-9" : ""
        } ${getError()}`;
      case InputStylesEnum.STYLE4:
        return `border-b-2 bg-gray-100 hover:border-gray-300 focus:border-b-2 bg-transparent border-opacity-50 placeholder:opacity-0 focus:placeholder:opacity-100 duration-100 ${
          prefix ? "px-9" : ""
        } ${getError()}`;
    }
  };

  return (
    <div
      className="flex flex-col relative w-full justify-center mx-auto"
      dir={props.dir}
    >
      <div
        className={`absolute bottom-1/2 ${
          props.dir === DirectionEnum.LTR ? "pl-3" : "pr-3"
        }`}
      >
        {prefix}
      </div>
      <input
        {...props}
        type="text"
        className={`peer h-14 focus:outline-none focus:border-blue-500 text-sm border-gray-300 transition disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none ${getInputVarient()}`}
      />
      <label
        className={`absolute peer-focus:text-blue-500 transition bottom-1/2 duration-200  text-gray-600 disabled:!bg-transparent ${getLabelVarient()} disabled:bg-none `}
      >
        {t(`${label}`)}
      </label>
      <div
        className={`absolute bottom-1/2 ${
          props.dir === DirectionEnum.LTR ? "right-2 pl-3" : "left-2 pr-1"
        }`}
      >
        {sufix}
      </div>
      <div className={`flex justify-between px-2 py-1 text-xs text-gray-500`}>
        {(limit && limit < (props.value?.toString().length || 0)) ||
        errorMsg !== "" ? (
          <p className={` ${getError()} text-red-500`}>{t(`${errorMsg}`)}</p>
        ) : (
          <p className={` ${getError()} `}>{t(`${helperText}`)}</p>
        )}
        {limit && (
          <span
            className={`${
              (props.value?.toString().length || 0) > limit
                ? "text-red-500"
                : ""
            }`}
          >
            {props.value?.toString().length}/{limit}
          </span>
        )}
      </div>
    </div>
  );
}
export default TextInputS1;
