"use client";

import { useState } from "react";
import {
  Card,
  Table,
  Tag,
  Space,
  Button,
  Input,
  Typography,
  Row,
  Col,
  Select,
  Modal,
  Descriptions,
  message,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  MessageOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

const { Title } = Typography;

interface SupportTicket {
  key: string;
  id: string;
  user: string;
  email: string;
  subject: string;
  category: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: string;
  updatedAt: string;
}

const mockTickets: SupportTicket[] = [
  {
    key: "1",
    id: "TICKET-2024-001",
    user: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    subject: "Không thể đăng nhập vào tài khoản",
    category: "Tài khoản",
    status: "open",
    priority: "high",
    createdAt: "2024-01-20 10:30",
    updatedAt: "2024-01-20 10:30",
  },
  {
    key: "2",
    id: "TICKET-2024-002",
    user: "Trần Thị B",
    email: "tranthib@email.com",
    subject: "Câu hỏi về thanh toán",
    category: "Thanh toán",
    status: "in_progress",
    priority: "medium",
    createdAt: "2024-01-19 14:20",
    updatedAt: "2024-01-20 09:15",
  },
  {
    key: "3",
    id: "TICKET-2024-003",
    user: "TechCorp Ltd",
    email: "support@techcorp.com",
    subject: "Yêu cầu tính năng mới",
    category: "Tính năng",
    status: "resolved",
    priority: "low",
    createdAt: "2024-01-18 16:45",
    updatedAt: "2024-01-19 11:20",
  },
];

export default function SupportPage() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const columns: ColumnsType<SupportTicket> = [
    {
      title: "Mã ticket",
      dataIndex: "id",
      key: "id",
      render: (text) => <Typography.Text strong>{text}</Typography.Text>,
    },
    {
      title: "Người dùng",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Chủ đề",
      dataIndex: "subject",
      key: "subject",
      ellipsis: true,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      render: (category) => <Tag>{category}</Tag>,
    },
    {
      title: "Độ ưu tiên",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => {
        const config = {
          urgent: { color: "red", text: "Khẩn cấp" },
          high: { color: "orange", text: "Cao" },
          medium: { color: "blue", text: "Trung bình" },
          low: { color: "default", text: "Thấp" },
        };
        const { color, text } = config[priority as keyof typeof config];
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const config = {
          open: { color: "warning", text: "Mở", icon: <ClockCircleOutlined /> },
          in_progress: { color: "processing", text: "Đang xử lý", icon: <MessageOutlined /> },
          resolved: { color: "success", text: "Đã giải quyết", icon: <CheckCircleOutlined /> },
          closed: { color: "default", text: "Đã đóng", icon: <CheckCircleOutlined /> },
        };
        const { color, text, icon } = config[status as keyof typeof config];
        return (
          <Tag color={color} icon={icon}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => dayjs(date).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={() => {
            setSelectedTicket(record);
            setModalVisible(true);
          }}
        >
          Chi tiết
        </Button>
      ),
    },
  ];

  const filteredData = mockTickets.filter((ticket) => {
    const matchesSearch =
      ticket.id.toLowerCase().includes(searchText.toLowerCase()) ||
      ticket.user.toLowerCase().includes(searchText.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = {
    open: filteredData.filter((t) => t.status === "open").length,
    inProgress: filteredData.filter((t) => t.status === "in_progress").length,
    resolved: filteredData.filter((t) => t.status === "resolved").length,
    urgent: filteredData.filter((t) => t.priority === "urgent").length,
  };

  return (
    <div>
      <Title level={2}>Hỗ trợ Khách hàng</Title>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Space>
              <ClockCircleOutlined style={{ fontSize: 24, color: "#f59e0b" }} />
              <div>
                <Typography.Text type="secondary">Đang mở</Typography.Text>
                <br />
                <Typography.Title level={3} style={{ margin: 0 }}>
                  {stats.open}
                </Typography.Title>
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Space>
              <MessageOutlined style={{ fontSize: 24, color: "#3b82f6" }} />
              <div>
                <Typography.Text type="secondary">Đang xử lý</Typography.Text>
                <br />
                <Typography.Title level={3} style={{ margin: 0 }}>
                  {stats.inProgress}
                </Typography.Title>
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Space>
              <CheckCircleOutlined style={{ fontSize: 24, color: "#10b981" }} />
              <div>
                <Typography.Text type="secondary">Đã giải quyết</Typography.Text>
                <br />
                <Typography.Title level={3} style={{ margin: 0 }}>
                  {stats.resolved}
                </Typography.Title>
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Space>
              <UserOutlined style={{ fontSize: 24, color: "#ef4444" }} />
              <div>
                <Typography.Text type="secondary">Khẩn cấp</Typography.Text>
                <br />
                <Typography.Title level={3} style={{ margin: 0 }}>
                  {stats.urgent}
                </Typography.Title>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Tìm kiếm theo mã, người dùng, chủ đề..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              style={{ width: "100%" }}
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { label: "Tất cả trạng thái", value: "all" },
                { label: "Mở", value: "open" },
                { label: "Đang xử lý", value: "in_progress" },
                { label: "Đã giải quyết", value: "resolved" },
                { label: "Đã đóng", value: "closed" },
              ]}
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              style={{ width: "100%" }}
              value={priorityFilter}
              onChange={setPriorityFilter}
              options={[
                { label: "Tất cả độ ưu tiên", value: "all" },
                { label: "Khẩn cấp", value: "urgent" },
                { label: "Cao", value: "high" },
                { label: "Trung bình", value: "medium" },
                { label: "Thấp", value: "low" },
              ]}
            />
          </Col>
        </Row>
      </Card>

      <Card title={`Danh sách ticket (${filteredData.length})`}>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} ticket`,
          }}
        />
      </Card>

      <Modal
        title="Chi tiết Ticket"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            Đóng
          </Button>,
          <Button key="resolve" type="primary">
            Đánh dấu đã giải quyết
          </Button>,
        ]}
        width={700}
      >
        {selectedTicket && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Mã ticket">{selectedTicket.id}</Descriptions.Item>
            <Descriptions.Item label="Người dùng">{selectedTicket.user}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedTicket.email}</Descriptions.Item>
            <Descriptions.Item label="Chủ đề">{selectedTicket.subject}</Descriptions.Item>
            <Descriptions.Item label="Danh mục">
              <Tag>{selectedTicket.category}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Độ ưu tiên">
              <Tag
                color={
                  selectedTicket.priority === "urgent"
                    ? "red"
                    : selectedTicket.priority === "high"
                    ? "orange"
                    : selectedTicket.priority === "medium"
                    ? "blue"
                    : "default"
                }
              >
                {selectedTicket.priority}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <Tag
                color={
                  selectedTicket.status === "open"
                    ? "warning"
                    : selectedTicket.status === "in_progress"
                    ? "processing"
                    : selectedTicket.status === "resolved"
                    ? "success"
                    : "default"
                }
              >
                {selectedTicket.status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">
              {dayjs(selectedTicket.createdAt).format("DD/MM/YYYY HH:mm")}
            </Descriptions.Item>
            <Descriptions.Item label="Cập nhật lần cuối">
              {dayjs(selectedTicket.updatedAt).format("DD/MM/YYYY HH:mm")}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
}

