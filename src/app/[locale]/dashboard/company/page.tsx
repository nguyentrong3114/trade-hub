"use client";

import {
  Card,
  Row,
  Col,
  Statistic,
  Avatar,
  Button,
  Tag,
  Table,
  Space,
  Typography,
  Progress,
  List,
  Image,
  Divider,
  Alert,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  AppstoreOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  TeamOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  EditOutlined,
  EyeOutlined,
  CameraOutlined,
  GlobalOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  StarFilled,
  RightOutlined,
  SafetyCertificateOutlined,
  CrownOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

// Types
interface OrderData {
  key: string;
  id: string;
  customer: string;
  amount: string;
  status: "completed" | "processing" | "pending";
  date: string;
}

interface ProductData {
  id: number;
  name: string;
  sales: number;
  revenue: string;
  rating: number;
}

// Mock data
const ordersData: OrderData[] = [
  { key: "1", id: "ORD-2024-001", customer: "Nguyễn Văn A", amount: "$1,299", status: "completed", date: "15/01/2024" },
  { key: "2", id: "ORD-2024-002", customer: "Trần Thị B", amount: "$549", status: "processing", date: "15/01/2024" },
  { key: "3", id: "ORD-2024-003", customer: "Lê Văn C", amount: "$2,199", status: "pending", date: "14/01/2024" },
  { key: "4", id: "ORD-2024-004", customer: "Phạm Thị D", amount: "$799", status: "completed", date: "14/01/2024" },
];

const topProducts: ProductData[] = [
  { id: 1, name: "Laptop Gaming Pro", sales: 234, revenue: "$46,800", rating: 4.8 },
  { id: 2, name: "Wireless Headphones", sales: 189, revenue: "$18,900", rating: 4.6 },
  { id: 3, name: "Smart Watch X", sales: 156, revenue: "$31,200", rating: 4.9 },
  { id: 4, name: "Mechanical Keyboard", sales: 134, revenue: "$13,400", rating: 4.5 },
];

export default function CompanyDashboard() {
  const getStatusTag = (status: string) => {
    const config = {
      completed: { color: "success", icon: <CheckCircleOutlined />, text: "Hoàn thành" },
      processing: { color: "processing", icon: <ClockCircleOutlined />, text: "Đang xử lý" },
      pending: { color: "warning", icon: <ExclamationCircleOutlined />, text: "Chờ xác nhận" },
    };
    const { color, icon, text } = config[status as keyof typeof config];
    return <Tag color={color} icon={icon}>{text}</Tag>;
  };

  const orderColumns: ColumnsType<OrderData> = [
    { title: "Mã đơn", dataIndex: "id", key: "id" },
    { title: "Khách hàng", dataIndex: "customer", key: "customer" },
    { title: "Giá trị", dataIndex: "amount", key: "amount", render: (text) => <Text strong>{text}</Text> },
    { title: "Trạng thái", dataIndex: "status", key: "status", render: (status) => getStatusTag(status) },
    { title: "Ngày", dataIndex: "date", key: "date" },
  ];

  return (
    <div>
      {/* Company Profile Header */}
      <Card
        style={{ marginBottom: 24 }}
        cover={
          <div
            style={{
              height: 140,
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              position: "relative",
            }}
          >
            <Button
              icon={<CameraOutlined />}
              style={{ position: "absolute", bottom: 16, right: 16 }}
              ghost
            >
              Đổi ảnh bìa
            </Button>
          </div>
        }
      >
        <div style={{ marginTop: -70, display: "flex", alignItems: "flex-end", gap: 20, flexWrap: "wrap" }}>
          <div style={{ position: "relative" }}>
            <Avatar
              size={120}
              style={{
                backgroundColor: "#10b981",
                border: "4px solid #fff",
                fontSize: 48,
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
            >
              TC
            </Avatar>
            <Button
              type="primary"
              shape="circle"
              size="small"
              icon={<CameraOutlined />}
              style={{ position: "absolute", bottom: 4, right: 4 }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <Space align="center" wrap style={{ marginBottom: 4 }}>
              <Title level={4} style={{ margin: 0 }}>TechCorp Solutions</Title>
              <Tag color="success" icon={<CheckCircleOutlined />}>Đã xác thực</Tag>
              <Tag color="gold" icon={<CrownOutlined />}>Platinum Partner</Tag>
            </Space>
            <Text type="secondary" style={{ display: "block", marginBottom: 8 }}>
              Công nghệ dẫn đầu, Giải pháp toàn diện
            </Text>
            <Space wrap>
              <Text type="secondary"><GlobalOutlined /> techcorp.com</Text>
              <Text type="secondary"><PhoneOutlined /> +84 28 1234 5678</Text>
              <Text type="secondary"><EnvironmentOutlined /> Hồ Chí Minh</Text>
            </Space>
          </div>
          <Space>
            <Button icon={<EyeOutlined />}>Xem trang</Button>
            <Button type="primary" icon={<EditOutlined />}>Chỉnh sửa</Button>
          </Space>
        </div>
      </Card>

      {/* Stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={12} sm={6}>
          <Card hoverable>
            <Statistic
              title="Sản phẩm"
              value={156}
              prefix={<AppstoreOutlined style={{ color: "#10b981" }} />}
              suffix={<Text type="success" style={{ fontSize: 14 }}><ArrowUpOutlined /> +12</Text>}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card hoverable>
            <Statistic
              title="Đơn hàng"
              value={1234}
              prefix={<ShoppingCartOutlined style={{ color: "#3b82f6" }} />}
              suffix={<Text type="success" style={{ fontSize: 14 }}><ArrowUpOutlined /> 23%</Text>}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card hoverable>
            <Statistic
              title="Doanh thu"
              value={45200}
              prefix={<DollarOutlined style={{ color: "#8b5cf6" }} />}
              precision={0}
              suffix={<Text type="success" style={{ fontSize: 14 }}><ArrowUpOutlined /> 18%</Text>}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card hoverable>
            <Statistic
              title="Khách hàng"
              value={892}
              prefix={<TeamOutlined style={{ color: "#f59e0b" }} />}
              suffix={<Text type="danger" style={{ fontSize: 14 }}><ArrowDownOutlined /> 2%</Text>}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Row gutter={[16, 16]}>
        {/* Orders Table */}
        <Col xs={24} lg={16}>
          <Card
            title="Đơn hàng gần đây"
            extra={<Button type="link" icon={<RightOutlined />}>Xem tất cả</Button>}
          >
            <Table
              columns={orderColumns}
              dataSource={ordersData}
              pagination={false}
              size="middle"
            />
          </Card>
        </Col>

        {/* Sidebar */}
        <Col xs={24} lg={8}>
          {/* Top Products */}
          <Card
            title="Top sản phẩm"
            extra={<Button type="link">Xem tất cả</Button>}
            style={{ marginBottom: 16 }}
          >
            <List
              size="small"
              dataSource={topProducts}
              renderItem={(item, index) => (
                <List.Item>
                  <Space>
                    <Avatar
                      size="small"
                      style={{
                        backgroundColor: index < 3 ? "#10b981" : "#d1d5db",
                        fontSize: 12,
                      }}
                    >
                      {index + 1}
                    </Avatar>
                    <div>
                      <Text strong style={{ display: "block", fontSize: 13 }}>{item.name}</Text>
                      <Text type="secondary" style={{ fontSize: 12 }}>{item.sales} đã bán</Text>
                    </div>
                  </Space>
                  <div style={{ textAlign: "right" }}>
                    <Text strong style={{ display: "block" }}>{item.revenue}</Text>
                    <Space size={4}>
                      <StarFilled style={{ color: "#f59e0b", fontSize: 12 }} />
                      <Text type="secondary" style={{ fontSize: 12 }}>{item.rating}</Text>
                    </Space>
                  </div>
                </List.Item>
              )}
            />
          </Card>

          {/* Quick Actions */}
          <Card title="Hành động nhanh">
            <Space direction="vertical" style={{ width: "100%" }} size="middle">
              <Button type="primary" block icon={<PlusOutlined />} size="large">
                Thêm sản phẩm
              </Button>
              <Button block icon={<ShoppingCartOutlined />} size="large">
                Quản lý đơn hàng
              </Button>
              <Button block icon={<TeamOutlined />} size="large">
                Khách hàng
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Verification Banner */}
      <Alert
        style={{ marginTop: 24 }}
        message={
          <Space>
            <SafetyCertificateOutlined style={{ fontSize: 20 }} />
            <Text strong>Tài khoản đã được xác thực</Text>
          </Space>
        }
        description="Công ty của bạn đã được TradeHub xác minh và tin cậy. Nâng cấp gói dịch vụ để mở khóa thêm tính năng."
        type="success"
        showIcon={false}
        action={
          <Button type="primary">
            Nâng cấp gói
          </Button>
        }
      />
    </div>
  );
}
