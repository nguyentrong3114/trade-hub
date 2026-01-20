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
  FaPhone,
  FaMapMarkerAlt,
  FaIdCard,
  FaGoogle,
  FaFacebook,
  FaApple,
  FaArrowRight,
  FaCheck,
} from "react-icons/fa";
import { useAuthStore } from "@/stores/authStore";
import { getDashboardPathByUserType } from "@/lib/auth-routing";

export default function RegisterPage() {
  const t = useTranslations("auth.register");
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const { login } = useAuthStore();
  const [userType, setUserType] = useState<"USER" | "BUSINESS">("USER");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    termsAccepted: false,
    privacyPolicyAccepted: false,
    companyName: "",
    taxCode: "",
    address: "",
    representative: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && userType === "BUSINESS") {
      setStep(2);
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // Prepare request body based on user type
      // Convert userType to lowercase for backend
      const userTypeLower = userType.toLowerCase() as "user" | "business";
      
      const requestBody: Record<string, unknown> = {
        email: formData.email,
        password: formData.password,
        userType: userTypeLower,
      };

      if (userType === "USER") {
        // User registration: only send required fields
        requestBody.username = formData.username;
        requestBody.fullName = formData.fullName;
        requestBody.phone = formData.phone;
      } else {
        // Business registration: send all business fields
        requestBody.companyName = formData.companyName;
        requestBody.taxCode = formData.taxCode;
        requestBody.address = formData.address;
        requestBody.representative = formData.representative;
      }

      // Add terms and privacy policy acceptance
      requestBody.termsAccepted = formData.termsAccepted;
      requestBody.privacyPolicyAccepted = formData.privacyPolicyAccepted;

      // Call Next.js API route which will proxy to backend
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": locale, // Send language header (vi or en)
          "X-Locale": locale, // Custom locale header
        },
        credentials: "include", // Include cookies
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Đăng ký thất bại. Vui lòng thử lại.");
        setIsLoading(false);
        return;
      }

      // Store in auth store
      const accessToken = data.data.accessToken || data.data.token;
      login(data.data.user, accessToken);

      // Redirect based on user type
      router.push(`/${locale}${getDashboardPathByUserType(data.data.user.userType)}`);
    } catch (err) {
      console.error("Register error:", err);
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


  const passwordStrength = () => {
    const { password } = formData;
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"];
  const strengthLabels = ["Yếu", "Trung bình", "Khá", "Mạnh"];

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
              onClick={() => { setUserType("USER"); setStep(1); }}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                userType === "USER"
                  ? "bg-white text-gray-900 shadow-md"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FaUser className="w-3.5 h-3.5" />
              <span>{t("userTab")}</span>
            </button>
            <button
              type="button"
              onClick={() => { setUserType("BUSINESS"); setStep(1); }}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                userType === "BUSINESS"
                  ? "bg-white text-gray-900 shadow-md"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FaBuilding className="w-3.5 h-3.5" />
              <span>{t("businessTab")}</span>
            </button>
          </div>

          {/* Progress Steps for Business */}
          {userType === "BUSINESS" && (
            <div className="flex items-center justify-center gap-3 mb-4">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                      step >= s
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step > s ? <FaCheck className="w-3 h-3" /> : s}
                  </div>
                  {s === 1 && (
                    <div className={`w-6 h-0.5 rounded ${step > 1 ? "bg-emerald-600" : "bg-gray-200"}`} />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Social Register - Only on step 1 */}
          {step === 1 && (
            <>
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

              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white/80 text-gray-500">hoặc</span>
                </div>
              </div>
            </>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-3"
                >
                  {/* Username - Only for USER type */}
                  {userType === "USER" && (
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Tên đăng nhập
                      </label>
                      <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                        <input
                          name="username"
                          type="text"
                          required
                          value={formData.username}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                          placeholder="username"
                          pattern="[a-zA-Z0-9_]+"
                          title="Chỉ được chứa chữ cái, số và dấu gạch dưới"
                        />
                      </div>
                    </div>
                  )}

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {userType === "BUSINESS" ? t("representative") : t("fullName")}
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        name={userType === "BUSINESS" ? "representative" : "fullName"}
                        type="text"
                        required
                        value={userType === "BUSINESS" ? formData.representative : formData.fullName}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                        placeholder="Nguyễn Văn A"
                      />
                    </div>
                  </div>

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
                        className="w-full pl-10 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                        placeholder="name@company.com"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {t("phone")}
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                        placeholder="0912 345 678"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {t("password")}
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-10 pr-10 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
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
                    {/* Password Strength */}
                    {formData.password && (
                      <div className="mt-1.5">
                        <div className="flex gap-1 mb-0.5">
                          {[0, 1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className={`h-0.5 flex-1 rounded-full transition-colors ${
                                i < passwordStrength()
                                  ? strengthColors[passwordStrength() - 1]
                                  : "bg-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-[10px] text-gray-500">
                          Độ mạnh: {strengthLabels[passwordStrength() - 1] || "Rất yếu"}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {t("confirmPassword")}
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-10 py-2 text-sm bg-gray-50 border rounded-lg focus:outline-none transition-all ${
                          formData.confirmPassword && formData.confirmPassword !== formData.password
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-emerald-500"
                        }`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                      </button>
                    </div>
                    {formData.confirmPassword && formData.confirmPassword !== formData.password && (
                      <p className="text-[10px] text-red-500 mt-0.5">Mật khẩu không khớp</p>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-3"
                >
                  {/* Company Name */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {t("companyName")}
                    </label>
                    <div className="relative">
                      <FaBuilding className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        name="companyName"
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                        placeholder="Công ty ABC"
                      />
                    </div>
                  </div>

                  {/* Tax Code */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {t("taxCode")}
                    </label>
                    <div className="relative">
                      <FaIdCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        name="taxCode"
                        type="text"
                        required
                        value={formData.taxCode}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                        placeholder="0123456789"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {t("address")}
                    </label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        name="address"
                        type="text"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                        placeholder="123 Đường ABC, Quận 1, TP.HCM"
                      />
                    </div>
                  </div>

                  {/* Back button */}
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    ← Quay lại bước trước
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Terms and Privacy Policy - only show on final step */}
            {(userType === "USER" || step === 2) && (
              <div className="space-y-2 pt-1">
                {/* Terms Checkbox */}
                <div className="flex items-start gap-2">
                  <input
                    id="termsAccepted"
                    name="termsAccepted"
                    type="checkbox"
                    required
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="w-3.5 h-3.5 mt-0.5 border border-gray-300 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <label htmlFor="termsAccepted" className="text-xs text-gray-600">
                    Tôi đồng ý với{" "}
                    <Link href={`/${locale}/terms`} className="text-emerald-600 hover:underline">
                      Điều khoản dịch vụ
                    </Link>
                  </label>
                </div>
                
                {/* Privacy Policy Checkbox */}
                <div className="flex items-start gap-2">
                  <input
                    id="privacyPolicyAccepted"
                    name="privacyPolicyAccepted"
                    type="checkbox"
                    required
                    checked={formData.privacyPolicyAccepted}
                    onChange={handleChange}
                    className="w-3.5 h-3.5 mt-0.5 border border-gray-300 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <label htmlFor="privacyPolicyAccepted" className="text-xs text-gray-600">
                    Tôi đồng ý với{" "}
                    <Link href={`/${locale}/privacy`} className="text-emerald-600 hover:underline">
                      Chính sách bảo mật
                    </Link>
                  </label>
                </div>
              </div>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-semibold rounded-lg shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {userType === "BUSINESS" && step === 1 ? "Tiếp tục" : t("submit")}
                  <FaArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </motion.button>
          </form>

          {/* Login link */}
          <p className="text-center mt-4 text-sm text-gray-600">
            {t("hasAccount")}{" "}
            <Link href={`/${locale}/auth/login`} className="font-semibold text-emerald-600 hover:text-emerald-700">
              {t("login")}
            </Link>
          </p>
        </div>

      </motion.div>
    </div>
  );
}
