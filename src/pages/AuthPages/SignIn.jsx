import { useState } from "react";
import { useNavigate, Link } from "react-router";
import api from "../../api/axios.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LogoImage from "../../components/common/LogoImage.jsx";
const inputClass =
  "w-full rounded-xl bg-white/[0.04] px-3.5 py-2.5 text-sm text-[#e5e7eb] ring-1 ring-white/[0.08] transition-all duration-200 placeholder:text-[#6b7280] focus:bg-white/[0.06] focus:outline-none focus:ring-[#fab421]/30";

const errorInputClass = "ring-red-500/50 focus:ring-red-500";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      email: "",
      password: "",
    };

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    if (newErrors.email || newErrors.password) {
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Get Sanctum CSRF cookie
      await api.get("/sanctum/csrf-cookie");

      // Login
      await api.post("/login", {
        email,
        password,
      });

      navigate("/");
    } catch (err) {
      setError(
        err.response?.status === 401
          ? "Invalid email or password."
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_120%_60%_at_50%_-10%,rgba(250,180,33,0.06),transparent_60%),linear-gradient(180deg,#0c0c0d_0%,#080808_100%)] px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          {/* <div className="flex items-center rounded-2xl bg-white/[0.97] px-4 py-2.5 ring-1 ring-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
            <img
              src="/images/logo/logo.png"
              alt="Sui Southern Gas Company Limited"
              className="h-9 w-auto max-w-[170px] object-contain"
            />
          </div> */}
          <LogoImage />
        </div>

        <div className="overflow-hidden rounded-2xl bg-[#0c0c0d] ring-1 ring-white/[0.07] shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
          <div className="px-7 pt-7 pb-2 text-center">
            <h1 className="text-lg font-semibold text-gray-100">
              Sign in to your account
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="px-7 py-6">
            <div className="space-y-5">
              {error && (
                <div className="rounded-lg bg-red-500/10 px-3.5 py-2.5 text-sm text-red-400 ring-1 ring-red-500/20">
                  {error}
                </div>
              )}

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8a8f99]"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({
                      ...prev,
                      email: "",
                    }));
                  }}
                  placeholder="name@ssgc.com.pk"
                  className={`${inputClass} ${
                    errors.email ? errorInputClass : ""
                  }`}
                />

                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8a8f99]"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-[#fab421] hover:text-[#fab421]/80"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((prev) => ({
                        ...prev,
                        password: "",
                      }));
                    }}
                    placeholder="••••••••"
                    className={`${inputClass} ${
                      errors.password ? errorInputClass : ""
                    } pr-11`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-[#fab421] transition-colors"
                  >
                    {showPassword ? (
                      <FaEyeSlash size={18} />
                    ) : (
                      <FaEye size={18} />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#fab421] px-4 py-2.5 text-sm font-semibold text-black transition-colors duration-150 hover:bg-[#e6a31d] disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
