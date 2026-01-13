"use client";

import { useState } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Input,
  Button,
  List,
  Avatar,
  Tag,
  Collapse,
  Form,
  Select,
  message,
  Space,
  Tabs,
  Badge,
} from "antd";
import {
  QuestionCircleOutlined,
  MessageOutlined,
  PhoneOutlined,
  MailOutlined,
  FileTextOutlined,
  SendOutlined,
  PlusOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

interface Ticket {
  id: string;
  subject: string;
  status: "open" | "pending" | "resolved";
  priority: "low" | "medium" | "high";
  createdAt: string;
  lastReply: string;
}

const mockTickets: Ticket[] = [
  { id: "TK001", subject: "Không thể cập nhật sản phẩm", status: "open", priority: "high", createdAt: "2024-01-20", lastReply: "2024-01-20 14:30" },
  { id: "TK002", subject: "Hỏi về chính sách hoàn tiền", status: "pending", priority: "medium", createdAt: "2024-01-18", lastReply: "2024-01-19 10:00" },
  { id: "TK003", subject: "Yêu cầu hỗ trợ tích hợp API", status: "resolved", priority: "low", createdAt: "2024-01-15", lastReply: "2024-01-16 16:00" },
];

const faqItems = [
  {
    key: "1",
    label: "Làm thế nào để thêm sản phẩm mới?",
    children: "Vào mục Sản phẩm > Thêm mới, điền đầy đủ thông tin và nhấn Lưu.",
  },
  {
    key: "2",
    label: "Tôi có thể hủy đơn hàng đã xác nhận không?",
    children: "Bạn có thể hủy đơn hàng trước khi chuyển sang trạng thái 'Đang giao'. Liên hệ hỗ trợ nếu cần hủy đơn đang giao.",
  },
  {
    key: "3",
    label: "Phí giao dịch được tính như thế nào?",
    children: "Phí giao dịch là 2% trên mỗi đơn hàng thành công. Không tính phí cho đơn hàng bị hủy hoặc hoàn tiền.",
  },
  {
    key: "4",
    label: "Thời gian rút tiền là bao lâu?",
    children: "Yêu cầu rút tiền sẽ được xử lý trong vòng 1-3 ngày làm việc.",
  },
];

export default function SupportPage() {
  const [form] = Form.useForm();
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);

  const getStatusTag = (status: string) => {
    const statusMap: Record<string, { color: string; text: string }> = {
      open: { color: "blue", text: "Đang mở" },
      pending: { color: "orange", text: "Chờ phản hồi" },
      resolved: { color: "green", text: "Đã giải quyết" },
    };
    const { color, text } = statusMap[status];
    return <Tag color={color}>{text}</Tag>;
  };

  const getPriorityTag = (priority: string) => {
    const priorityMap: Record<string, { color: string; text: string }> = {
      low: { color: "default", text: "Thấp" },
      medium: { color: "orange", text: "Trung bình" },
      high: { color: "red", text: "Cao" },
    };
    const { color, text } = priorityMap[priority];
    return <Tag color={color}>{text}</Tag>;
  };

  const handleCreateTicket = async (values: Record<string, unknown>) => {
    console.log("New ticket:", values);
    message.success("Đã gửi yêu cầu hỗ trợ!");
    setIsCreatingTicket(false);
    form.resetFields();
  };

  const tabItems = [
    {
      key: "tickets",
      label: (
        <Badge count={mockTickets.filter((t) => t.status === "open").length} size="small" offset={[10, 0]}>
          Yêu cầu hỗ trợ
        </Badge>
      ),
      children: (
        <>
          <div style={{ marginBottom: 16, textAlign: "right" }}>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsCreatingTicket(true)}>
              Tạo yêu cầu mới
            </Button>
          </div>

          {isCreatingTicket && (
            <Card title="Tạo yêu cầu hỗ trợ mới" style={{ marginBottom: 16 }}>
              <Form form={form} layout="vertical" onFinish={handleCreateTicket}>
                <Form.Item
                  label="Tiêu đề"
                  name="subject"
                  rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
                >
                  <Input placeholder="Nhập tiêu đề vấn đề" />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Danh mục" name="category" rules={[{ required: true }]}>
                      <Select
                        placeholder="Chọn danh mục"
                        options={[
                          { value: "product", label: "Sản phẩm" },
                          { value: "order", label: "Đơn hàng" },
                          { value: "payment", label: "Thanh toán" },
                          { value: "technical", label: "Kỹ thuật" },
                          { value: "other", label: "Khác" },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Mức độ ưu tiên" name="priority" initialValue="medium">
                      <Select
                        options={[
                          { value: "low", label: "Thấp" },
                          { value: "medium", label: "Trung bình" },
                          { value: "high", label: "Cao" },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="Mô tả chi tiết"
                  name="description"
                  rules={[{ required: true, message: "Vui lòng mô tả vấn đề" }]}
                >
                  <TextArea rows={4} placeholder="Mô tả chi tiết vấn đề của bạn" />
                </Form.Item>

                <div style={{ textAlign: "right" }}>
                  <Space>
                    <Button onClick={() => setIsCreatingTicket(false)}>Hủy</Button>
                    <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
                      Gửi yêu cầu
                    </Button>
                  </Space>
                </div>
              </Form>
            </Card>
          )}

          <List
            dataSource={mockTickets}
            renderItem={(ticket) => (
              <List.Item
                actions={[
                  <Button key="view" type="link">
                    Xem chi tiết
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      icon={<MessageOutlined />}
                      style={{
                        backgroundColor:
                          ticket.status === "open" ? "#3b82f6" : ticket.status === "pending" ? "#f59e0b" : "#10b981",
                      }}
                    />
                  }
                  title={
                    <Space>
                      <Text strong>{ticket.subject}</Text>
                      {getStatusTag(ticket.status)}
                      {getPriorityTag(ticket.priority)}
                    </Space>
                  }
                  description={
                    <>
                      <Text type="secondary">#{ticket.id}</Text>
                      <Text type="secondary" style={{ marginLeft: 16 }}>
                        <ClockCircleOutlined /> Cập nhật: {ticket.lastReply}
                      </Text>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </>
      ),
    },
    {
      key: "faq",
      label: "Câu hỏi thường gặp",
      children: (
        <Collapse items={faqItems} defaultActiveKey={["1"]} />
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={4} style={{ margin: 0 }}>Hỗ trợ</Title>
        <Text type="secondary">Trung tâm hỗ trợ và giải đáp thắc mắc</Text>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card hoverable style={{ textAlign: "center" }}>
            <PhoneOutlined style={{ fontSize: 32, color: "#10b981", marginBottom: 12 }} />
            <Title level={5}>Hotline</Title>
            <Paragraph>028 1234 5678</Paragraph>
            <Text type="secondary">Thứ 2 - Thứ 6, 8:00 - 18:00</Text>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card hoverable style={{ textAlign: "center" }}>
            <MailOutlined style={{ fontSize: 32, color: "#3b82f6", marginBottom: 12 }} />
            <Title level={5}>Email</Title>
            <Paragraph>support@tradehub.vn</Paragraph>
            <Text type="secondary">Phản hồi trong 24 giờ</Text>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card hoverable style={{ textAlign: "center" }}>
            <MessageOutlined style={{ fontSize: 32, color: "#f59e0b", marginBottom: 12 }} />
            <Title level={5}>Live Chat</Title>
            <Paragraph>Chat trực tiếp</Paragraph>
            <Button type="primary">Bắt đầu chat</Button>
          </Card>
        </Col>
      </Row>

      <Card>
        <Tabs items={tabItems} />
      </Card>
    </div>
  );
}

