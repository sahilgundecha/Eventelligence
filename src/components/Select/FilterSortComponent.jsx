import React, { useState } from 'react';
// import './FilterSortComponent.css';
import { ChevronDown, ChevronUp } from 'react-feather';

const FilterSortComponent = ({ onFilterChange, onSortChange }) => {
  const [filters, setFilters] = useState({
    upcoming: true,
    ongoing: true,
    past: false,
  });

  const [sortOption, setSortOption] = useState('Newest to Oldest');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: checked,
    }));
    onFilterChange({ ...filters, [name]: checked });
  };

  const handleSortChange = (e) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);
    onSortChange(newSortOption);
    setIsDropdownOpen(false); // Close dropdown on selection
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className='filter-sort-container'>
      <div
        className='label border border-[#e0e0e0] rounded p-2 flex justify-between items-center relative gap-5'
        onClick={toggleDropdown}
      >
        Filter
        {isDropdownOpen ? <ChevronUp /> : <ChevronDown />}
      </div>
      {isDropdownOpen ? (
        <div
          className='absolute border border-[#e0e0e0] rounded-lg p-4 bg-white mt-2'
          style={{ boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.29)' }}
        >
          <h3 className='mb-2'>Status</h3>
          <label className='flex items-center bg-gray-100 px-3 py-2 rounded-md cursor-pointer mb-2'>
            <input
              type='checkbox'
              className='myClass custom-checkbox w-4 h-4 rounded mr-2 accent-[#FF5B2E]'
            />
            <span className='text-[#201502] text-sm font-bold'>Upcoming</span>
          </label>
          <label className='flex items-center bg-gray-100 px-3 py-2 rounded-md cursor-pointer mb-2'>
            <input
              type='checkbox'
              className='myClass custom-checkbox w-4 h-4 rounded mr-2 accent-[#FF5B2E]'
            />
            <span className='text-[#201502] text-sm font-bold'>Ongoing</span>
          </label>
          <label className='flex items-center bg-gray-100 px-3 py-2 rounded-md cursor-pointer mb-1'>
            <input
              type='checkbox'
              className='myClass custom-checkbox w-4 h-4 rounded mr-2 accent-[#FF5B2E]'
            />
            <span className='text-[#201502] text-sm font-bold'>Past</span>
          </label>
          {/* <label>
            <input
              type='checkbox'
              name='ongoing'
              checked={filters.ongoing}
              onChange={handleFilterChange}
            />
            Ongoing
          </label> */}
        </div>
      ) : null}

      {/* <div className='sort-container'>
        <h3 onClick={toggleDropdown} className='sortable-header'>
          Sort by: {sortOption} ▼
        </h3>
        {isDropdownOpen && (
          <div className='dropdown'>
            <select value={sortOption} onChange={handleSortChange}>
              <option value='Newest to Oldest'>Newest to Oldest</option>
              <option value='Oldest to Newest'>Oldest to Newest</option>
              <option value='Name: A - Z'>Name: A - Z</option>
              <option value='Name: Z - A'>Name: Z - A</option>
            </select>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default FilterSortComponent;
