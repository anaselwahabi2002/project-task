export default function ProjectSearch({ value, onChange }) {
  return (
    <div className="mb-6 flex items-center">
      <div className="relative w-full max-w-sm">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search projects..."
          className="
            w-full rounded-xl border border-slate-300 bg-white
            px-4 py-2 pl-10 text-sm shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        />
        
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
    </div>
  );
}
