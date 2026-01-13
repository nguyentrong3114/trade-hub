"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Card,
  Table,
  Button,
  Input,
  Tag,
  Space,
  Dropdown,
  Typography,
  Row,
  Col,
  Statistic,
  Select,
  Modal,
  message,
  Badge,
  Avatar,
  Tabs,
} from "antd";
import type { MenuProps, TableProps } from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  PrinterOutlined,
  MoreOutlined,
  ShoppingCartOutlined,
  ClockCircleOutlined,
  CarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExportOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

interface Order {
  key: string;
  id: string;
  customer: string;
  email: string;
  phone: string;
  items: number;
  total: number;
  status: "pending" | "confirmed" | "shipping" | "completed" | "cancelled";
  paymentStatus: "paid" | "unpaid" | "refunded";
  createdAt: string;
}

const mockOrders: Order[] = [
  { key: "1", id: "DH001", customer: "Nguyễn Văn A", email: "nguyenvana@gmail.com", phone: "0901234567", items: 2, total: 45980000, status: "pending", paymentStatus: "paid", createdAt: "2024-01-20 14:30" },
  { key: "2", id: "DH002", customer: "Trần Thị B", email: "tranthib@gmail.com", phone: "0912345678", items: 1, total: 34990000, status: "confirmed", paymentStatus: "paid", createdAt: "2024-01-20 10:15" },
  { key: "3", id: "DH003", customer: "Lê Văn C", email: "levanc@gmail.com", phone: "0923456789", items: 3, total: 12970000, status: "shipping", paymentStatus: "paid", createdAt: "2024-01-19 16:45" },
  { key: "4", id: "DH004", customer: "Phạm Thị D", email: "phamthid@gmail.com", phone: "0934567890", items: 1, total: 6990000, status: "completed", paymentStatus: "paid", createdAt: "2024-01-18 09:20" },
  { key: "5", id: "DH005", customer: "Hoàng Văn E", email: "hoangvane@gmail.com", phone: "0945678901", items: 2, total: 28980000, status: "cancelled", paymentStatus: "refunded", createdAt: "2024-01-17 11:00" },
];

export default function OrdersPage() {
  const params = useParams();
  const locale = params.locale as string;
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const getStatusTag = (status: string) => {
    const statusMap: Record<string, { color: string; text: string }> = {
      pending: { color: "orange", text: "Chờ xử lý" },
      confirmed: { color: "blue", text: "Đã xác nhận" },
      shipping: { color: "cyan", text: "Đang giao" },
      completed: { color: "green", text: "Hoàn thành" },
      cancelled: { color: "red", text: "Đã hủy" },
    };
    const { color, text } = statusMap[status] || { color: "default", text: status };
    return <Tag color={color}>{text}</Tag>;
  };

  const getPaymentTag = (status: string) => {
    const statusMap: Record<string, { color: string; text: string }> = {
      paid: { color: "green", text: "Đã thanh toán" },
      unpaid: { color: "red", text: "Chưa thanh toán" },
      refunded: { color: "orange", text: "Đã hoàn tiền" },
    };
    const { color, text } = statusMap[status] || { color: "default", text: status };
    return <Tag color={color}>{text}</Tag>;
  };

  const actionItems: MenuProps["items"] = [
    { key: "view", label: "Xem chi tiết", icon: <EyeOutlined /> },
    { key: "print", label: "In đơn hàng", icon: <PrinterOutlined /> },
    { type: "divider" },
    { key: "cancel", label: "Hủy đơn", danger: true, icon: <CloseCircleOutlined /> },
  ];

  const columns: TableProps<Order>["columns"] = [
    {
      title: "Mã đơn",
      dataIndex: "id",
      key: "id",
      render: (text) => <Text strong style={{ color: "#10b981" }}>{text}</Text>,
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
      render: (text, record) => (
        <div>
          <Text strong>{text}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>{record.phone}</Text>
        </div>
      ),
    },
    {
      title: "Sản phẩm",
      dataIndex: "items",
      key: "items",
      render: (items) => `${items} sản phẩm`,
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      sorter: (a, b) => a.total - b.total,
      render: (total) => (
        <Text strong>{total.toLocaleString("vi-VN")}đ</Text>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusTag(status),
    },
    {
      title: "Thanh toán",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status) => getPaymentTag(status),
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "",
      key: "action",
      width: 50,
      render: () => (
        <Dropdown menu={{ items: actionItems }} trigger={["click"]}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const getFilteredOrders = () => {
    let filtered = mockOrders;
    if (activeTab !== "all") {
      filtered = filtered.filter((order) => order.status === activeTab);
    }
    if (searchText) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchText.toLowerCase()) ||
          order.customer.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return filtered;
  };

  const tabItems = [
    { key: "all", label: <Badge count={mockOrders.length} size="small" offset={[10, 0]}>Tất cả</Badge> },
    { key: "pending", label: <Badge count={mockOrders.filter((o) => o.status === "pending").length} size="small" offset={[10, 0]} color="orange">Chờ xử lý</Badge> },
    { key: "confirmed", label: <Badge count={mockOrders.filter((o) => o.status === "confirmed").length} size="small" offset={[10, 0]} color="blue">Đã xác nhận</Badge> },
    { key: "shipping", label: <Badge count={mockOrders.filter((o) => o.status === "shipping").length} size="small" offset={[10, 0]} color="cyan">Đang giao</Badge> },
    { key: "completed", label: <Badge count={mockOrders.filter((o) => o.status === "completed").length} size="small" offset={[10, 0]} color="green">Hoàn thành</Badge> },
    { key: "cancelled", label: <Badge count={mockOrders.filter((o) => o.status === "cancelled").length} size="small" offset={[10, 0]} color="red">Đã hủy</Badge> },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <Title level={4} style={{ margin: 0 }}>Quản lý đơn hàng</Title>
          <Text type="secondary">Theo dõi và xử lý đơn hàng</Text>
        </div>
        <Button icon={<ExportOutlined />}>Xuất báo cáo</Button>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={12} sm={6}>
          <Card size="small">
            <Statistic
              title="Tổng đơn hàng"
              value={mockOrders.length}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small">
            <Statistic
              title="Chờ xử lý"
              value={mockOrders.filter((o) => o.status === "pending").length}
              valueStyle={{ color: "#f59e0b" }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small">
            <Statistic
              title="Đang giao"
              value={mockOrders.filter((o) => o.status === "shipping").length}
              valueStyle={{ color: "#06b6d4" }}
              prefix={<CarOutlined />}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small">
            <Statistic
              title="Hoàn thành"
              value={mockOrders.filter((o) => o.status === "completed").length}
              valueStyle={{ color: "#10b981" }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          style={{ marginBottom: 16 }}
        />

        <div style={{ marginBottom: 16 }}>
          <Input
            placeholder="Tìm kiếm đơn hàng..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <Table
          columns={columns}
          dataSource={getFilteredOrders()}
          pagination={{
            pageSize: 10,
            showTotal: (total) => `Tổng ${total} đơn hàng`,
          }}
        />
      </Card>
    </div>
  );
}

