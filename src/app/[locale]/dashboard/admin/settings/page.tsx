"use client";

import { useState } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Button,
  Switch,
  Select,
  Divider,
  message,
  Tabs,
  Alert,
  Space,
  Modal,
} from "antd";
import {
  BellOutlined,
  LockOutlined,
  GlobalOutlined,
  SaveOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
  ExclamationCircleOutlined,
  ApiOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [passwordForm] = Form.useForm();
  const [generalForm] = Form.useForm();

  const handleSave = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    message.success("Đã lưu cài đặt!");
    setLoading(false);
  };

  const handleChangePassword = async (values: Record<string, unknown>) => {
    console.log("Change password:", values);
    message.success("Đã đổi mật khẩu thành công!");
    passwordForm.resetFields();
  };

  const tabItems = [
    {
      key: "general",
      label: (
        <Space>
          <SettingOutlined />
          <span>Cài đặt chung</span>
        </Space>
      ),
      children: (
        <Form
          form={generalForm}
          layout="vertical"
          initialValues={{
            siteName: "B2B",
            siteUrl: "https://tradehub.com",
            adminEmail: "admin@tradehub.com",
            timezone: "Asia/Ho_Chi_Minh",
            language: "vi",
            maintenanceMode: false,
          }}
        >
          <Card>
            <Title level={4}>Thông tin hệ thống</Title>
            <Row gutter={[16, 0]}>
              <Col xs={24} md={12}>
                <Form.Item label="Tên website" name="siteName">
                  <Input placeholder="B2B" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="URL website" name="siteUrl">
                  <Input placeholder="https://tradehub.com" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Email Admin" name="adminEmail">
                  <Input prefix={<MailOutlined />} placeholder="admin@tradehub.com" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Múi giờ" name="timezone">
                  <Select>
                    <Select.Option value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh (GMT+7)</Select.Option>
                    <Select.Option value="UTC">UTC (GMT+0)</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Ngôn ngữ mặc định" name="language">
                  <Select>
                    <Select.Option value="vi">Tiếng Việt</Select.Option>
                    <Select.Option value="en">English</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card style={{ marginTop: 16 }}>
            <Title level={4}>Bảo trì hệ thống</Title>
            <Form.Item name="maintenanceMode" valuePropName="checked">
              <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
            </Form.Item>
            <Text type="secondary">
              Khi bật, chỉ Admin mới có thể truy cập website. Người dùng khác sẽ thấy trang bảo trì.
            </Text>
          </Card>

          <Button type="primary" icon={<SaveOutlined />} onClick={handleSave} loading={loading} style={{ marginTop: 16 }}>
            Lưu cài đặt
          </Button>
        </Form>
      ),
    },
    {
      key: "security",
      label: (
        <Space>
          <LockOutlined />
          <span>Bảo mật</span>
        </Space>
      ),
      children: (
        <div>
          <Card>
            <Title level={4}>Đổi mật khẩu</Title>
            <Form form={passwordForm} layout="vertical" onFinish={handleChangePassword}>
              <Form.Item
                label="Mật khẩu hiện tại"
                name="currentPassword"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu hiện tại" }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu hiện tại" />
              </Form.Item>
              <Form.Item
                label="Mật khẩu mới"
                name="newPassword"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu mới" },
                  { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự" },
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu mới" />
              </Form.Item>
              <Form.Item
                label="Xác nhận mật khẩu mới"
                name="confirmPassword"
                dependencies={["newPassword"]}
                rules={[
                  { required: true, message: "Vui lòng xác nhận mật khẩu" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Xác nhận mật khẩu mới" />
              </Form.Item>
              <Button type="primary" htmlType="submit" icon={<LockOutlined />}>
                Đổi mật khẩu
              </Button>
            </Form>
          </Card>

          <Card style={{ marginTop: 16 }}>
            <Title level={4}>Xác thực 2 yếu tố (2FA)</Title>
            <Space direction="vertical" style={{ width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <Text strong>Xác thực 2 yếu tố</Text>
                  <br />
                  <Text type="secondary">Bảo vệ tài khoản của bạn bằng mã xác thực</Text>
                </div>
                <Switch />
              </div>
            </Space>
          </Card>

          <Card style={{ marginTop: 16 }}>
            <Title level={4}>Phiên đăng nhập</Title>
            <Alert
              message="Quản lý phiên đăng nhập"
              description="Xem và quản lý các thiết bị đã đăng nhập vào tài khoản của bạn."
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
            />
            <Button>Xem tất cả phiên đăng nhập</Button>
          </Card>
        </div>
      ),
    },
    {
      key: "notifications",
      label: (
        <Space>
          <BellOutlined />
          <span>Thông báo</span>
        </Space>
      ),
      children: (
        <Card>
          <Title level={4}>Cài đặt thông báo</Title>
          <Space direction="vertical" style={{ width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <Text strong>Email thông báo</Text>
                <br />
                <Text type="secondary">Nhận thông báo qua email</Text>
              </div>
              <Switch defaultChecked />
            </div>
            <Divider />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <Text strong>Thông báo người dùng mới</Text>
                <br />
                <Text type="secondary">Thông báo khi có người dùng mới đăng ký</Text>
              </div>
              <Switch defaultChecked />
            </div>
            <Divider />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <Text strong>Thông báo đơn hàng</Text>
                <br />
                <Text type="secondary">Thông báo khi có đơn hàng mới</Text>
              </div>
              <Switch defaultChecked />
            </div>
            <Divider />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <Text strong>Thông báo báo cáo</Text>
                <br />
                <Text type="secondary">Thông báo báo cáo hàng ngày/tuần/tháng</Text>
              </div>
              <Switch />
            </div>
          </Space>
          <Button type="primary" icon={<SaveOutlined />} onClick={handleSave} loading={loading} style={{ marginTop: 16 }}>
            Lưu cài đặt
          </Button>
        </Card>
      ),
    },
    {
      key: "api",
      label: (
        <Space>
          <ApiOutlined />
          <span>API & Tích hợp</span>
        </Space>
      ),
      children: (
        <Card>
          <Title level={4}>API Keys</Title>
          <Alert
            message="Quan trọng"
            description="Giữ bí mật API keys của bạn. Không chia sẻ với bất kỳ ai."
            type="warning"
            showIcon
            style={{ marginBottom: 16 }}
          />
          <Space direction="vertical" style={{ width: "100%" }}>
            <div>
              <Text strong>API Key</Text>
              <br />
              <Input.Group compact style={{ marginTop: 8 }}>
                <Input
                  style={{ width: "calc(100% - 100px)" }}
                  value="sk_live_1234567890abcdef"
                  readOnly
                />
                <Button danger>Xóa</Button>
              </Input.Group>
            </div>
            <Button type="primary" icon={<ApiOutlined />}>
              Tạo API Key mới
            </Button>
          </Space>
        </Card>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Cài đặt</Title>
      <Tabs items={tabItems} />
    </div>
  );
}

