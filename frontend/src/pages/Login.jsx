import { useState } from "react";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      setMessage("Login successful ✅");
      navigate("/profile"); // redirect after login
    } catch (error) {
      console.error(error);
      setMessage("Login failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800">Sign In</h2>
          <p className="text-gray-500 mt-3 text-lg">
            Enter your credentials to continue
          </p>
        </div>

        <div className="space-y-6">
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />

            {/* Eye Icon Placeholder */}
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
              👁
            </span>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-gray-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-5 h-5" />
              Remember me
            </label>

            <span className="text-blue-600 font-medium cursor-pointer hover:underline">
              Forgot password?
            </span>
          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            className="w-full py-4 text-lg font-semibold text-white rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-95 active:scale-[0.98] transition transform shadow-md"
          >
            Sign In
          </button>

          {/* Message */}
          {message && (
            <p className="text-center text-sm text-gray-600">{message}</p>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 mt-8 text-lg">
          Don't have an account?{" "}
          <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
            Create one
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
