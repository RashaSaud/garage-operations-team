import { useState } from "react";
import { FiHome } from "react-icons/fi";
import { SizesEnum } from "src/core/enums/design-system.enum";
import { TapsModel } from "src/core/types/user.type";

export interface TapsProps {
  size?: string;
  tabList?: TapsModel[];
  color?: string;
  underline?: boolean;
}
export function TabsComponent({
  size = SizesEnum.Medium,
  color,
  ...props
}: TapsProps) {
  const [activeTab, setActiveTab] = useState(1);

  const getSize = () => {
    switch (size) {
      case SizesEnum.Large:
        return "text-lg";
      case SizesEnum.Medium:
        return "text-base";
      default:
        return "text-base";
    }
  };
  const getSizeIcon = () => {
    switch (size) {
      case SizesEnum.Large:
        return "w-6 h-6";
      case SizesEnum.Medium:
        return "w-5 h-5";
      default:
        return "w-5 h-5";
    }
  };

  const getSizeNotification = () => {
    switch (size) {
      case SizesEnum.Large:
        return "w-2 h-2";
      case SizesEnum.Medium:
        return "w-1.5 h-1.5";
      default:
        return "w-1.5 h-1.5";
    }
  };

  return (
    <div className="flex gap-4 mb-4">
      {props.tabList?.map((tab) => (
        <button
          key={tab.id}
          className={`flex items-center justify-center gap-1 px-2 py-2 ${getSize()} font-bold leading-7 tracking-wide ${
            activeTab === tab.id ? `text-${color}-500` : "text-gray-700}"
          } ${
            activeTab === tab.id && props.underline
              ? `border-${color}-500 border-b-4 px-px rounded-sm`
              : ""
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.notification ? (
            <div className="relative">
              <div
                className={`absolute h-2 w-2 bottom-2 left-px ${getSizeNotification()} bg-red-600 rounded-full`}
              ></div>
            </div>
          ) : null}
          {tab.title}
          <FiHome className={`${getSizeIcon()}`} />
        </button>
      ))}
    </div>
  );
}

export default TabsComponent;
