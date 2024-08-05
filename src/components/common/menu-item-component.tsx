import React, { useState } from "react";
import {
  MenuStatusEnum,
  MenuTypeEnum,
  OptionLevelEnum,
} from "src/core/enums/design-system.enum";
export interface MenuItemProps {
  text?: string;
  action1?: JSX.Element;
  action2?: JSX.Element;
  action3?: JSX.Element;
  type: MenuTypeEnum;
  width?: string;
  height?: string;
  status?: MenuStatusEnum;
  level?: OptionLevelEnum;
}
function MenuItem({
  text = "",
  width = "w-80",
  height = "h-9",
  action1 = <>Action 1</>,
  action2 = <>Action 2</>,
  action3 = <>Action 3</>,
  status = MenuStatusEnum.Default,
  type = MenuTypeEnum.Label,
  level = OptionLevelEnum.One,
}: MenuItemProps) {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const getStatusStyle = (passedStatus?: MenuStatusEnum) => {
    const default_status =
      "bg-white text-gray-900 dark:bg-gray-900 dark:text-white";
    const hover = "hover:bg-opacity-70 dark:hover:bg-gray-800";
    const active =
      "active:bg-amber-50 dark:active:bg-amber-500 dark:active:text-white";
    const selected =
      "bg-amber-50 dark:bg-amber-500 dark:text-white hover:border hover:border-amber-500 hover:dark:border hover:dark:border-amber-700";
    const disabled =
      "bg-white text-gray-300 dark:bg-gray-900 dark:text-gray-500";

    switch (passedStatus || status) {
      case MenuStatusEnum.Default:
        return `${default_status} ${hover} ${active}`;
      case MenuStatusEnum.Selected:
        return `${selected}`;
      case MenuStatusEnum.Disabled:
        return `${disabled}`;
      default:
        return `${default_status} ${hover} ${active}`;
    }
  };

  const changeToSelect = () => {
    setIsSelected(!isSelected);
  };
  const doAction1 = () => {
    ("do action 1");
  };
  const doAction2 = () => {
    ("do action 2");
  };
  const doAction3 = () => {
    ("do action 3");
  };

  // if type is option then I can use level function.
  const getOptionLevel = () => {
    switch (level) {
      case OptionLevelEnum.One:
        return "px-4";
      case OptionLevelEnum.Two:
        return "px-11";
      case OptionLevelEnum.Three:
        return "px-16";
      case OptionLevelEnum.Four:
        return "px-24";
      case OptionLevelEnum.Five:
        return "px-32";
      default:
        return "px-4";
    }
  };

  return type === MenuTypeEnum.Option ? (
    status === MenuStatusEnum.Disabled ? (
      <button
        onClick={changeToSelect}
        className={`${width} ${height} ${
          isSelected
            ? getStatusStyle(MenuStatusEnum.Selected)
            : getStatusStyle()
        } ${getOptionLevel()} flex justify-start items-center text-sm cursor-not-allowed`}
        disabled
      >
        {text}
      </button>
    ) : (
      <button
        onClick={changeToSelect}
        className={`${width} ${height} ${
          isSelected
            ? getStatusStyle(MenuStatusEnum.Selected)
            : getStatusStyle()
        } ${getOptionLevel()} flex justify-start items-center text-sm cursor-pointer`}
      >
        {text}
      </button>
    )
  ) : type === MenuTypeEnum.Label ? (
    <div
      className={`${width} ${height} flex justify-start items-center text-sm bg-white dark:bg-gray-900 dark:text-gray-400 text-gray-500 px-4`}
    >
      {text}
    </div>
  ) : (
    <div
      className={`${width} ${height} flex flex-row justify-between items-center text-sm px-4 text-amber-500 bg-white dark:bg-gray-900 dark:text-amber-500`}
    >
      <div className="flex flex-row gap-4">
        <div onClick={doAction1} className="cursor-pointer">
          {action1}
        </div>
        <div onClick={doAction2} className="cursor-pointer">
          {action2}
        </div>
      </div>
      <div onClick={doAction3} className="cursor-pointer">
        {action3}
      </div>
    </div>
  );
}

export default MenuItem;
