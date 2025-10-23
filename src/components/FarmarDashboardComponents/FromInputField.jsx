import React from 'react';
import { useTheme } from '../../hooks/useTheme';

const FromInputField = ({
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  rows = 3,
  options = [],
}) => {
  const { theme } = useTheme();

  // Theme-based styles
  const baseStyle =
    'mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm';
  const themeInputStyle =
    theme === 'dark'
      ? 'bg-[#1e1e1e] border border-gray-600 text-gray-100 placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500'
      : 'bg-white border border-gray-300 text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500';
  const themeLabelStyle = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const themeOptionStyle =
    theme === 'dark' ? 'bg-[#1e1e1e] text-gray-100' : 'bg-white text-gray-900';

  const isTextArea = type === 'textarea';
  const isSelect = type === 'select';

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className={`block text-sm font-medium ${themeLabelStyle}`}
      >
        {label}
      </label>

      {isTextArea ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${baseStyle} ${themeInputStyle}`}
        />
      ) : isSelect ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`${baseStyle} ${themeInputStyle}`}
        >
          <option value="" disabled>
            {placeholder || `Select ${label}`}
          </option>
          {options.map(opt => (
            <option
              key={opt.value}
              value={opt.value}
              className={themeOptionStyle}
            >
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${baseStyle} ${themeInputStyle}`}
        />
      )}
    </div>
  );
};

export default FromInputField;
