import React from 'react';

const InputFieldF = ({
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  rows = 3,
  options = [],
}) => {
  const isTextArea = type === 'textarea';
  const isSelect = type === 'select';

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
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
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
        />
      ) : isSelect ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
        >
          <option value="">{placeholder}</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
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
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
        />
      )}
    </div>
  );
};

export default InputFieldF;
