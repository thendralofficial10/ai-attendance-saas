// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginApi } from "@/services/auth.service";
import { getErrorMessage } from "@/lib/errors";
import { setAuth } from "@/lib/auth";
import { Clock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = (): string | null => {
    if (!email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Enter a valid email";
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const data = await loginApi(email, password);
      setAuth(data.token, data.user);
      router.push("/dashboard");
    } catch (err) {
      setError(getErrorMessage(err, "Invalid email or password"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-paper px-4 py-10">
      <div className="w-full max-w-md sm:max-w-lg">
        <div className="flex items-center gap-2.5 justify-center mb-8">
          <div className="w-10 h-10 bg-teal rounded flex items-center justify-center flex-shrink-0">
            <Clock size={20} className="text-white" />
          </div>
          <span className="font-display font-semibold text-xl text-graphite tracking-tight">
            AttendIQ
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate/15 rounded-lg shadow-sm p-6 sm:p-10 w-full"
        >
          <div className="pb-6 mb-6 border-b border-slate/15">
            <h1 className="font-display font-semibold text-2xl text-graphite">
              Sign in to your account
            </h1>
            <p className="text-sm text-slate mt-1.5">
              HR &amp; Attendance Management Portal
            </p>
          </div>

          {error && (
            <div className="bg-ember/10 border border-ember/25 text-ember text-sm px-3 py-2.5 rounded mb-6">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label className="block text-sm font-medium text-graphite mb-2">
              Work email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate/25 rounded px-3.5 py-3 text-sm bg-paper focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition"
              placeholder="you@company.com"
            />
          </div>

          <div className="mb-7">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-graphite">
                Password
              </label>
              <a href="#" className="text-sm text-teal hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-slate/25 rounded px-3.5 py-3 pr-11 text-sm bg-paper focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate hover:text-graphite"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal text-white py-3 rounded text-sm font-medium hover:opacity-90 disabled:opacity-50 transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-xs text-slate/70 font-mono mt-6 tracking-wide">
          © 2026 AttendIQ · Axiom Inc. · v3.2.1
        </p>
      </div>
    </div>
  );
}