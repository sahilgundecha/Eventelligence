import React from 'react';
import { Check } from 'react-feather';

const Stepper = ({ steps, activeStep, onStepperClick }) => {
  return (
    <div className='mx-auto py-3'>
      <div className='flex items-center justify-between pb-4'>
        {steps.map((step, index) => (
          <>
            <div
              onClick={() => onStepperClick(index)}
              key={index}
              className={`w-max flex items-center justify-between px-4 py-2 relative gap-1 rounded-full border cursor-pointer ${
                index == activeStep
                  ? 'bg-[#FF5B2E] text-white'
                  : index < activeStep
                  ? 'bg-[#201502] text-white'
                  : 'bg-[#E9EBEF] text-black'
              }`}
            >
              <div className='text-sm font-bold'>
                {index < activeStep ? (
                  <Check width={'14px'} height={'auto'} strokeWidth={3} />
                ) : (
                  <span className='bg-[white] rounded-full text-sm px-2 text-[#201502]'>
                    {index + 1}
                  </span>
                )}
              </div>
              <div className={`text-sm font-bold whitespace-nowrap`}>
                {step}
              </div>
            </div>
            {index < steps?.length - 1 && (
              <div className='sep w-full h-[1px] bg-[#E9EBEF] mx-3'></div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
