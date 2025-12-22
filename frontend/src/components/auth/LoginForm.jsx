import { useState } from "react";
import { login } from "../../services/auth.service";

import LoginHeader from "./LoginHeader";
import LoginError from "./LoginError";
import LoginInput from "./LoginInput";
import LoginButton from "./LoginButton";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email, password });
      window.location.href = "/projects";
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-md
          rounded-2xl bg-white p-8
          shadow-sm ring-1 ring-slate-200
          transition-all duration-300
          hover:shadow-md
        "
      >
        <LoginHeader />
        <LoginError message={error} />

        <LoginInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="mb-6">
          <LoginInput
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <LoginButton loading={loading} />
      </form>
    </div>
  );
}
