const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 cursor-pointer select-none';

  const variants = {
    primary:
      'bg-gradient-to-br from-amber to-amber-light text-white hover:from-brown-dark hover:to-brown hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(212,134,11,0.35)]',

    outline: 'border border-amber text-amber bg-transparent hover:bg-amber hover:text-white',

    dark: 'bg-brown text-white hover:bg-brown-dark',

    ghost: 'bg-transparent text-brown hover:bg-amber-pale',
  };

  const sizes = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-6 text-[15px]',
    lg: 'h-14 px-8 text-base',
  };

  return (
    <button
      disabled={disabled || loading}
      className={[
        baseStyles,
        variants[variant],
        sizes[size],
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
};

export default Button;
