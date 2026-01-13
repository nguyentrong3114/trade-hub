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
  MobileOutlined,
  SafetyCertificateOutlined,
  ExclamationCircleOutlined,
  ApiOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [passwordForm] = Form.useForm();

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

  const handleDeleteAccount = () => {
    Modal.confirm({
      title: "Xóa tài khoản",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác.",
      okText: "Xóa tài khoản",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        message.success("Yêu cầu xóa tài khoản đã được gửi");
      },
    });
  };

  const tabItems = [
    {
      key: "general",
      label: (
        <span>
          <SettingOutlined /> Cài đặt chung
        </span>
      ),
      children: (
        <Form layout="vertical">
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item label="Ngôn ngữ" name="language" initialValue="vi">
                <Select
                  options={[
                    { value: "vi", label: "Tiếng Việt" },
                    { value: "en", label: "English" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Múi giờ" name="timezone" initialValue="asia_ho_chi_minh">
                <Select
                  options={[
                    { value: "asia_ho_chi_minh", label: "Asia/Ho_Chi_Minh (GMT+7)" },
                    { value: "asia_singapore", label: "Asia/Singapore (GMT+8)" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Định dạng ngày" name="dateFormat" initialValue="dd/mm/yyyy">
                <Select
                  options={[
                    { value: "dd/mm/yyyy", label: "DD/MM/YYYY" },
                    { value: "mm/dd/yyyy", label: "MM/DD/YYYY" },
                    { value: "yyyy-mm-dd", label: "YYYY-MM-DD" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Đơn vị tiền tệ" name="currency" initialValue="vnd">
                <Select
                  options={[
                    { value: "vnd", label: "VND - Việt Nam Đồng" },
                    { value: "usd", label: "USD - US Dollar" },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Title level={5}>Cài đặt cửa hàng</Title>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Chế độ nghỉ" extra="Tạm ngưng nhận đơn hàng mới">
                <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Tự động xác nhận đơn" extra="Tự động xác nhận đơn hàng đã thanh toán">
                <Switch checkedChildren="Bật" unCheckedChildren="Tắt" defaultChecked />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Cho phép đánh giá" extra="Khách hàng có thể đánh giá sản phẩm">
                <Switch checkedChildren="Bật" unCheckedChildren="Tắt" defaultChecked />
              </Form.Item>
            </Col>
          </Row>

          <div style={{ textAlign: "right" }}>
            <Button type="primary" icon={<SaveOutlined />} onClick={handleSave} loading={loading}>
              Lưu thay đổi
            </Button>
          </div>
        </Form>
      ),
    },
    {
      key: "notifications",
      label: (
        <span>
          <BellOutlined /> Thông báo
        </span>
      ),
      children: (
        <Form layout="vertical">
          <Title level={5}>Thông báo Email</Title>
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item label="Đơn hàng mới">
                <Switch checkedChildren="Bật" unCheckedChildren="Tắt" defaultChecked />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Đơn hàng hoàn thành">
                <Switch checkedChildren="Bật" unCheckedChildren="Tắt" defaultChecked />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Đánh giá mới">
                <Switch checkedChildren="Bật" unCheckedChildren="Tắt" defaultChecked />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Báo cáo hàng tuần">
                <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Title level={5}>Thông báo SMS</Title>
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item label="Đơn hàng mới">
                <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Cảnh báo tồn kho thấp">
                <Switch checkedChildren="Bật" unCheckedChildren="Tắt" defaultChecked />
              </Form.Item>
            </Col>
          </Row>

          <div style={{ textAlign: "right" }}>
            <Button type="primary" icon={<SaveOutlined />} onClick={handleSave} loading={loading}>
              Lưu thay đổi
            </Button>
          </div>
        </Form>
      ),
    },
    {
      key: "security",
      label: (
        <span>
          <LockOutlined /> Bảo mật
        </span>
      ),
      children: (
        <>
          <Card title="Đổi mật khẩu" style={{ marginBottom: 24 }}>
            <Form form={passwordForm} layout="vertical" onFinish={handleChangePassword}>
              <Row gutter={24}>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Mật khẩu hiện tại"
                    name="currentPassword"
                    rules={[{ required: true, message: "Vui lòng nhập mật khẩu hiện tại" }]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Mật khẩu mới"
                    name="newPassword"
                    rules={[
                      { required: true, message: "Vui lòng nhập mật khẩu mới" },
                      { min: 8, message: "Mật khẩu tối thiểu 8 ký tự" },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Xác nhận mật khẩu"
                    name="confirmPassword"
                    dependencies={["newPassword"]}
                    rules={[
                      { required: true, message: "Vui lòng xác nhận mật khẩu" },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("newPassword") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error("Mật khẩu không khớp"));
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
              </Row>
              <Button type="primary" htmlType="submit">
                Đổi mật khẩu
              </Button>
            </Form>
          </Card>

          <Card title="Xác thực 2 bước (2FA)" style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <Text strong>Xác thực qua ứng dụng</Text>
                <br />
                <Text type="secondary">Sử dụng Google Authenticator hoặc app tương tự</Text>
              </div>
              <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
            </div>
            <Divider />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <Text strong>Xác thực qua SMS</Text>
                <br />
                <Text type="secondary">Nhận mã OTP qua tin nhắn</Text>
              </div>
              <Switch checkedChildren="Bật" unCheckedChildren="Tắt" defaultChecked />
            </div>
          </Card>

          <Card title="Phiên đăng nhập">
            <Alert
              message="Đăng xuất tất cả thiết bị"
              description="Đăng xuất khỏi tất cả các thiết bị khác ngoại trừ thiết bị hiện tại."
              type="warning"
              action={
                <Button danger onClick={() => message.success("Đã đăng xuất tất cả thiết bị khác")}>
                  Đăng xuất tất cả
                </Button>
              }
            />
          </Card>
        </>
      ),
    },
    {
      key: "api",
      label: (
        <span>
          <ApiOutlined /> API & Tích hợp
        </span>
      ),
      children: (
        <>
          <Alert
            message="API Key"
            description="Sử dụng API key để tích hợp với các hệ thống bên ngoài"
            type="info"
            showIcon
            style={{ marginBottom: 24 }}
          />

          <Card title="API Keys" style={{ marginBottom: 24 }}>
            <Form layout="vertical">
              <Form.Item label="API Key">
                <Input.Password value="sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx" readOnly />
              </Form.Item>
              <Form.Item label="Secret Key">
                <Input.Password value="sk_secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx" readOnly />
              </Form.Item>
              <Space>
                <Button type="primary">Tạo key mới</Button>
                <Button>Xem tài liệu API</Button>
              </Space>
            </Form>
          </Card>

          <Card title="Webhooks">
            <Form layout="vertical">
              <Form.Item label="Webhook URL" name="webhookUrl">
                <Input placeholder="https://your-domain.com/webhook" />
              </Form.Item>
              <Form.Item label="Events" name="events">
                <Select
                  mode="multiple"
                  placeholder="Chọn events"
                  options={[
                    { value: "order.created", label: "Đơn hàng mới" },
                    { value: "order.completed", label: "Đơn hàng hoàn thành" },
                    { value: "order.cancelled", label: "Đơn hàng bị hủy" },
                    { value: "payment.received", label: "Nhận thanh toán" },
                  ]}
                />
              </Form.Item>
              <Button type="primary" icon={<SaveOutlined />}>
                Lưu Webhook
              </Button>
            </Form>
          </Card>
        </>
      ),
    },
    {
      key: "danger",
      label: (
        <span style={{ color: "#ef4444" }}>
          <ExclamationCircleOutlined /> Vùng nguy hiểm
        </span>
      ),
      children: (
        <Card>
          <Alert
            message="Xóa tài khoản"
            description="Khi xóa tài khoản, tất cả dữ liệu sẽ bị xóa vĩnh viễn và không thể khôi phục. Bao gồm: sản phẩm, đơn hàng, khách hàng, giao dịch."
            type="error"
            showIcon
            action={
              <Button danger onClick={handleDeleteAccount}>
                Xóa tài khoản
              </Button>
            }
          />
        </Card>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={4} style={{ margin: 0 }}>Cài đặt</Title>
        <Text type="secondary">Quản lý cài đặt tài khoản và cửa hàng</Text>
      </div>

      <Card>
        <Tabs items={tabItems} tabPosition="left" />
      </Card>
    </div>
  );
}

