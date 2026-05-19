const Input = ({
  label,
  type = 'text',
  size = 'md',
  variant = 'default',
  error,
  leftIcon,
  rightIcon,
  className = '',
  name,
  inputClassName = '',
  disabled = false,
  ...props
}) => {
  const wrapperStyles = `
    flex items-center gap-3 rounded-2xl border transition-all duration-300
    focus-within:ring-2 focus-within:ring-amber/30
    focus-within:border-amber
    bg-white
  `;

  const variants = {
    default: 'border-gray-200 hover:border-amber/50',
    filled: 'bg-amber-pale border-transparent',
    outline: 'border-2 border-amber/40',
  };

  const sizes = {
    sm: 'h-10 px-3 text-sm',
    md: 'h-12 px-4 text-[15px]',
    lg: 'h-14 px-5 text-base',
  };

  return (
    <div className="w-full">
      {label && <label className="block mb-2 text-sm font-semibold text-brown">{label}</label>}

      <div
        className={[
          wrapperStyles,
          variants[variant],
          sizes[size],
          disabled && 'opacity-50 cursor-not-allowed',
          error && 'border-red-500 focus-within:ring-red-200',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {leftIcon && <span className="text-gray-400 flex-shrink-0">{leftIcon}</span>}

        <input
          type={type}
          disabled={disabled}
          name={name}
          className={[
            `
              w-full bg-transparent outline-none
              placeholder:text-gray-400 text-brown
            `,
            inputClassName,
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />

        {rightIcon && <span className="text-gray-400 flex-shrink-0">{rightIcon}</span>}
      </div>

      {error && <p className="mt-1 text-sm text-red-500 font-medium">{error}</p>}
    </div>
  );
};

export default Input;
