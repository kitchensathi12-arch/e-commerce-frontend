type InputProps = {
  label: string;
  error?: string | false;
  rightElement?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ label, error, rightElement, ...props }: InputProps) => {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>

      <div className="relative">
        <input
          {...props}
          className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition pr-14
            ${error ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-sky-600 focus:border-sky-600'}
          `}
        />

        {rightElement && <div className="absolute right-4 top-1/2 -translate-y-1/2">{rightElement}</div>}
      </div>

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
