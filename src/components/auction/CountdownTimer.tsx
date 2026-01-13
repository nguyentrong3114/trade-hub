"use client";

import { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";

interface CountdownTimerProps {
  endTime: string | Date;
  className?: string;
  variant?: "badge" | "card" | "large";
  showIcon?: boolean;
}

export default function CountdownTimer({
  endTime,
  className = "",
  variant = "badge",
  showIcon = true,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const end = typeof endTime === "string" ? new Date(endTime) : endTime;
      const now = new Date();
      const difference = end.getTime() - now.getTime();

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          expired: true,
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        expired: false,
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  if (timeLeft.expired) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {showIcon && <FaClock className="w-4 h-4" />}
        <span className="font-semibold text-red-600">Đã kết thúc</span>
      </div>
    );
  }

  if (variant === "badge") {
    return (
      <div className={`flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-red-600 to-orange-600 text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm ${className}`}>
        {showIcon && <FaClock className="w-3 h-3 animate-pulse" />}
        <div className="flex items-center gap-1">
          {timeLeft.days > 0 && (
            <>
              <span className="bg-white/20 px-1.5 py-0.5 rounded">{String(timeLeft.days).padStart(2, "0")}</span>
              <span className="text-[10px]">d</span>
            </>
          )}
          <span className="bg-white/20 px-1.5 py-0.5 rounded">{String(timeLeft.hours).padStart(2, "0")}</span>
          <span className="text-[10px]">h</span>
          <span className="opacity-50">:</span>
          <span className="bg-white/20 px-1.5 py-0.5 rounded">{String(timeLeft.minutes).padStart(2, "0")}</span>
          <span className="text-[10px]">m</span>
        </div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className={`flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-2xl shadow-2xl backdrop-blur-sm border-2 border-white/20 ${className}`}>
        {showIcon && <FaClock className="w-5 h-5 animate-pulse" />}
        <div className="flex items-center gap-2">
          {timeLeft.days > 0 && (
            <>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[50px] text-center">
                <div className="text-2xl font-bold">{String(timeLeft.days).padStart(2, "0")}</div>
                <div className="text-[10px] opacity-90">Ngày</div>
              </div>
              <span className="text-xl opacity-50">:</span>
            </>
          )}
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[50px] text-center">
            <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, "0")}</div>
            <div className="text-[10px] opacity-90">Giờ</div>
          </div>
          <span className="text-xl opacity-50">:</span>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[50px] text-center">
            <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, "0")}</div>
            <div className="text-[10px] opacity-90">Phút</div>
          </div>
          <span className="text-xl opacity-50">:</span>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[50px] text-center">
            <div className="text-2xl font-bold animate-pulse">{String(timeLeft.seconds).padStart(2, "0")}</div>
            <div className="text-[10px] opacity-90">Giây</div>
          </div>
        </div>
      </div>
    );
  }

  // Large variant
  return (
    <div className={`bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-xl ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        {showIcon && <FaClock className="w-6 h-6" />}
        <h3 className="text-lg font-bold">Thời gian còn lại</h3>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {timeLeft.days > 0 && (
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-3xl font-bold mb-1">{String(timeLeft.days).padStart(2, "0")}</div>
            <div className="text-xs opacity-90">Ngày</div>
          </div>
        )}
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
          <div className="text-3xl font-bold mb-1">{String(timeLeft.hours).padStart(2, "0")}</div>
          <div className="text-xs opacity-90">Giờ</div>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
          <div className="text-3xl font-bold mb-1">{String(timeLeft.minutes).padStart(2, "0")}</div>
          <div className="text-xs opacity-90">Phút</div>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
          <div className="text-3xl font-bold mb-1">{String(timeLeft.seconds).padStart(2, "0")}</div>
          <div className="text-xs opacity-90">Giây</div>
        </div>
      </div>
    </div>
  );
}

