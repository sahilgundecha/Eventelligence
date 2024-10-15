import React from 'react';
import { FormContext, FormProvider } from '../../utils/formContext';

export const ActionButtonNext = ({
  OnClick,
  disabled,
  classNames,
  label = 'Next',
}) => {
  const { currentStep } = FormProvider(FormContext);
  return (
    <button
      onClick={OnClick}
      disabled={disabled}
      className={`w-max py-2 px-4 rounded ${classNames}`}
    >
      {label}
    </button>
  );
};

export const ActionButtonPrev = ({
  OnClick,
  disabled,
  classNames,
  label = 'Prev',
}) => {
  const { currentStep } = FormProvider(FormContext);
  return (
    <button
      onClick={OnClick}
      disabled={disabled}
      className={`w-max py-2 px-4 rounded ${classNames}`}
    >
      {label}
    </button>
  );
};
