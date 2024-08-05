import { useState } from "react";
import { BiCheck } from "react-icons/bi";
export interface StepperProps {
  steps: string[];
}
const Stepper = (props: StepperProps) => {
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
    <div>
      {props.steps.map((step, index) => (
        <div key={index}>
          <div className="flex items-center">
            <div
              className={`${
                index < 0 ||
                index < currentStep ||
                currentStep === props.steps.length - 1
                  ? "bg-amber-500 text-white"
                  : "bg-gray-200 text-gray-600"
                    ? index === currentStep
                      ? "bg-amber-400 text-white"
                      : "bg-gray-200 text-gray-600"
                    : ""
              }
                  p-2 w-6 h-6 items-center justify-center flex rounded-full cursor-pointer`}
            >
              {index + 1 ? (
                index < currentStep ||
                currentStep === props.steps.length - 1 ? (
                  <div>
                    <BiCheck />
                  </div>
                ) : (
                  index + 1
                )
              ) : (
                <div>
                  <BiCheck />
                </div>
              )}
            </div>
            <div className="px-3">
              {props.steps.length - 1 === index ? (
                <div></div>
              ) : (
                <div
                  className={`${
                    index <= currentStep
                      ? "border border-solid border-amber-500 w-14 h-px"
                      : "border border-dashed border-spacing-52 border-gray-400 w-14 h-px"
                  }`}
                ></div>
              )}
            </div>
          </div>
          <div className="mt-2">{step}</div>
        </div>
      ))}
      <div className="mt-8">
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
  );
};

export default Stepper;
