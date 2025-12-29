const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2
          ${
            error
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-indigo-400"
          }
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
        `}
      />

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
