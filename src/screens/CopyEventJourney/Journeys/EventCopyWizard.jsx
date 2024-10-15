import React, { useContext, useEffect, useState } from 'react';
import ExpandableCheckboxGroup from '../../../components/ExpandableCheckboxGroup/ExpandableCheckboxGroup';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { FormContext } from '../../../utils/formContext';
import Input from '../../../components/Input/Input';
import { useForm } from 'react-hook-form';
import {
  ActionButtonNext,
  ActionButtonPrev,
} from '../../../components/ActionButton/ActionButton';

const EventCopyWizard = ({ steps = [] }) => {
  const [localData, setLocalData] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const {
    events,
    currentEvent,
    setCurrentEvent,
    formData,
    currentStep,
    currentStepData,
    setCurrentStepData,
    setFormData,
    moveToNextStep,
  } = useContext(FormContext);

  const handleEventChange = (e) => {
    const newSelectedEvent = events?.find(
      (event) => event.eventId === e.target.value
    );
    setCurrentEvent(newSelectedEvent);
  };

  useEffect(() => {
    console.warn({ currentStepData });
    for (const key in currentStepData) {
      setValue(key, currentStepData[key]); // Set the current field value if it exists
    }
  }, [currentStepData, setValue]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    setCurrentStepData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onSubmit = (data) => {
    setCurrentStepData((prevData) => ({
      ...prevData,
      ...data, // This will merge filled data into the current step data
    }));
    console.log({ data });
  };
  return (
    <div className='mx-auto px-1 flex flex-col justify-between h-full'>
      <form className='p-2 bg-white rounded-lg'>
        <div className='heading-wrapper'>
          <h1 className='text-lg font-semibold text mb-4'>
            Copy Event Registration Fees
          </h1>
        </div>
        <div className='flex justify-between items-center gap-3'>
          <div className='mb-4 w-full'>
            <label
              htmlFor='selectedEvent'
              className='block text-gray-700 font-bold mb-2'
            >
              Select Event:
            </label>
            <select
              id='selectedEvent'
              name='selectedEvent'
              value={currentEvent?.eventId}
              onChange={handleEventChange}
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-[#FF5B2E] focus:border-[#FF5B2E]'
            >
              {events?.map((event) => (
                <option value={event?.eventId}>{event.eventName}</option>
              ))}
            </select>
          </div>
          <div className='mb-4 w-full'>
            <Input
              id='newEventName'
              name='newEventName'
              value={currentStepData?.newEventName}
              label={'New Event Name:'}
              // error={errors.newEventName?.message}
              onChange={(e) => handleInputChange(e)}
              // register={register('newEventName', {
              //   required: 'Name is required',
              // })}
            />
          </div>
        </div>
        <div className='flex justify-between items-center gap-3'>
          <div className='mb-4 w-full'>
            <Input
              type='text'
              id='newEventCode'
              name='newEventCode'
              label={'New Event Code:'}
              // error={errors.newEventCode?.message}
              onChange={handleInputChange}
            />
          </div>

          <div className='mb-4 date-picker flex items-center gap-3 w-full'>
            <div className='start-date w-full'>
              <label className='block text-gray-700 font-bold mb-2'>
                Start Date:
              </label>
              <input
                type='date'
                name='startDate'
                value={currentEvent?.startDate}
                // value={startDate}
                // onChange={(e) => setStartDate(e.target.value)}
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-[#FF5B2E] focus:border-[#FF5B2E]'
              />
            </div>
            <div className='end-date w-full'>
              <label className='block text-gray-700 font-bold mb-2 mx-2'>
                End Date:
              </label>
              <input
                type='date'
                name='endDate'
                value={currentEvent?.endDate}
                // onChange={(e) => setEndDate(e.target.value)}
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-[#FF5B2E] focus:border-[#FF5B2E]'
              />
            </div>
          </div>
        </div>
        {/* <div className='mb-4 w-full'>
          <ExpandableCheckboxGroup label='Copy Tracks' />
        </div> */}

        <div className='mb-4'>
          <label className='w-max flex items-center bg-gray-100 px-3 py-2 rounded-md mr-2 cursor-pointer'>
            <input
              disabled={currentEvent?.tracks?.length == 0}
              type='checkbox'
              className='myClass custom-checkbox w-4 h-4 rounded mr-2 accent-[#FF5B2E]'
            />
            <span className='text-[#201502] text-sm font-bold mr-2'>
              Copy Tracks
            </span>

            <span className='bg-[#FF5B2E] text-white rounded-full text-sm px-2'>
              {currentEvent?.tracks?.length}
            </span>
          </label>
        </div>
        <div className='mb-4'>
          <label className='w-max flex items-center bg-gray-100 px-3 py-2 rounded-md mr-2 cursor-pointer'>
            <input
              disabled={currentEvent?.sessions?.length == 0}
              type='checkbox'
              className='myClass custom-checkbox w-4 h-4 rounded mr-2 accent-[#FF5B2E]'
            />
            <span className='text-[#201502] text-sm font-bold mr-2'>
              Copy Sessions
            </span>

            <span className='bg-[#FF5B2E] text-white rounded-full text-sm px-2'>
              {currentEvent?.sessions?.length}
            </span>
          </label>
        </div>

        <div className='mb-4'>
          <label className='w-max flex items-center bg-gray-100 px-3 py-2 rounded-md mr-2 cursor-pointer'>
            <input
              type='checkbox'
              disabled={currentEvent?.fees?.length == 0}
              className='myClass custom-checkbox w-4 h-4 rounded mr-2 accent-[#FF5B2E]'
            />
            <span className='text-[#201502] text-sm font-bold mr-2'>
              Copy Fees
            </span>
            <span className='bg-[#FF5B2E] text-white rounded-full text-sm px-2'>
              {currentEvent?.fees?.length}
            </span>
          </label>
        </div>

        <div className='mb-4 w-max'>
          <label className='block text-gray-700 font-bold mb-2'>
            Copy Faculty:
          </label>

          <div className='rounded-md flex h-max'>
            <label className='h-max bg-gray-100 w-max flex items-center px-3 py-2 rounded-md mr-2 cursor-pointer'>
              <input
                type='checkbox'
                className='myClass custom-checkbox w-4 h-4 rounded mr-2 accent-[#FF5B2E]'
              />
              <span className='text-[#201502] text-sm font-bold mr-2'>
                Speaker
              </span>
              <span className='bg-[#FF5B2E] text-white rounded-full text-sm px-2 '>
                {23}
              </span>
            </label>
            <label className='h-max bg-gray-100 w-max flex items-center px-3 py-2 rounded-md mr-2 cursor-pointer'>
              <input
                type='checkbox'
                className='myClass custom-checkbox w-4 h-4 rounded mr-2 accent-[#FF5B2E]'
              />
              <span className='text-[#201502] text-sm font-bold mr-2'>
                Staff
              </span>
            </label>
            <label className='h-max bg-gray-100 w-max flex items-center px-3 py-2 rounded-md mr-2 cursor-pointer'>
              <input
                type='checkbox'
                className='myClass custom-checkbox w-4 rounded mr-2 accent-[#FF5B2E]'
              />
              <span className='text-[#201502] text-sm font-bold mr-2'>
                Volunteer
              </span>
              {/* <span className='bg-[#FF5B2E] text-white rounded-full text-sm px-2 '>
              {23}
            </span> */}
            </label>
            <ExpandableCheckboxGroup label='Teacher' />
          </div>
        </div>

        <div className='mb-4'>
          <label className='w-max flex items-center bg-gray-100 px-3 py-2 rounded-md mr-2 cursor-pointer'>
            <input
              type='checkbox'
              className='myClass custom-checkbox w-4 h-4 rounded mr-2 accent-[#FF5B2E]'
            />
            <span className='text-[#201502] text-sm font-bold'>
              Copy Location
            </span>
          </label>
        </div>
        <div className='mb-4'>
          <label className='w-max flex items-center bg-gray-100 px-3 py-2 rounded-md mr-2 cursor-pointer'>
            <input
              type='checkbox'
              className='myClass custom-checkbox w-4 h-4 rounded mr-2 accent-[#FF5B2E]'
            />
            <span className='text-[#201502] text-sm font-bold'>
              Copy Keywords
            </span>
          </label>
        </div>

        <div className='mb-4'>
          <label className='w-max flex items-center bg-gray-100 px-3 py-2 rounded-md mr-2 cursor-pointer'>
            <input
              type='checkbox'
              className='myClass custom-checkbox w-4 h-4 rounded mr-2 accent-[#FF5B2E]'
            />
            <span className='text-[#201502] text-sm font-bold'>
              Copy Abstract
            </span>
          </label>
        </div>

        <div className='mb-4 w-max'>
          <label className='block text-gray-700 font-bold mb-2'>
            Copy Custom:
          </label>
          <div className='rounded-md flex'>
            <label className='bg-gray-100 w-max flex items-center px-3 py-2 rounded-md mr-2 cursor-pointer'>
              <input
                type='checkbox'
                className='myClass custom-checkbox w-4 h-4 rounded mr-2 accent-[#FF5B2E]'
              />
              <span className='text-[#201502] text-sm font-bold mr-2'>
                Event
              </span>
              <span className='bg-[#FF5B2E] text-white rounded-full text-sm px-2 '>
                {23}
              </span>
            </label>
            <label className='bg-gray-100 w-max flex items-center px-3 py-2 rounded-md mr-2 cursor-pointer'>
              <input
                type='checkbox'
                className='myClass custom-checkbox w-4 h-4 rounded mr-2 accent-[#FF5B2E]'
              />
              <span className='text-[#201502] text-sm font-bold mr-2'>
                Sessions (will be applied to all selected sessions)
              </span>
            </label>
          </div>
        </div>
      </form>
      <div className='flex justify-between mt-6 mb-2'>
        <ActionButtonPrev
          classNames={`${
            currentStep - 1 === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#201502] text-white hover:bg-gray-700 transition duration-200'
          }`}
        />
        <ActionButtonNext
          OnClick={handleSubmit(onSubmit)}
          classNames={`${
            currentStep === steps.length
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#201502] text-white hover:bg-gray-700 transition duration-200'
          }`}
        />
      </div>
    </div>
  );
};

export default EventCopyWizard;
