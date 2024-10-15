import React, { useContext, useMemo, useState } from 'react';
import Stepper from '../../components/Stepper/Stepper';
import { X } from 'react-feather';
import EventCopyWizard from './Journeys/EventCopyWizard';
import EventRegistrationFees from './Journeys/EventRegistrationFees';
import CopySessions from './Journeys/CopySessions';
import CopyTracks from './Journeys/CopyTracks';
import ConfirmCopySettings from './Journeys/ConfirmCopySettings';
import { useNavigate } from 'react-router-dom';
import { FormContext } from '../../utils/formContext';

const CopyJourney = ({ events }) => {
  const steps = [
    'Registrant Info',
    'Fees',
    'Guests',
    'Products',
    'Demographics',
  ];
  const navigate = useNavigate();

  const { currentStep, moveToNextStep, moveToPreviousStep, setCurrentStep } =
    useContext(FormContext);

  const onStepperClick = (stepperCount) => {
    if (stepperCount != undefined) {
      setCurrentStep(stepperCount + 1);
    }
  };

  const { Component = null, title = '' } = useMemo(() => {
    const components = [
      { Component: EventCopyWizard, title: '' },
      {
        Component: EventRegistrationFees,
        title: 'Copy Event Registration Fees',
      },
      { Component: CopySessions, title: 'Copy Sessions' },
      { Component: CopyTracks, title: 'Copy Tracks' },
      { Component: ConfirmCopySettings, title: 'Conform Copied Data' },
    ];
    return components[currentStep - 1];
  }, [currentStep]);

  return (
    <div className='flex flex-col justify-between h-full'>
      <div>
        <div className='header-wrapper flex justify-between items-center my-8'>
          <div className='flex-1'>
            <h1 className='text-xl font-semibold text mb-1'>
              Event Copy Wizard
            </h1>
            {/* <p className='text-gray-600 text-base font-normal'>{title}</p> */}
          </div>
          <div className='close-btn box-content'>
            <button
              className='outline outline-1 outline-[#201502] text-base text-[#201502] px-4 py-2 rounded-md flex items-center gap-1 hover:outline-[#FF5B2E] hover:text-[#FF5B2E]'
              onClick={() => navigate('/dashboard')}
            >
              <X width={'18px'} />
              Cancel Event Copy
            </button>
          </div>
        </div>
        {/* <div className='w-full h-[1px] bg-[#E9EBEF] my-3'></div> */}
        <Stepper
          steps={steps}
          activeStep={currentStep - 1}
          onStepperClick={onStepperClick}
        />
      </div>

      <div className='flex-1 myclass'>
        <Component events={events} steps={steps} />
      </div>
    </div>
  );
};

export default CopyJourney;
