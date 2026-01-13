"use client";

import { useState } from "react";
import {
  Card,
  Button,
  Input,
  Typography,
  Row,
  Col,
  Statistic,
  Form,
  InputNumber,
  Select,
  Table,
  Tag,
  Modal,
  message,
  Alert,
  Descriptions,
} from "antd";
import type { TableProps } from "antd";
import {
  WalletOutlined,
  BankOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

interface WithdrawRequest {
  key: string;
  id: string;
  amount: number;
  bankName: string;
  accountNumber: string;
  status: "pending" | "processing" | "completed" | "rejected";
  createdAt: string;
  completedAt?: string;
}

const mockWithdrawRequests: WithdrawRequest[] = [
  { key: "1", id: "RT001", amount: 50000000, bankName: "Vietcombank", accountNumber: "****5678", status: "completed", createdAt: "2024-01-15", completedAt: "2024-01-16" },
  { key: "2", id: "RT002", amount: 30000000, bankName: "Techcombank", accountNumber: "****1234", status: "processing", createdAt: "2024-01-18" },
  { key: "3", id: "RT003", amount: 20000000, bankName: "Vietcombank", accountNumber: "****5678", status: "pending", createdAt: "2024-01-20" },
];

export default function WithdrawPage() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const availableBalance = 95960000;

  const handleWithdraw = async (values: Record<string, unknown>) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Withdraw:", values);
    message.success("Yêu cầu rút tiền đã được gửi!");
    setLoading(false);
    setIsModalOpen(false);
    form.resetFields();
  };

  const getStatusTag = (status: string) => {
    const statusMap: Record<string, { color: string; text: string; icon: React.ReactNode }> = {
      pending: { color: "orange", text: "Chờ xử lý", icon: <ClockCircleOutlined /> },
      processing: { color: "blue", text: "Đang xử lý", icon: <ClockCircleOutlined /> },
      completed: { color: "green", text: "Hoàn thành", icon: <CheckCircleOutlined /> },
      rejected: { color: "red", text: "Từ chối", icon: <ExclamationCircleOutlined /> },
    };
    const { color, text, icon } = statusMap[status];
    return <Tag color={color} icon={icon}>{text}</Tag>;
  };

  const columns: TableProps<WithdrawRequest>["columns"] = [
    {
      title: "Mã yêu cầu",
      dataIndex: "id",
      key: "id",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <Text strong style={{ color: "#10b981" }}>
          {amount.toLocaleString("vi-VN")}đ
        </Text>
      ),
    },
    {
      title: "Ngân hàng",
      key: "bank",
      render: (_, record) => (
        <div>
          <Text>{record.bankName}</Text>
          <br />
          <Text type="secondary">{record.accountNumber}</Text>
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusTag(status),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Ngày hoàn thành",
      dataIndex: "completedAt",
      key: "completedAt",
      render: (text) => text || "-",
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={4} style={{ margin: 0 }}>Rút tiền</Title>
        <Text type="secondary">Quản lý rút tiền về tài khoản ngân hàng</Text>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Số dư khả dụng"
              value={availableBalance}
              valueStyle={{ color: "#10b981" }}
              prefix={<WalletOutlined />}
              formatter={(value) => `${Number(value).toLocaleString("vi-VN")} đ`}
            />
            <Button
              type="primary"
              style={{ marginTop: 16, width: "100%" }}
              onClick={() => setIsModalOpen(true)}
            >
              Rút tiền
            </Button>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Đang xử lý"
              value={mockWithdrawRequests.filter((r) => r.status === "processing" || r.status === "pending").reduce((sum, r) => sum + r.amount, 0)}
              valueStyle={{ color: "#f59e0b" }}
              prefix={<ClockCircleOutlined />}
              formatter={(value) => `${Number(value).toLocaleString("vi-VN")} đ`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Đã rút tháng này"
              value={50000000}
              prefix={<CheckCircleOutlined />}
              formatter={(value) => `${Number(value).toLocaleString("vi-VN")} đ`}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Tài khoản ngân hàng mặc định" style={{ marginBottom: 24 }}>
        <Descriptions>
          <Descriptions.Item label="Ngân hàng">Vietcombank</Descriptions.Item>
          <Descriptions.Item label="Chi nhánh">Hồ Chí Minh</Descriptions.Item>
          <Descriptions.Item label="Số tài khoản">1234567890</Descriptions.Item>
          <Descriptions.Item label="Chủ tài khoản">CONG TY TNHH TECHCORP VIETNAM</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Lịch sử rút tiền">
        <Table
          columns={columns}
          dataSource={mockWithdrawRequests}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title="Rút tiền"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={500}
      >
        <Alert
          message={`Số dư khả dụng: ${availableBalance.toLocaleString("vi-VN")}đ`}
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />

        <Form form={form} layout="vertical" onFinish={handleWithdraw}>
          <Form.Item
            label="Số tiền rút"
            name="amount"
            rules={[
              { required: true, message: "Vui lòng nhập số tiền" },
              {
                validator: (_, value) => {
                  if (value && value > availableBalance) {
                    return Promise.reject("Số tiền vượt quá số dư khả dụng");
                  }
                  if (value && value < 100000) {
                    return Promise.reject("Số tiền tối thiểu là 100,000đ");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value?.replace(/\$\s?|(,*)/g, "") as unknown as number}
              addonAfter="VNĐ"
              placeholder="Nhập số tiền"
            />
          </Form.Item>

          <Form.Item
            label="Ngân hàng nhận"
            name="bank"
            initialValue="vietcombank"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { value: "vietcombank", label: "Vietcombank - ****5678" },
                { value: "techcombank", label: "Techcombank - ****1234" },
              ]}
            />
          </Form.Item>

          <Form.Item label="Ghi chú" name="note">
            <Input.TextArea rows={2} placeholder="Ghi chú (tùy chọn)" />
          </Form.Item>

          <div style={{ textAlign: "right" }}>
            <Button onClick={() => setIsModalOpen(false)} style={{ marginRight: 8 }}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Xác nhận rút tiền
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

