"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  FaUser,
  FaBuilding,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebook,
  FaApple,
  FaArrowRight,
} from "react-icons/fa";

export default function LoginPage() {
  const t = useTranslations("auth.login");
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const [userType, setUserType] = useState<"user" | "business">("user");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
    companyName: "",
    taxCode: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
      const response = await fetch(`${backendUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": locale, // Send language header (vi or en)
          "X-Locale": locale, // Custom locale header
        },
        credentials: "include", // Include cookies
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          userType,
          companyName: formData.companyName,
          taxCode: formData.taxCode,
          rememberMe: formData.rememberMe,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Đăng nhập thất bại. Vui lòng thử lại.");
        setIsLoading(false);
        return;
      }

      // Store user data in localStorage (optional, for client-side access)
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(data.data.user));
        localStorage.setItem("token", data.data.token);
      }

      // Redirect based on user type
      if (data.data.user.userType === "business") {
        router.push(`/${locale}/dashboard/company`);
      } else {
        router.push(`/${locale}/dashboard/user`);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/img/auth/logoauth.jpg')" }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-emerald-900/50" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >

        {/* Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-6">
          {/* Tab Selector */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-5">
            <button
              type="button"
              onClick={() => setUserType("user")}
className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${userType === "user"
                   ? "bg-white text-gray-900 shadow-md"
                   : "text-gray-500 hover:text-gray-700"
                }`}
            >
              <FaUser className="w-4 h-4" />
              <span>{t("userTab")}</span>
            </button>
            <button
              type="button"
              onClick={() => setUserType("business")}
className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${userType === "business"
                   ? "bg-white text-gray-900 shadow-md"
                   : "text-gray-500 hover:text-gray-700"
                }`}
            >
              <FaBuilding className="w-4 h-4" />
              <span>{t("businessTab")}</span>
            </button>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { icon: FaGoogle, bg: "hover:bg-red-50 hover:border-red-200 hover:text-red-500" },
              { icon: FaFacebook, bg: "hover:bg-blue-50 hover:border-blue-200 hover:text-blue-500" },
              { icon: FaApple, bg: "hover:bg-gray-100 hover:border-gray-300" },
            ].map((social, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center justify-center py-2 border border-gray-200 rounded-lg transition-all ${social.bg}`}
              >
                <social.icon className="w-4 h-4" />
              </motion.button>
            ))}
          </div>

          {/* Divider */}
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/80 text-gray-500">hoặc</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <AnimatePresence mode="wait">
              {userType === "business" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {t("companyName")}
                    </label>
                    <div className="relative">
                      <FaBuilding className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        name="companyName"
                        type="text"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                        placeholder="Tên công ty"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {t("taxCode")}
                    </label>
                    <div className="relative">
                      <FaBuilding className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        name="taxCode"
                        type="text"
                        value={formData.taxCode}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                        placeholder="Mã số thuế"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                {t("email")}
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-gray-700">
                  {t("password")}
                </label>
                <Link href={`/${locale}/auth/forgot-password`} className="text-xs text-blue-600 hover:text-blue-700">
                  {t("forgotPassword")}
                </Link>
              </div>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-3.5 h-3.5 border border-gray-300 rounded text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="rememberMe" className="ml-2 text-xs text-gray-600">
                {t("rememberMe")}
              </label>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {t("submit")}
                  <FaArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Register link */}
          <p className="text-center mt-4 text-sm text-gray-600">
            {t("noAccount")}{" "}
            <Link href={`/${locale}/auth/register`} className="font-semibold text-blue-600 hover:text-blue-700">
              {t("register")}
            </Link>
          </p>
        </div>

      </motion.div>
    </div>
  );
}
