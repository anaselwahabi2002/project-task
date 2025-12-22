export default function LoginButton({ loading }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="
        w-full cursor-pointer
        rounded-xl bg-gradient-to-r from-blue-600 to-blue-500
        py-2.5 text-sm font-semibold text-white
        shadow-sm transition-all duration-200
        hover:from-blue-700 hover:to-blue-600 hover:shadow-md
        active:scale-95
        focus:outline-none focus:ring-2 focus:ring-blue-500/40
        disabled:cursor-not-allowed disabled:opacity-60
      "
    >
      {loading ? "Signing in..." : "Sign in"}
    </button>
  );
}
