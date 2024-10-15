import React, { createContext, useEffect, useState } from 'react';

// const initialState = {
//   currentStep: 0,
//   formData: {
//     copyWizard: {},
//     CopyRegistrationFeees: {},
//     CopySessions: {},
//     CopyTracks: {},
//     ConfirmSettings: {},
//   },
//   currenStep: {},
// };

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem('formData');
    return savedFormData ? JSON.parse(savedFormData) : {};
  });

  const [currentStepData, setCurrentStepData] = useState(() => {
    const savedStepData = localStorage.getItem('currentStepData');
    return savedStepData ? JSON.parse(savedStepData) : {};
  });

  const [currentStep, setCurrentStep] = useState(() => {
    return Number(localStorage.getItem('currentStep')) ?? 0;
  });

  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });
  const [currentEvent, setCurrentEvent] = useState(() => {
    const savedCurrentEvent = localStorage.getItem('currentEvent');
    return savedCurrentEvent ? JSON.parse(savedCurrentEvent) : {};
  });

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('currentStepData', JSON.stringify(currentStepData));
  }, [currentStepData]);

  useEffect(() => {
    localStorage.setItem('currentStep', currentStep);
  }, [currentStep]);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('currentEvent', JSON.stringify(currentEvent));
  }, [currentEvent, setCurrentEvent]);

  const moveToNextStep = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [`step${currentStep}`]: currentStepData,
    }));
    setCurrentStep((prevStep) => prevStep + 1);
    setCurrentStepData({});
  };

  const moveToPreviousStep = () => {
    setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };
  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        currentStepData,
        setCurrentStepData,
        currentStep,
        setCurrentStep,
        moveToNextStep,
        moveToPreviousStep,
        events,
        setEvents,
        currentEvent,
        setCurrentEvent,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
