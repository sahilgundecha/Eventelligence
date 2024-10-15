import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';

const Sort = () => {
  const [sortOption, setSortOption] = useState('Newest to Oldest');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility


  const sortOptions = [
    { label: 'Sort A-Z', value: 'A-Z' },
    { label: 'Sort Z-A', value: 'Z-A' },
    { label: 'Date: Newest to Oldest', value: 'Newest to Oldest' },
    { label: 'Date: Oldest to Newest', value: 'Oldest to Newest' },
  ];

  const handleSortChange = (value) => {
    setSortOption(value);
    setIsDropdownOpen(false); // Close dropdown on selection
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className='sort-container w-full cursor-pointer'>
      <div
        onClick={toggleDropdown}
        className='label border border-[#e0e0e0] rounded p-2 flex justify-between items-center relative gap-1'
      >
        Sort by: <span className='font-bold text-sm'>{sortOption}</span>
        {!isDropdownOpen ? <ChevronDown /> : <ChevronUp />}
      </div>
      {isDropdownOpen ? (
        <div
          className='absolute border border-[#e0e0e0] rounded-lg p-4 bg-white mt-2 w-56'
          style={{ boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.29)' }}
        >
          <h3 className='mb-2'>Status</h3>
          {sortOptions.map((item, i) => (
            <div
              className='border-b p-2 hover:bg-[#e0e0e0] cursor-pointer'
              onClick={() => handleSortChange(item.value)}
            >
              <p className='item text-sm font-normal'>{item.label}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Sort;
