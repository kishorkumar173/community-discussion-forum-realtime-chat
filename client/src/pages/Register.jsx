import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import API from "../services/api";

function Register() {
  const [showPassword, setShowPassword] =
    useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
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
          "/auth/register",
          formData
        );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );

      alert(
        "Registration Successful 🚀"
      );

      navigate("/dashboard");

    } catch (error) {

      alert(
        error.response?.data
          ?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join the community today"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
        />

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

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-4 rounded-2xl font-semibold text-lg hover:scale-[1.02] transition duration-300"
        >
          Register
        </button>

      </form>

      <p className="text-center text-gray-400 mt-6">

        Already have an account?{" "}

        <Link
          to="/"
          className="text-blue-400"
        >
          Login
        </Link>

      </p>

    </AuthLayout>
  );
}

export default Register;