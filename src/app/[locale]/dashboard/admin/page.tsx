"use client";

import { useState } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Tag,
  Space,
  Button,
  Input,
  Avatar,
  Progress,
  Typography,
  Tabs,
  List,
  Timeline,
} from "antd";
import {
  UserOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { Title, Text } = Typography;

// Types
interface UserData {
  key: string;
  id: number;
  name: string;
  email: string;
  type: "user" | "company";
  status: "active" | "pending" | "banned";
  createdAt: string;
}

interface ActivityItem {
  action: string;
  user: string;
  time: string;
  type: "success" | "warning" | "info" | "error";
}

// Mock data
const usersData: UserData[] = [
  { key: "1", id: 1, name: "Nguyễn Văn A", email: "nguyenvana@email.com", type: "user", status: "active", createdAt: "2024-01-15" },
  { key: "2", id: 2, name: "TechCorp Ltd", email: "contact@techcorp.com", type: "company", status: "pending", createdAt: "2024-01-14" },
  { key: "3", id: 3, name: "Trần Thị B", email: "tranthib@email.com", type: "user", status: "active", createdAt: "2024-01-14" },
  { key: "4", id: 4, name: "GlobalTrade Inc", email: "info@globaltrade.com", type: "company", status: "active", createdAt: "2024-01-13" },
  { key: "5", id: 5, name: "Lê Văn C", email: "levanc@email.com", type: "user", status: "banned", createdAt: "2024-01-12" },
];

const activities: ActivityItem[] = [
  { action: "Người dùng mới đăng ký", user: "Nguyễn Văn A", time: "5 phút trước", type: "success" },
  { action: "Giao dịch hoàn thành", user: "TechCorp Ltd", time: "15 phút trước", type: "info" },
  { action: "Company được phê duyệt", user: "GlobalTrade", time: "1 giờ trước", type: "success" },
  { action: "Báo cáo vi phạm", user: "Anonymous", time: "2 giờ trước", type: "warning" },
  { action: "Cập nhật hệ thống", user: "System", time: "3 giờ trước", type: "info" },
];

export default function AdminDashboard() {
  const [searchText, setSearchText] = useState("");

  const columns: ColumnsType<UserData> = [
    {
      title: "Người dùng",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <Avatar style={{ backgroundColor: record.type === "company" ? "#10b981" : "#3b82f6" }}>
            {text.charAt(0)}
          </Avatar>
          <div>
            <Text strong>{text}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>{record.email}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Tag color={type === "company" ? "green" : "blue"}>
          {type === "company" ? "Company" : "User"}
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const config = {
          active: { color: "success", icon: <CheckCircleOutlined />, text: "Hoạt động" },
          pending: { color: "warning", icon: <ClockCircleOutlined />, text: "Chờ duyệt" },
          banned: { color: "error", icon: <DeleteOutlined />, text: "Bị cấm" },
        };
        const { color, icon, text } = config[status as keyof typeof config];
        return <Tag color={color} icon={icon}>{text}</Tag>;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Hành động",
      key: "action",
      render: () => (
        <Space>
          <Button type="text" icon={<EyeOutlined />} />
          <Button type="text" icon={<EditOutlined />} />
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Welcome Banner */}
      <Card
        style={{
          marginBottom: 24,
          background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
          border: "none",
        }}
      >
        <Row align="middle" justify="space-between">
          <Col>
            <Title level={3} style={{ color: "#fff", margin: 0 }}>
              Chào mừng trở lại, Admin! 👋
            </Title>
            <Text style={{ color: "rgba(255,255,255,0.85)" }}>
              Đây là tổng quan hoạt động hệ thống hôm nay.
            </Text>
          </Col>
          <Col>
            <Button type="primary" ghost icon={<PlusOutlined />}>
              Tạo báo cáo
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Statistics */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="Tổng người dùng"
              value={12845}
              prefix={<UserOutlined style={{ color: "#3b82f6" }} />}
              suffix={
                <Text type="success" style={{ fontSize: 14 }}>
                  <ArrowUpOutlined /> 12.5%
                </Text>
              }
            />
            <Progress percent={75} showInfo={false} strokeColor="#3b82f6" size="small" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="Company đăng ký"
              value={1234}
              prefix={<ShopOutlined style={{ color: "#10b981" }} />}
              suffix={
                <Text type="success" style={{ fontSize: 14 }}>
                  <ArrowUpOutlined /> 8.2%
                </Text>
              }
            />
            <Progress percent={60} showInfo={false} strokeColor="#10b981" size="small" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="Giao dịch"
              value={45678}
              prefix={<ShoppingCartOutlined style={{ color: "#8b5cf6" }} />}
              suffix={
                <Text type="success" style={{ fontSize: 14 }}>
                  <ArrowUpOutlined /> 23.1%
                </Text>
              }
            />
            <Progress percent={85} showInfo={false} strokeColor="#8b5cf6" size="small" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="Doanh thu"
              value={1200000}
              prefix={<DollarOutlined style={{ color: "#f59e0b" }} />}
              suffix={
                <Text type="danger" style={{ fontSize: 14 }}>
                  <ArrowDownOutlined /> 2.4%
                </Text>
              }
            />
            <Progress percent={45} showInfo={false} strokeColor="#f59e0b" size="small" />
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Row gutter={[16, 16]}>
        {/* Users Table */}
        <Col xs={24} lg={16}>
          <Card
            title="Người dùng gần đây"
            extra={
              <Space>
                <Input
                  placeholder="Tìm kiếm..."
                  prefix={<SearchOutlined />}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ width: 200 }}
                />
                <Button type="primary" icon={<PlusOutlined />}>
                  Thêm mới
                </Button>
              </Space>
            }
          >
            <Table
              columns={columns}
              dataSource={usersData}
              pagination={{ pageSize: 5, showSizeChanger: false }}
              size="middle"
            />
          </Card>
        </Col>

        {/* Activity & Quick Stats */}
        <Col xs={24} lg={8}>
          <Card title="Hoạt động gần đây" style={{ marginBottom: 16 }}>
            <Timeline
              items={activities.map((item) => ({
                color: item.type === "success" ? "green" : item.type === "warning" ? "orange" : item.type === "error" ? "red" : "blue",
                children: (
                  <div>
                    <Text strong>{item.action}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {item.user} • {item.time}
                    </Text>
                  </div>
                ),
              }))}
            />
          </Card>

          <Card title="Trạng thái hệ thống">
            <List
              size="small"
              dataSource={[
                { label: "Server Status", value: "Online", status: "success" },
                { label: "Database", value: "Connected", status: "success" },
                { label: "Cache", value: "Active", status: "success" },
                { label: "Queue Jobs", value: "12 pending", status: "warning" },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <Text>{item.label}</Text>
                  <Tag color={item.status}>{item.value}</Tag>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
