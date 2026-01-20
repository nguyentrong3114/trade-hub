"use client";

import { useState } from "react";
import {
    Card,
    Typography,
    Tabs,
    Button,
    Empty,
    Badge,
    Space,
    Dropdown,
} from "antd";
import {
    BellOutlined,
    CheckOutlined,
    DeleteOutlined,
    FilterOutlined,
    MoreOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

const { Title, Text, Paragraph } = Typography;

interface Notification {
    id: number;
    type: "info" | "success" | "warning" | "error";
    title: string;
    message: string;
    time: string;
    read: boolean;
    link?: string;
}

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: 1,
            type: "success",
            title: "Đơn hàng thành công",
            message: "Đơn hàng #12345 đã được xác nhận và đang được xử lý. Bạn có thể theo dõi trạng thái đơn hàng trong mục Đơn hàng của tôi.",
            time: "5 phút trước",
            read: false,
        },
        {
            id: 2,
            type: "info",
            title: "Cập nhật hệ thống",
            message: "Phiên bản mới 2.0 đã được phát hành với nhiều tính năng mới bao gồm: Dashboard cải tiến, Báo cáo chi tiết hơn, và Tích hợp thanh toán mới.",
            time: "1 giờ trước",
            read: false,
        },
        {
            id: 3,
            type: "warning",
            title: "Thanh toán sắp hết hạn",
            message: "Hóa đơn #789 với số tiền 1,500,000 VNĐ sẽ đến hạn thanh toán trong 2 ngày. Vui lòng thanh toán để tránh bị gián đoạn dịch vụ.",
            time: "3 giờ trước",
            read: true,
        },
        {
            id: 4,
            type: "info",
            title: "Tin nhắn mới",
            message: "Bạn có 3 tin nhắn chưa đọc từ support team về yêu cầu hỗ trợ #456. Vui lòng kiểm tra hộp thư để xem chi tiết.",
            time: "1 ngày trước",
            read: true,
        },
        {
            id: 5,
            type: "error",
            title: "Thanh toán thất bại",
            message: "Giao dịch thanh toán cho đơn hàng #678 đã thất bại. Vui lòng kiểm tra thông tin thẻ và thử lại.",
            time: "2 ngày trước",
            read: true,
        },
    ]);

    const [activeTab, setActiveTab] = useState("all");

    const getTypeColor = (type: Notification["type"]) => {
        switch (type) {
            case "success":
                return "green";
            case "warning":
                return "orange";
            case "error":
                return "red";
            default:
                return "blue";
        }
    };

    const getTypeIcon = (type: Notification["type"]) => {
        switch (type) {
            case "success":
                return "✓";
            case "warning":
                return "⚠";
            case "error":
                return "✕";
            default:
                return "ℹ";
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

    const getFilteredNotifications = () => {
        switch (activeTab) {
            case "unread":
                return notifications.filter((n) => !n.read);
            case "read":
                return notifications.filter((n) => n.read);
            default:
                return notifications;
        }
    };

    const filteredNotifications = getFilteredNotifications();
    const unreadCount = notifications.filter((n) => !n.read).length;

    const items: MenuProps["items"] = [
        {
            key: "markAllRead",
            label: "Đánh dấu tất cả đã đọc",
            icon: <CheckOutlined />,
            onClick: markAllAsRead,
            disabled: unreadCount === 0,
        },
        {
            key: "clearAll",
            label: "Xóa tất cả",
            icon: <DeleteOutlined />,
            onClick: clearAll,
            danger: true,
            disabled: notifications.length === 0,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <Title level={2} style={{ margin: 0 }}>
                            <BellOutlined className="mr-2" />
                            Thông báo
                        </Title>
                        {unreadCount > 0 && (
                            <Text type="secondary">
                                Bạn có {unreadCount} thông báo chưa đọc
                            </Text>
                        )}
                    </div>
                    <Dropdown menu={{ items }} placement="bottomRight">
                        <Button icon={<MoreOutlined />}>Tùy chọn</Button>
                    </Dropdown>
                </div>

                <Card>
                    <Tabs
                        activeKey={activeTab}
                        onChange={setActiveTab}
                        items={[
                            {
                                key: "all",
                                label: (
                                    <span>
                                        Tất cả
                                        <Badge
                                            count={notifications.length}
                                            style={{ marginLeft: 8 }}
                                        />
                                    </span>
                                ),
                            },
                            {
                                key: "unread",
                                label: (
                                    <span>
                                        Chưa đọc
                                        <Badge count={unreadCount} style={{ marginLeft: 8 }} />
                                    </span>
                                ),
                            },
                            {
                                key: "read",
                                label: (
                                    <span>
                                        Đã đọc
                                        <Badge
                                            count={notifications.filter((n) => n.read).length}
                                            style={{ marginLeft: 8 }}
                                            color="gray"
                                        />
                                    </span>
                                ),
                            },
                        ]}
                    />

                    <div className="mt-4">
                        {filteredNotifications.length === 0 ? (
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description={
                                    activeTab === "unread"
                                        ? "Không có thông báo chưa đọc"
                                        : activeTab === "read"
                                            ? "Không có thông báo đã đọc"
                                            : "Không có thông báo"
                                }
                            />
                        ) : (
                            <div className="space-y-3">
                                {filteredNotifications.map((notification) => (
                                    <Card
                                        key={notification.id}
                                        className={`${!notification.read
                                                ? "border-l-4 border-l-blue-500 bg-blue-50"
                                                : ""
                                            } hover:shadow-md transition-shadow`}
                                        bodyStyle={{ padding: "16px" }}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start space-x-3 flex-1">
                                                <div
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0`}
                                                    style={{
                                                        backgroundColor:
                                                            getTypeColor(notification.type) === "green"
                                                                ? "#52c41a"
                                                                : getTypeColor(notification.type) === "orange"
                                                                    ? "#fa8c16"
                                                                    : getTypeColor(notification.type) === "red"
                                                                        ? "#ff4d4f"
                                                                        : "#1890ff",
                                                    }}
                                                >
                                                    {getTypeIcon(notification.type)}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-2">
                                                        <Title
                                                            level={5}
                                                            style={{ margin: 0 }}
                                                            className={!notification.read ? "font-bold" : ""}
                                                        >
                                                            {notification.title}
                                                        </Title>
                                                        {!notification.read && (
                                                            <Badge status="processing" />
                                                        )}
                                                    </div>
                                                    <Paragraph
                                                        style={{ margin: "8px 0 0 0" }}
                                                        type="secondary"
                                                    >
                                                        {notification.message}
                                                    </Paragraph>
                                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                                        {notification.time}
                                                    </Text>
                                                </div>
                                            </div>
                                            <Space>
                                                {!notification.read && (
                                                    <Button
                                                        type="text"
                                                        size="small"
                                                        icon={<CheckOutlined />}
                                                        onClick={() => markAsRead(notification.id)}
                                                        title="Đánh dấu đã đọc"
                                                    />
                                                )}
                                                <Button
                                                    type="text"
                                                    size="small"
                                                    danger
                                                    icon={<DeleteOutlined />}
                                                    onClick={() => deleteNotification(notification.id)}
                                                    title="Xóa"
                                                />
                                            </Space>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}
