import React from 'react';

const Input = ({
  type = 'text',
  id,
  name,
  value,
  placeholder,
  onChange,
  error,
  required = false,
  className = '',
  label,
  labelClasses = '',
  inputClasses = '',
  register,
  ...rest
}) => {
  return (
    <div className='input-wrapper'>
      <label
        htmlFor={id}
        className={'block text-gray-700 font-bold mb-2+' + labelClasses}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e)}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-[#FF5B2E] focus:border-[#FF5B2E] ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className} ${inputClasses}`}
        required={required}
        {...register}
        {...rest}
      />
      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </div>
  );
};

export default Input;
