"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { FaEnvelope, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

export default function ComingSoon() {
  const t = useTranslations("Home.comingSoon");
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    days: 200,
    hours: 17,
    minutes: 47,
    seconds: 51,
  });

  // Countdown timer logic
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 200);
    targetDate.setHours(targetDate.getHours() + 17);
    targetDate.setMinutes(targetDate.getMinutes() + 47);
    targetDate.setSeconds(targetDate.getSeconds() + 51);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission here
    console.log("Email submitted:", email);
    setEmail("");
    // You can add toast notification or API call here
  };

  return (
    <section className="relative h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-4 overflow-hidden">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Border glow effect */}
      <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl w-full text-center">
        {/* Logo placeholder */}
        <div className="mb-4 flex flex-col items-center">
          <div className="w-12 h-12 border-2 border-white rounded-lg flex items-center justify-center mb-2">
            <div className="w-6 h-6 border border-white rounded" />
          </div>
          <div className="w-20 h-0.5 bg-blue-500" />
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          {t("heading1")}
          <br />
          {t("heading2")}
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base max-w-xl mx-auto mb-6 leading-relaxed">
          {t("subtitle")}
        </p>

        {/* Countdown Timer and Email Form Container */}
        <div className=" backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-6 mb-6">
          {/* Countdown Timer */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[
              { value: timeLeft.days, label: t("days") },
              { value: timeLeft.hours, label: t("hours") },
              { value: timeLeft.minutes, label: t("minutes") },
              { value: timeLeft.seconds, label: t("seconds") },
            ].map((item, index) => (
              <div key={index} className="relative">
                {index > 0 && (
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-white/20" />
                )}
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1">
                    {item.value}
                  </div>
                  <div className="text-xs uppercase tracking-wide">
                    {item.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Email Signup Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("emailPlaceholder")}
              required
              className="flex-1 px-3 py-2 text-sm  border-2  rounded-lg placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 font-semibold rounded-lg border border-blue-500/50 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all duration-200 whitespace-nowrap text-sm"
            >
              <FaEnvelope className="w-3.5 h-3.5" />
              {t("ctaButton")}
            </button>
          </form>
        </div>

        {/* Social Proof */}
        <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
          <div className="flex items-center gap-1.5 -space-x-2">
            {[
              { bg: "bg-teal-400" },
              { bg: "bg-pink-400" },
              { bg: "bg-purple-400" },
              { bg: "bg-yellow-400" },
            ].map((avatar, index) => (
              <div
                key={index}
                className={`w-8 h-8 ${avatar.bg} rounded-full border-2 border-black flex items-center justify-center text-black font-bold text-xs`}
              >
                {String.fromCharCode(65 + index)}
              </div>
            ))}
          </div>
          <p className="text-xs sm:text-sm">
            {t("socialProof")}
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://x.com/tradehub"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center hover:text-blue-500 transition-colors"
            aria-label="Twitter"
          >
            <FaTwitter className="w-4 h-4" />
          </a>
          <a
            href="https://www.instagram.com/tradehub"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center hover:text-blue-500 transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram className="w-4 h-4" />
          </a>
          <a
            href="https://www.facebook.com/tradehub"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center hover:text-blue-500 transition-colors"
            aria-label="Facebook"
          >
            <FaFacebook className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

