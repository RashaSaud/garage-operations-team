import { useState } from "react";
import { BiCheck } from "react-icons/bi";
export interface StepperCheckProps {
  steps: string[];
  className?: string;
}
const StepperCheck = (props: StepperCheckProps) => {
  const [currentStep, setCurrentStep] = useState(-1);
  const handleNext = () => {
    if (currentStep < props.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <div className="flex justify-center items-center gap-1 w-screen px-4">
        {props.steps.map((step, index) => (
          <div className="flex flex-col w-[30%] min-w-min" key={index}>
            <div
              className={`${
                index < 0 ||
                index < currentStep ||
                currentStep === props.steps.length - 1
                  ? "bg-gray-500 text-white"
                  : "bg-gray-200 text-gray-600"
                    ? index === currentStep
                      ? "bg-amber-400 text-white"
                      : "bg-gray-200 text-gray-600"
                    : ""
              }
                 h-1 rounded-sm w-full`}
            ></div>
            <div className="flex items-center gap-2 pt-1">
              {index < currentStep || currentStep === props.steps.length - 1 ? (
                <div className="flex w-4 h-4 bg-gray-500 justify-center items-center rounded-full">
                  <BiCheck className="text-white w-9 h-9" />
                </div>
              ) : <div></div> ? (
                index === currentStep ? (
                  <div className="w-4 h-4 rounded-full border-[5px] border-amber-500"></div>
                ) : (
                  <div className="w-4 h-4 rounded-full border-gray-400 border-2"></div>
                )
              ) : (
                <div></div>
              )}
              <div className={props.className}>{step}</div>
            </div>
          </div>
        ))}
      </div>
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
          {currentStep < props.steps.length - 1 && (
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

export default StepperCheck;
