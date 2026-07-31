import { useState } from "react";
import { useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LogoImage from "../../components/common/LogoImage.jsx";
import { useUser } from "../../context/UserContext.jsx";

const inputClass =
  "w-full rounded-xl bg-white px-3.5 py-2.5 text-sm text-gray-900 ring-1 ring-gray-200 transition-all duration-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F5821F]/40";
const errorInputClass = "ring-red-300 focus:ring-red-400";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const { login, isLoggingIn } = useUser(); // CHANGED

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = { email: "", password: "" };
    if (!email.trim()) newErrors.email = "Email is required.";
    if (!password.trim()) newErrors.password = "Password is required.";
    setErrors(newErrors);
    if (newErrors.email || newErrors.password) return;

    setError("");

    try {
      await login({ email, password }); // CHANGED — mutation handles csrf + post + cache invalidation
      navigate("/");
    } catch (err) {
      setError(
        err.response?.status === 401
          ? "Invalid email or password."
          : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_120%_60%_at_50%_-10%,rgba(245,130,31,0.06),transparent_60%),linear-gradient(180deg,#FAFAF8_0%,#F3F2EF_100%)] px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <LogoImage />
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
          <div className="px-7 pt-7 pb-2 text-center">
            <h1 className="text-lg font-semibold text-gray-900">
              Sign in to your account
            </h1>
            <div className="mx-auto mt-2 h-1 w-14 rounded-full bg-gradient-to-r from-[#F5821F] to-[#D9631A]" />
          </div>

          <form onSubmit={handleSubmit} className="px-7 py-6">
            <div className="space-y-5">
              {error && (
                <div className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-600 ring-1 ring-red-100">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  placeholder="name@ssgc.com.pk"
                  className={`${inputClass} ${errors.email ? errorInputClass : ""}`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="password" className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((prev) => ({ ...prev, password: "" }));
                    }}
                    placeholder="••••••••"
                    className={`${inputClass} ${errors.password ? errorInputClass : ""} pr-11`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-[#F5821F] transition-colors"
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoggingIn} // CHANGED — was local `loading` state
                className="w-full rounded-xl bg-[#F5821F] px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#D9631A] disabled:opacity-60"
              >
                {isLoggingIn ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;