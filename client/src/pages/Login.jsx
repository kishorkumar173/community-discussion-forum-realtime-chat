import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import API from "../services/api";

function Login() {
  const [showPassword, setShowPassword] =
    useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {

      const { data } =
        await API.post(
          "/auth/login",
          formData
        );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );

      alert(
        "Login Successful 🚀"
      );

      navigate("/dashboard");

    } catch (error) {

      alert(
        error.response?.data
          ?.message ||
          "Login failed"
      );
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to continue your discussions"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
        />

        {/* Password */}
        <div className="relative">

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="absolute right-4 top-5 text-gray-400"
          >
            {showPassword
              ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
          </button>

        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-2xl font-semibold text-lg hover:scale-[1.02] transition duration-300"
        >
          Login
        </button>

      </form>

      <p className="text-center text-gray-400 mt-6">

        Don’t have an account?{" "}

        <Link
          to="/register"
          className="text-blue-400"
        >
          Register
        </Link>

      </p>

    </AuthLayout>
  );
}

export default Login;