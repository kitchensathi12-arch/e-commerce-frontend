import type { FC } from 'react';

interface Option {
  label: string;
  value: string | number;
}

interface SelectFieldProps {
  label?: string;
  name: string;
  value: string | number;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
}

const SelectField: FC<SelectFieldProps> = ({ label, name, value, onChange, options, placeholder = 'Select an option', required = false, disabled = false, error, className = '' }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-sm font-semibold text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <select
        name={name}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-2.5 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition 
        ${error ? 'border-red-500' : 'border-gray-300'} 
        ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'} 
        ${className}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="mt-1 text-sm text-red-500 font-medium">{error}</p>}
    </div>
  );
};

export default SelectField;
