"use client";

import { useState } from "react";
import {
  Card,
  Table,
  Button,
  Input,
  Tag,
  Space,
  Typography,
  Avatar,
  Row,
  Col,
  Statistic,
  Modal,
  Descriptions,
  List,
} from "antd";
import type { TableProps } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  EyeOutlined,
  MailOutlined,
  PhoneOutlined,
  ShoppingOutlined,
  TeamOutlined,
  CrownOutlined,
  StarOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

interface Customer {
  key: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  totalOrders: number;
  totalSpent: number;
  level: "bronze" | "silver" | "gold" | "platinum";
  lastOrder: string;
  createdAt: string;
}

const mockCustomers: Customer[] = [
  { key: "1", id: "KH001", name: "Nguyễn Văn A", email: "nguyenvana@gmail.com", phone: "0901234567", avatar: "", totalOrders: 15, totalSpent: 125000000, level: "platinum", lastOrder: "2024-01-20", createdAt: "2023-06-15" },
  { key: "2", id: "KH002", name: "Trần Thị B", email: "tranthib@gmail.com", phone: "0912345678", avatar: "", totalOrders: 8, totalSpent: 45000000, level: "gold", lastOrder: "2024-01-18", createdAt: "2023-08-20" },
  { key: "3", id: "KH003", name: "Lê Văn C", email: "levanc@gmail.com", phone: "0923456789", avatar: "", totalOrders: 5, totalSpent: 28000000, level: "silver", lastOrder: "2024-01-15", createdAt: "2023-10-10" },
  { key: "4", id: "KH004", name: "Phạm Thị D", email: "phamthid@gmail.com", phone: "0934567890", avatar: "", totalOrders: 2, totalSpent: 12000000, level: "bronze", lastOrder: "2024-01-10", createdAt: "2024-01-01" },
  { key: "5", id: "KH005", name: "Hoàng Văn E", email: "hoangvane@gmail.com", phone: "0945678901", avatar: "", totalOrders: 12, totalSpent: 98000000, level: "gold", lastOrder: "2024-01-19", createdAt: "2023-07-25" },
];

export default function CustomersPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getLevelTag = (level: string) => {
    const levelMap: Record<string, { color: string; text: string; icon: React.ReactNode }> = {
      bronze: { color: "#cd7f32", text: "Bronze", icon: <StarOutlined /> },
      silver: { color: "#c0c0c0", text: "Silver", icon: <StarOutlined /> },
      gold: { color: "#ffd700", text: "Gold", icon: <CrownOutlined /> },
      platinum: { color: "#e5e4e2", text: "Platinum", icon: <CrownOutlined /> },
    };
    const { color, text, icon } = levelMap[level];
    return (
      <Tag color={color} icon={icon}>
        {text}
      </Tag>
    );
  };

  const showDetail = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const columns: TableProps<Customer>["columns"] = [
    {
      title: "Khách hàng",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <Avatar style={{ backgroundColor: "#10b981" }} icon={<UserOutlined />} />
          <div>
            <Text strong>{text}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>{record.id}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Liên hệ",
      key: "contact",
      render: (_, record) => (
        <div>
          <Text><MailOutlined /> {record.email}</Text>
          <br />
          <Text type="secondary"><PhoneOutlined /> {record.phone}</Text>
        </div>
      ),
    },
    {
      title: "Đơn hàng",
      dataIndex: "totalOrders",
      key: "totalOrders",
      sorter: (a, b) => a.totalOrders - b.totalOrders,
      render: (value) => `${value} đơn`,
    },
    {
      title: "Tổng chi tiêu",
      dataIndex: "totalSpent",
      key: "totalSpent",
      sorter: (a, b) => a.totalSpent - b.totalSpent,
      render: (value) => <Text strong style={{ color: "#10b981" }}>{value.toLocaleString("vi-VN")}đ</Text>,
    },
    {
      title: "Hạng thành viên",
      dataIndex: "level",
      key: "level",
      render: (level) => getLevelTag(level),
    },
    {
      title: "Đơn gần nhất",
      dataIndex: "lastOrder",
      key: "lastOrder",
    },
    {
      title: "",
      key: "action",
      width: 80,
      render: (_, record) => (
        <Button type="text" icon={<EyeOutlined />} onClick={() => showDetail(record)} />
      ),
    },
  ];

  const filteredCustomers = mockCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchText.toLowerCase()) ||
      c.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={4} style={{ margin: 0 }}>Quản lý khách hàng</Title>
        <Text type="secondary">Danh sách khách hàng của cửa hàng</Text>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={12} sm={6}>
          <Card size="small">
            <Statistic title="Tổng khách hàng" value={mockCustomers.length} prefix={<TeamOutlined />} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small">
            <Statistic
              title="Khách Platinum"
              value={mockCustomers.filter((c) => c.level === "platinum").length}
              valueStyle={{ color: "#10b981" }}
              prefix={<CrownOutlined />}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small">
            <Statistic
              title="Tổng đơn hàng"
              value={mockCustomers.reduce((sum, c) => sum + c.totalOrders, 0)}
              prefix={<ShoppingOutlined />}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small">
            <Statistic
              title="Tổng doanh thu"
              value={mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0)}
              prefix="₫"
              formatter={(value) => `${(Number(value) / 1000000).toFixed(0)}M`}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <div style={{ marginBottom: 16 }}>
          <Input
            placeholder="Tìm kiếm khách hàng..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <Table columns={columns} dataSource={filteredCustomers} pagination={{ pageSize: 10 }} />
      </Card>

      <Modal
        title="Thông tin khách hàng"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={500}
      >
        {selectedCustomer && (
          <>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <Avatar size={80} style={{ backgroundColor: "#10b981" }} icon={<UserOutlined />} />
              <Title level={4} style={{ margin: "16px 0 8px" }}>{selectedCustomer.name}</Title>
              {getLevelTag(selectedCustomer.level)}
            </div>

            <Descriptions column={1} size="small">
              <Descriptions.Item label="Mã khách hàng">{selectedCustomer.id}</Descriptions.Item>
              <Descriptions.Item label="Email">{selectedCustomer.email}</Descriptions.Item>
              <Descriptions.Item label="Điện thoại">{selectedCustomer.phone}</Descriptions.Item>
              <Descriptions.Item label="Ngày tham gia">{selectedCustomer.createdAt}</Descriptions.Item>
              <Descriptions.Item label="Tổng đơn hàng">{selectedCustomer.totalOrders} đơn</Descriptions.Item>
              <Descriptions.Item label="Tổng chi tiêu">
                <Text strong style={{ color: "#10b981" }}>
                  {selectedCustomer.totalSpent.toLocaleString("vi-VN")}đ
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Đơn hàng gần nhất">{selectedCustomer.lastOrder}</Descriptions.Item>
            </Descriptions>
          </>
        )}
      </Modal>
    </div>
  );
}

