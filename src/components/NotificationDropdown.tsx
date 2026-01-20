"use client";

import { useState, useEffect } from "react";
import { FaBell, FaCheck, FaTimes, FaTrash } from "react-icons/fa";
import Link from "next/link";

export interface Notification {
    id: number;
    type: "info" | "success" | "warning" | "error";
    title: string;
    message: string;
    time: string;
    read: boolean;
    link?: string;
}

interface NotificationDropdownProps {
    locale: string;
}

export default function NotificationDropdown({ locale }: NotificationDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: 1,
            type: "success",
            title: "Đơn hàng thành công",
            message: "Đơn hàng #12345 đã được xác nhận và đang được xử lý",
            time: "5 phút trước",
            read: false,
            link: `/${locale}/orders/12345`,
        },
        {
            id: 2,
            type: "info",
            title: "Cập nhật hệ thống",
            message: "Phiên bản mới 2.0 đã được phát hành với nhiều tính năng mới",
            time: "1 giờ trước",
            read: false,
        },
        {
            id: 3,
            type: "warning",
            title: "Thanh toán sắp hết hạn",
            message: "Hóa đơn #789 sẽ đến hạn thanh toán trong 2 ngày",
            time: "3 giờ trước",
            read: true,
            link: `/${locale}/invoices/789`,
        },
        {
            id: 4,
            type: "info",
            title: "Tin nhắn mới",
            message: "Bạn có 3 tin nhắn chưa đọc từ support team",
            time: "1 ngày trước",
            read: true,
            link: `/${locale}/messages`,
        },
    ]);

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen && isMobile) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen, isMobile]);

    const unreadCount = notifications.filter((n) => !n.read).length;

    const getTypeStyles = (type: Notification["type"]) => {
        switch (type) {
            case "success":
                return {
                    bg: "bg-green-100",
                    icon: "text-green-600",
                    border: "border-green-200",
                };
            case "warning":
                return {
                    bg: "bg-yellow-100",
                    icon: "text-yellow-600",
                    border: "border-yellow-200",
                };
            case "error":
                return {
                    bg: "bg-red-100",
                    icon: "text-red-600",
                    border: "border-red-200",
                };
            default:
                return {
                    bg: "bg-blue-100",
                    icon: "text-blue-600",
                    border: "border-blue-200",
                };
        }
    };

    const markAsRead = (id: number) => {
        setNotifications((prev) =>
            prev.map((notif) =>
                notif.id === id ? { ...notif, read: true } : notif
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications((prev) =>
            prev.map((notif) => ({ ...notif, read: true }))
        );
    };

    const deleteNotification = (id: number) => {
        setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    };

    const clearAll = () => {
        setNotifications([]);
    };

    return (
        <div className="relative">
            {/* Bell Icon Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
                aria-label="Notifications"
            >
                <FaBell className="w-5 h-5 text-blue-600" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold animate-pulse">
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown - Desktop & Tablet */}
            {isOpen && !isMobile && (
                <>
                    <div className="absolute left-auto right-0 top-full mt-2 w-80 sm:w-96 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-[600px] flex flex-col">
                        {/* Header */}
                        <div className="p-3 sm:p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-blue-100">
                            <div>
                                <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                                    Thông báo
                                </h3>
                                {unreadCount > 0 && (
                                    <p className="text-xs text-gray-600 mt-0.5">
                                        {unreadCount} thông báo chưa đọc
                                    </p>
                                )}
                            </div>
                            {notifications.length > 0 && (
                                <div className="flex items-center space-x-2">
                                    {unreadCount > 0 && (
                                        <button
                                            onClick={markAllAsRead}
                                            className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                                            title="Đánh dấu tất cả đã đọc"
                                        >
                                            <FaCheck className="w-4 h-4" />
                                        </button>
                                    )}
                                    <button
                                        onClick={clearAll}
                                        className="text-xs text-red-600 hover:text-red-700 font-medium transition-colors"
                                        title="Xóa tất cả"
                                    >
                                        <FaTrash className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Notifications List */}
                        <div className="overflow-y-auto flex-1">
                            {notifications.length === 0 ? (
                                <div className="p-8 sm:p-12 text-center text-gray-500">
                                    <FaBell className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-3 sm:mb-4 text-gray-300" />
                                    <p className="text-sm font-medium">Không có thông báo</p>
                                    <p className="text-xs mt-1">
                                        Bạn sẽ nhận được thông báo ở đây
                                    </p>
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-100">
                                    {notifications.map((notification) => {
                                        const styles = getTypeStyles(notification.type);
                                        const NotificationContent = (
                                            <div
                                                className={`p-3 sm:p-4 hover:bg-gray-50 transition-colors cursor-pointer relative ${!notification.read ? "bg-blue-50" : ""
                                                    }`}
                                                onClick={() => {
                                                    markAsRead(notification.id);
                                                    if (notification.link) {
                                                        setIsOpen(false);
                                                    }
                                                }}
                                            >
                                                <div className="flex items-start space-x-2 sm:space-x-3">
                                                    {/* Icon */}
                                                    <div
                                                        className={`${styles.bg} ${styles.icon} p-1.5 sm:p-2 rounded-full shrink-0`}
                                                    >
                                                        <FaBell className="w-3 sm:w-4 h-3 sm:h-4" />
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between">
                                                            <h4
                                                                className={`text-xs sm:text-sm font-semibold ${!notification.read
                                                                    ? "text-gray-900"
                                                                    : "text-gray-700"
                                                                    }`}
                                                            >
                                                                {notification.title}
                                                            </h4>
                                                            {!notification.read && (
                                                                <span className="w-2 h-2 bg-blue-600 rounded-full ml-2 shrink-0 mt-1"></span>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                                            {notification.message}
                                                        </p>
                                                        <p className="text-xs text-gray-400 mt-1 sm:mt-2">
                                                            {notification.time}
                                                        </p>
                                                    </div>

                                                    {/* Delete Button */}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            deleteNotification(notification.id);
                                                        }}
                                                        className="text-gray-400 hover:text-red-600 transition-colors shrink-0"
                                                        title="Xóa thông báo"
                                                    >
                                                        <FaTimes className="w-3 sm:w-4 h-3 sm:h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        );

                                        return notification.link ? (
                                            <Link
                                                key={notification.id}
                                                href={notification.link}
                                                className="block"
                                            >
                                                {NotificationContent}
                                            </Link>
                                        ) : (
                                            <div key={notification.id}>{NotificationContent}</div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {notifications.length > 0 && (
                            <div className="p-2 sm:p-3 border-t border-gray-200 bg-gray-50">
                                <Link
                                    href={`/${locale}/notifications`}
                                    onClick={() => setIsOpen(false)}
                                    className="block text-center text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                                >
                                    Xem tất cả thông báo →
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Overlay */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                </>
            )}

            {/* Mobile Full Screen Modal */}
            {isOpen && isMobile && (
                <div className="fixed inset-0 z-50 bg-white flex flex-col">
                    {/* Mobile Header */}
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-blue-100 sticky top-0 z-10">
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 text-lg">
                                Thông báo
                            </h3>
                            {unreadCount > 0 && (
                                <p className="text-xs text-gray-600 mt-0.5">
                                    {unreadCount} chưa đọc
                                </p>
                            )}
                        </div>
                        <div className="flex items-center space-x-3">
                            {notifications.length > 0 && unreadCount > 0 && (
                                <button
                                    onClick={markAllAsRead}
                                    className="text-blue-600 hover:text-blue-700 transition-colors"
                                    title="Đánh dấu tất cả đã đọc"
                                >
                                    <FaCheck className="w-5 h-5" />
                                </button>
                            )}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                <FaTimes className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Mobile Notifications List */}
                    <div className="flex-1 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-12 text-center text-gray-500">
                                <FaBell className="w-20 h-20 mx-auto mb-4 text-gray-300" />
                                <p className="text-base font-medium">Không có thông báo</p>
                                <p className="text-sm mt-2">
                                    Bạn sẽ nhận được thông báo ở đây
                                </p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {notifications.map((notification) => {
                                    const styles = getTypeStyles(notification.type);
                                    const NotificationContent = (
                                        <div
                                            className={`p-4 active:bg-gray-100 transition-colors ${!notification.read ? "bg-blue-50" : ""
                                                }`}
                                            onClick={() => {
                                                markAsRead(notification.id);
                                                if (notification.link) {
                                                    setIsOpen(false);
                                                }
                                            }}
                                        >
                                            <div className="flex items-start space-x-3">
                                                {/* Icon */}
                                                <div
                                                    className={`${styles.bg} ${styles.icon} p-2.5 rounded-full shrink-0`}
                                                >
                                                    <FaBell className="w-5 h-5" />
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <h4
                                                            className={`text-sm font-semibold pr-2 ${!notification.read
                                                                ? "text-gray-900"
                                                                : "text-gray-700"
                                                                }`}
                                                        >
                                                            {notification.title}
                                                        </h4>
                                                        {!notification.read && (
                                                            <span className="w-2.5 h-2.5 bg-blue-600 rounded-full shrink-0 mt-1"></span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-2">
                                                        {notification.message}
                                                    </p>
                                                    <p className="text-xs text-gray-400">
                                                        {notification.time}
                                                    </p>
                                                </div>

                                                {/* Delete Button */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteNotification(notification.id);
                                                    }}
                                                    className="text-gray-400 hover:text-red-600 active:text-red-700 transition-colors shrink-0 p-2"
                                                    title="Xóa"
                                                >
                                                    <FaTimes className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    );

                                    return notification.link ? (
                                        <Link
                                            key={notification.id}
                                            href={notification.link}
                                            className="block"
                                        >
                                            {NotificationContent}
                                        </Link>
                                    ) : (
                                        <div key={notification.id}>{NotificationContent}</div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Mobile Footer */}
                    {notifications.length > 0 && (
                        <div className="p-4 border-t border-gray-200 bg-gray-50 sticky bottom-0">
                            <div className="flex space-x-3">
                                <Link
                                    href={`/${locale}/notifications`}
                                    onClick={() => setIsOpen(false)}
                                    className="flex-1 text-center py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors"
                                >
                                    Xem tất cả
                                </Link>
                                {notifications.length > 0 && (
                                    <button
                                        onClick={clearAll}
                                        className="py-3 px-4 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 active:bg-red-200 transition-colors"
                                    >
                                        <FaTrash className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
