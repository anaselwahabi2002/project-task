export default function LoginError({ message }) {
  if (!message) return null;

  return (
    <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 text-center">
      {message}
    </p>
  );
}
