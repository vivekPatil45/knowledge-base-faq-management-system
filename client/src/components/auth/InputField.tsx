import React from "react";

interface InputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  icon?: React.ReactNode;
  placeholder?: string;
  rightElement?: React.ReactNode;
  disabled?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  value,
  onChange,
  icon,
  placeholder,
  rightElement,
  disabled = false,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>

      {/* Wrapper with flex to align icon + input + rightElement */}
      <div
        className={`flex items-center w-full rounded-xl border border-gray-300 dark:border-gray-600 
        bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm
        focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {/* Left Icon */}
        {icon && <span className="ml-3 text-gray-400 flex-shrink-0">{icon}</span>}

        {/* Input */}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 bg-transparent border-none focus:outline-none px-3 py-3 text-gray-700 dark:text-gray-300"
        />

        {/* Right Element (e.g., eye toggle, button) */}
        {rightElement && <span className="mr-3">{rightElement}</span>}
      </div>
    </div>
  );
};
