import { useState } from "react";
import { StepperProps } from "src/core/types/user.type";

interface Iitem {
  items: StepperProps[];
}
const StepperArrow = (props: Iitem) => {
  const [currentStep, setCurrentStep] = useState(-1);
  const handleNext = () => {
    if (currentStep < props.items.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
      <ul className="flex justify-center items-center px-4 w-screen list-none">
        {props.items.map((step, index) => (
          <div className="container w-full" key={index}>
            <div
              className={`
              ${
                index < 0 ||
                index < currentStep ||
                currentStep === props.items.length - 1
                  ? ""
                  : "bg-amber-600"
                    ? index === currentStep
                      ? "bg-amber-600"
                      : "bg-gray-400"
                    : "bg-gray-400"
              }
               center3 rounded flex absolute w-[370.9px]
              `}
            ></div>
            <li
              key={index}
              className={`stepper h-[78px] w-[370px] 
            ${index === props.items.length - 1 ? "last" : "first"}
            ${index !== props.items.length - 1 && index !== 0 ? "center " : ""} 
            cursor-pointer flex flex-col
            ${
              index < 0 ||
              index < currentStep ||
              currentStep === props.items.length - 1
                ? "bg-gray-500 text-white"
                : "bg-white border border-gray-400"
                  ? index === currentStep
                    ? "bg-amber-50 text-amber-600 border border-amber-600"
                    : "bg-white border border-gray-400 "
                  : ""
            }
            `}
            >
              <div className="text-sm text-left">{step.title}</div>
              <div className="text-xs text-left">{step.description}</div>
            </li>
          </div>
        ))}
      </ul>
      <div className="mt-4">
        <div className="mt-4">
          {currentStep > 0 && (
            <button
              onClick={handlePrevious}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-4"
            >
              Previous
            </button>
          )}
          {currentStep < props.items.length - 1 && (
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepperArrow;
