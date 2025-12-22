export default function LoginInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div className="mb-4">
      <label className="mb-1 block text-xs font-medium text-slate-600">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="
          w-full rounded-lg border border-slate-300
          px-4 py-2.5 text-sm
          outline-none transition
          focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
        "
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
