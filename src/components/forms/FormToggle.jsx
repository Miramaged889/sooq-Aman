import React from "react";

const FormToggle = ({
  label,
  name,
  checked,
  onChange,
  description,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <div className={`flex items-start ${className}`}>
      <div className="flex items-center h-5">
        <input
          id={name}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          {...props}
        />
      </div>
      <div className="mr-3 text-sm">
        <label
          htmlFor={name}
          className={`font-medium text-gray-700 ${
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {label}
        </label>
        {description && <p className="text-gray-500">{description}</p>}
      </div>
    </div>
  );
};

export default FormToggle;
