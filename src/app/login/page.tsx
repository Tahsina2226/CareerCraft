"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../../utils/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export default function LoginPage() {
  const router = useRouter();
  const { setToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/login", {
        email: email.toLowerCase(),
        password,
      });

      setToken(res.data.token);
      toast.success("Login Successful!");
      router.push("/dashboard");
    } catch (err: unknown) {
      const error = err as ApiError;
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center px-4 py-8 min-h-screen"
      style={{ backgroundColor: "#B8C4A9" }}
    >
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex justify-center items-center bg-[#B1AB86] shadow-lg mx-auto mb-4 rounded-full w-20 h-20">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="mb-2 font-bold text-[#5D6D4B] text-3xl">
            Welcome Back
          </h1>
          <p className="text-[#7D8566]">Sign in to access your dashboard</p>
        </div>

        <div className="bg-white/90 shadow-2xl backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden">
          <div className="p-8">
            <div className="mb-8 text-center">
              <h2 className="font-bold text-[#B1AB86] text-2xl">Owner Login</h2>
              <div className="bg-[#B1AB86] mx-auto mt-2 rounded-full w-16 h-1"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="font-medium text-[#5D6D4B] text-sm">
                  Email Address
                </label>
                <div className="relative">
                  <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-[#B1AB86]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white/50 py-3 pr-4 pl-10 border border-[#E5E7EB] focus:border-transparent rounded-xl focus:outline-none focus:ring-[#B1AB86] focus:ring-2 w-full transition duration-200"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-medium text-[#5D6D4B] text-sm">
                  Password
                </label>
                <div className="relative">
                  <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-[#B1AB86]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="bg-white/50 py-3 pr-12 pl-10 border border-[#E5E7EB] focus:border-transparent rounded-xl focus:outline-none focus:ring-[#B1AB86] focus:ring-2 w-full transition duration-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="right-0 absolute inset-y-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <svg
                      className={`h-5 w-5 ${
                        showPassword ? "text-[#B1AB86]" : "text-gray-400"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {showPassword ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="border-gray-300 rounded focus:ring-[#B1AB86] w-4 h-4 text-[#B1AB86]"
                  />
                  <span className="ml-2 text-[#5D6D4B] text-sm">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="font-medium text-[#B1AB86] hover:text-[#9c946d] text-sm transition duration-200"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-4 rounded-xl font-semibold text-white transition duration-200 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#B1AB86] to-[#9c946d] hover:from-[#9c946d] hover:to-[#B1AB86] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                }`}
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <svg
                      className="mr-3 -ml-1 w-5 h-5 text-white animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-[#7D8566] text-sm">
                Don&apos;t have an account?{" "}
                <button
                  className="font-medium text-[#B1AB86] hover:text-[#9c946d] transition duration-200"
                  onClick={() => router.push("/register")}
                >
                  Contact administrator
                </button>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-[#7D8566] text-xs">
            © 2024 Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
