"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaArrowRight,
    FaArrowLeft,
    FaCheck,
    FaKey,
} from "react-icons/fa";

type Step = "email" | "otp" | "reset";

export default function ForgotPasswordPage() {
    const t = useTranslations("auth.forgotPassword");
    const params = useParams();
    const router = useRouter();
    const locale = params.locale as string;

    const [step, setStep] = useState<Step>("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [countdown, setCountdown] = useState(0);

    // Handle email submission
    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
            const response = await fetch(`${backendUrl}/api/auth/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept-Language": locale,
                    "X-Locale": locale,
                },
                credentials: "include",
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                setError(data.message || "Không thể gửi mã OTP. Vui lòng thử lại.");
                setIsLoading(false);
                return;
            }

            // Success - move to OTP step
            setStep("otp");
            setCountdown(60);
            startCountdown();
        } catch (err) {
            console.error("Forgot password error:", err);
            setError("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle OTP submission
    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        const otpCode = otp.join("");
        if (otpCode.length !== 6) {
            setError("Vui lòng nhập đầy đủ mã OTP");
            setIsLoading(false);
            return;
        }

        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
            const response = await fetch(`${backendUrl}/api/auth/verify-reset-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept-Language": locale,
                    "X-Locale": locale,
                },
                credentials: "include",
                body: JSON.stringify({ email, otp: otpCode }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                setError(data.message || "Mã OTP không hợp lệ hoặc đã hết hạn.");
                setIsLoading(false);
                return;
            }

            // Success - move to reset password step
            setStep("reset");
        } catch (err) {
            console.error("OTP verification error:", err);
            setError("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle password reset
    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (newPassword !== confirmPassword) {
            setError("Mật khẩu xác nhận không khớp");
            return;
        }

        if (newPassword.length < 8) {
            setError("Mật khẩu phải có ít nhất 8 ký tự");
            return;
        }

        setIsLoading(true);

        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
            const response = await fetch(`${backendUrl}/api/auth/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept-Language": locale,
                    "X-Locale": locale,
                },
                credentials: "include",
                body: JSON.stringify({
                    email,
                    otp: otp.join(""),
                    newPassword
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                setError(data.message || "Không thể đặt lại mật khẩu. Vui lòng thử lại.");
                setIsLoading(false);
                return;
            }

            // Success - redirect to login
            router.push(`/${locale}/auth/login?reset=success`);
        } catch (err) {
            console.error("Password reset error:", err);
            setError("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle OTP input
    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return; // Only allow digits

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Only take last character
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    // Handle OTP paste
    const handleOtpPaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = [...otp];
        pastedData.split("").forEach((char, index) => {
            if (index < 6) newOtp[index] = char;
        });
        setOtp(newOtp);
    };

    // Handle OTP backspace
    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    // Resend OTP
    const handleResendOtp = async () => {
        if (countdown > 0) return;

        setError("");
        setIsLoading(true);

        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
            const response = await fetch(`${backendUrl}/api/auth/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept-Language": locale,
                    "X-Locale": locale,
                },
                credentials: "include",
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                setError(data.message || "Không thể gửi lại mã OTP.");
                setIsLoading(false);
                return;
            }

            setCountdown(60);
            startCountdown();
            setOtp(["", "", "", "", "", ""]);
        } catch (err) {
            console.error("Resend OTP error:", err);
            setError("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
        } finally {
            setIsLoading(false);
        }
    };

    // Countdown timer
    const startCountdown = () => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // Password strength
    const passwordStrength = () => {
        if (!newPassword) return 0;
        let strength = 0;
        if (newPassword.length >= 8) strength++;
        if (/[A-Z]/.test(newPassword)) strength++;
        if (/[0-9]/.test(newPassword)) strength++;
        if (/[^A-Za-z0-9]/.test(newPassword)) strength++;
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
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-blue-900/50" />

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-md"
            >
                {/* Card */}
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-8">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl mb-4">
                            <FaKey className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {step === "email" && "Quên mật khẩu"}
                            {step === "otp" && "Xác thực OTP"}
                            {step === "reset" && "Đặt mật khẩu mới"}
                        </h2>
                        <p className="text-sm text-gray-600 mt-2">
                            {step === "email" && "Nhập email để nhận mã xác thực"}
                            {step === "otp" && `Mã OTP đã được gửi đến ${email}`}
                            {step === "reset" && "Tạo mật khẩu mới cho tài khoản của bạn"}
                        </p>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                        {["email", "otp", "reset"].map((s, idx) => (
                            <div key={s} className="flex items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${step === s
                                            ? "bg-blue-500 text-white ring-4 ring-blue-100"
                                            : ["email", "otp", "reset"].indexOf(step) > idx
                                                ? "bg-green-500 text-white"
                                                : "bg-gray-200 text-gray-500"
                                        }`}
                                >
                                    {["email", "otp", "reset"].indexOf(step) > idx ? (
                                        <FaCheck className="w-4 h-4" />
                                    ) : (
                                        idx + 1
                                    )}
                                </div>
                                {idx < 2 && (
                                    <div
                                        className={`w-12 h-1 mx-1 rounded-full transition-all ${["email", "otp", "reset"].indexOf(step) > idx
                                                ? "bg-green-500"
                                                : "bg-gray-200"
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
                            {error}
                        </div>
                    )}

                    {/* Forms */}
                    <AnimatePresence mode="wait">
                        {/* Step 1: Email */}
                        {step === "email" && (
                            <motion.form
                                key="email"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                onSubmit={handleEmailSubmit}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                                            placeholder="name@company.com"
                                        />
                                    </div>
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isLoading}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Gửi mã OTP
                                            <FaArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </motion.button>
                            </motion.form>
                        )}

                        {/* Step 2: OTP */}
                        {step === "otp" && (
                            <motion.form
                                key="otp"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                onSubmit={handleOtpSubmit}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                                        Nhập mã OTP
                                    </label>
                                    <div className="flex gap-2 justify-center">
                                        {otp.map((digit, index) => (
                                            <input
                                                key={index}
                                                id={`otp-${index}`}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                                onPaste={index === 0 ? handleOtpPaste : undefined}
                                                className="w-12 h-12 text-center text-lg font-bold bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Resend OTP */}
                                <div className="text-center">
                                    {countdown > 0 ? (
                                        <p className="text-sm text-gray-600">
                                            Gửi lại mã sau <span className="font-semibold text-blue-600">{countdown}s</span>
                                        </p>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleResendOtp}
                                            disabled={isLoading}
                                            className="text-sm text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
                                        >
                                            Gửi lại mã OTP
                                        </button>
                                    )}
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setStep("email")}
                                        className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                                    >
                                        <FaArrowLeft className="w-4 h-4" />
                                        Quay lại
                                    </button>
                                    <motion.button
                                        type="submit"
                                        disabled={isLoading || otp.join("").length !== 6}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        className="flex-1 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                Xác thực
                                                <FaArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </motion.button>
                                </div>
                            </motion.form>
                        )}

                        {/* Step 3: Reset Password */}
                        {step === "reset" && (
                            <motion.form
                                key="reset"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                onSubmit={handlePasswordReset}
                                className="space-y-4"
                            >
                                {/* New Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mật khẩu mới
                                    </label>
                                    <div className="relative">
                                        <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                    {/* Password Strength */}
                                    {newPassword && (
                                        <div className="mt-2">
                                            <div className="flex gap-1 mb-1">
                                                {[0, 1, 2, 3].map((i) => (
                                                    <div
                                                        key={i}
                                                        className={`h-1 flex-1 rounded-full transition-colors ${i < passwordStrength()
                                                                ? strengthColors[passwordStrength() - 1]
                                                                : "bg-gray-200"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                Độ mạnh: {strengthLabels[passwordStrength() - 1] || "Rất yếu"}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Xác nhận mật khẩu
                                    </label>
                                    <div className="relative">
                                        <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className={`w-full pl-10 pr-10 py-3 bg-gray-50 border rounded-lg focus:outline-none transition-all ${confirmPassword && confirmPassword !== newPassword
                                                    ? "border-red-300 focus:border-red-500"
                                                    : "border-gray-200 focus:border-blue-500"
                                                }`}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                    {confirmPassword && confirmPassword !== newPassword && (
                                        <p className="text-xs text-red-500 mt-1">Mật khẩu không khớp</p>
                                    )}
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isLoading || newPassword !== confirmPassword}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Đặt lại mật khẩu
                                            <FaCheck className="w-4 h-4" />
                                        </>
                                    )}
                                </motion.button>
                            </motion.form>
                        )}
                    </AnimatePresence>

                    {/* Back to Login */}
                    <div className="text-center mt-6">
                        <Link
                            href={`/${locale}/auth/login`}
                            className="text-sm text-gray-600 hover:text-gray-900 flex items-center justify-center gap-2"
                        >
                            <FaArrowLeft className="w-3 h-3" />
                            Quay lại đăng nhập
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
