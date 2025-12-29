const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary", // primary | secondary | destructive
  loading = false,
  disabled = false,
}) => {
  const base =
    "px-4 py-2 rounded-md text-sm font-medium transition flex items-center justify-center gap-2";

  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-400",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-400",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${
        disabled || loading ? "opacity-60 cursor-not-allowed" : ""
      }`}
    >
      {loading && (
        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
};

export default Button;
