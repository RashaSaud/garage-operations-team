import React, { useState } from "react";
import { StepperProps } from "src/core/types/user.type";
export interface Iitem {
  items: StepperProps[];
}
const StepperVertical = (props: Iitem) => {
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
      <div className="flex flex-col items-center justify-center">
        {props.items.map((step, index) => (
          <div className="flex justify-center gap-2" key={index}>
            <div className="flex flex-col text-left">
              <div className="text-sm">{step.title}</div>
              <div className="text-xs">{step.description}</div>
            </div>
            <div className="flex flex-col gap-1 mb-1 justify-center items-center">
              <div
                className={`${
                  index < 0 ||
                  index < currentStep ||
                  currentStep === props.items.length - 1
                    ? "bg-amber-500 text-white"
                    : "bg-white border border-gray-400 text-gray-400"
                      ? index === currentStep
                        ? "border border-amber-500 text-white"
                        : "bg-white border border-gray-400 text-gray-400"
                      : ""
                }
                  p-2 w-8 h-8 flex-col items-center justify-center flex rounded-full cursor-pointer`}
              >
                {index < currentStep ||
                currentStep === props.items.length - 1 ? (
                  <div>{index + 1}</div>
                ) : <div></div> ? (
                  index === currentStep ? (
                    <div className="flex justify-center items-center w-6 h-6 bg-amber-500 rounded-full">
                      {index + 1}
                    </div>
                  ) : (
                    index + 1
                  )
                ) : (
                  <div></div>
                )}
              </div>
              <div className="">
                {props.items.length - 1 === index ? (
                  <div></div>
                ) : (
                  <div
                    className={`w-px h-8 ${
                      index <= currentStep
                        ? "border border-amber-500"
                        : "border border-gray-400"
                    }`}
                  ></div>
                )}
              </div>
            </div>
            {index < currentStep || currentStep === props.items.length - 1 ? (
              <div className="flex bg-green-50 w-20 h-8 justify-center items-center rounded-2xl">
                <div className="text-green-500 text-sx font-normal font-wide tracking-wide">
                  Completed
                </div>
              </div>
            ) : <div></div> ? (
              index === currentStep ? (
                <div className="flex bg-blue-50 w-20 h-8 justify-center items-center rounded-2xl">
                  <div className="text-blue-500 text-[11px] font-normal font-['Cairo'] tracking-wide">
                    In progress
                  </div>
                </div>
              ) : (
                <div className="flex bg-gray-50 w-[75px] h-[29px] justify-center items-center rounded-[15px]">
                  <div className="text-gray-400 text-[11px] font-normal font-['Cairo'] tracking-wide">
                    Pending
                  </div>
                </div>
              )
            ) : (
              <div></div>
            )}{" "}
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

export default StepperVertical;
