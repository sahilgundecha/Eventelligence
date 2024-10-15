import React, { useState } from 'react';

const ExpandableCheckboxGroup = ({
  label = 'Add Label',
  innerData = [
    { id: 1, label: 'Track1' },
    { id: 1, label: 'Track2' },
    { id: 1, label: 'Track3' },
    { id: 1, label: 'Track4' },
  ],
}) => {
  const [isChecked, setIsChecked] = useState(false);

  // Sample data for inner checkboxes
  const innerCheckboxes = innerData?.map((item) => ({
    id: item.id,
    label: item?.label,
    checked: false,
  }));

  const handleMainCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className='w-max'>
      <label className='w-max flex items-center bg-gray-100 px-3 py-2 rounded-md mr-2 cursor-pointer'>
        <input
          type='checkbox'
          className='custom-checkbox w-4 h-4 rounded mr-2 accent-[#FF5B2E]'
          checked={isChecked}
          onChange={handleMainCheckboxChange}
        />
        <span className='text-[#201502] text-sm font-bold mr-2'>{label}</span>
        <span className='bg-[#FF5B2E] text-white rounded-full text-sm px-2'>
          {innerCheckboxes.length}
        </span>
      </label>

      {!isChecked && innerCheckboxes?.length ? (
        <div className='ml-6 mt-2'>
          {innerCheckboxes.map((track) => (
            <label
              key={track.id}
              className='flex items-center mb-2 bg-gray-100 p-2 rounded-md hover:bg-gray-200 transition duration-200'
            >
              <input
                type='checkbox'
                className='myClass custom-checkbox w-4 h-4 rounded mr-2 accent-[#FF5B2E]'
              />
              <span className='text-[#201502] text-sm font-bold'>
                {track.label}
              </span>
            </label>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ExpandableCheckboxGroup;
