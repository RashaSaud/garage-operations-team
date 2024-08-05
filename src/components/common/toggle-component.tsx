export type ToggleProps = {
  disabled?: boolean;
  smallToggle?: boolean;
  withLabelL?: string;
  withLabelR?: string;
  textSmall?: boolean;
  isActive: boolean;
  handleToggle: (val: boolean) => void;
};

export function Toggle({
  handleToggle,
  isActive,
  disabled,
  smallToggle,
  withLabelL: withLabelL,
  withLabelR: withLabelR,
  textSmall,
}: ToggleProps) {
  return (
    <div
      className={`flex items-center ${withLabelL || withLabelR ? "gap-2" : ""} ${
        disabled ? "opacity-50" : ""
      }`}
    >
      <span
        className={`${textSmall ? "text-base" : "text-xl"} text-neutral-600`}
      >
        {withLabelL}
      </span>
      <button
        disabled={disabled}
        className={`flex ${smallToggle ? "h-5 w-8 " : "h-6 w-11"} cursor-pointer items-center rounded-2xl p-0.5 transition-all duration-300 disabled:cursor-not-allowed ${
          isActive ? "bg-amber-500 justify-start" : "justify-end bg-gray-100"
        }`}
        onClick={() => handleToggle(!isActive)}
      >
        <div
          className={`${
            isActive
              ? "text-yellow-500 shadow-[0px_2px_1.3px_0px_rgba(107,114,128,0.3)]"
              : "text-gray-300 shadow-[0px_2.3px_1.3px_0px_rgba(228,228,231,0.88)]"
          } flex ${smallToggle ? "h-4 w-4" : "h-5 w-5"} items-center justify-center rounded-full bg-white text-xs`}
        ></div>
      </button>
      <span
        className={`${textSmall ? "text-base" : "text-xl"} text-neutral-600`}
      >
        {withLabelR}
      </span>
    </div>
  );
}
