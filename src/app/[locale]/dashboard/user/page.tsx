"use client";

import { useState } from "react";
import {
  Card,
  Row,
  Col,
  Avatar,
  Button,
  Form,
  Input,
  DatePicker,
  Select,
  Upload,
  Tabs,
  Divider,
  Typography,
  message,
  Space,
  ConfigProvider,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  CameraOutlined,
  SaveOutlined,
  LockOutlined,
  BellOutlined,
  SafetyOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import type { UploadProps } from "antd";

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function UserProfile() {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSaveProfile = async (values: Record<string, unknown>) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Profile saved:", values);
    message.success("Cập nhật thông tin thành công!");
    setLoading(false);
  };

  const handleChangePassword = async (values: Record<string, unknown>) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Password changed:", values);
    message.success("Đổi mật khẩu thành công!");
    passwordForm.resetFields();
    setLoading(false);
  };

  const uploadProps: UploadProps = {
    name: "avatar",
    showUploadList: false,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("Chỉ được upload file ảnh!");
      }
      return false;
    },
  };

  const tabItems = [
    {
      key: "profile",
      label: (
        <span>
          <UserOutlined /> Thông tin cá nhân
        </span>
      ),
      children: (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSaveProfile}
          initialValues={{
            fullName: "Nguyễn Văn A",
            email: "nguyenvana@email.com",
            phone: "0912345678",
            gender: "male",
            bio: "Xin chào, tôi là người dùng Trade Hub!",
            address: "123 Đường ABC, Quận 1, TP. Hồ Chí Minh",
          }}
        >
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item
                name="fullName"
                label="Họ và tên"
                rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Nhập họ và tên" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Vui lòng nhập email" },
                  { type: "email", message: "Email không hợp lệ" },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Nhập email" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="birthday" label="Ngày sinh">
                <DatePicker style={{ width: "100%" }} placeholder="Chọn ngày sinh" format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="gender" label="Giới tính">
                <Select
                  placeholder="Chọn giới tính"
                  options={[
                    { value: "male", label: "Nam" },
                    { value: "female", label: "Nữ" },
                    { value: "other", label: "Khác" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="language" label="Ngôn ngữ">
                
                <Select
                  placeholder="Chọn ngôn ngữ"
                  defaultValue="vi"
                  options={[
                    { value: "vi", label: "🇻🇳 Tiếng Việt" },
                    { value: "en", label: "🇺🇸 English" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item name="address" label="Địa chỉ">
                <Input prefix={<HomeOutlined />} placeholder="Nhập địa chỉ" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item name="bio" label="Giới thiệu bản thân">
                <TextArea rows={3} placeholder="Viết vài dòng về bản thân..." maxLength={200} showCount />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>
              Lưu thay đổi
            </Button>
          </Form.Item>
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
        <div>
          <Title level={5}>Đổi mật khẩu</Title>
          <Form
            form={passwordForm}
            layout="vertical"
            onFinish={handleChangePassword}
            style={{ maxWidth: 400 }}
          >
            <Form.Item
              name="currentPassword"
              label="Mật khẩu hiện tại"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu hiện tại" }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu hiện tại" />
            </Form.Item>
            <Form.Item
              name="newPassword"
              label="Mật khẩu mới"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu mới" },
                { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự" },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu mới" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Xác nhận mật khẩu mới"
              dependencies={["newPassword"]}
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu không khớp!"));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Xác nhận mật khẩu mới" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Đổi mật khẩu
              </Button>
            </Form.Item>
          </Form>

          <Divider />

          <Title level={5}>Xác thực 2 bước (2FA)</Title>
          <Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
            Bảo vệ tài khoản của bạn bằng xác thực 2 bước khi đăng nhập.
          </Text>
          <Button icon={<SafetyOutlined />}>Bật xác thực 2 bước</Button>
        </div>
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
        <div>
          <Title level={5}>Cài đặt thông báo</Title>
          <Space direction="vertical" style={{ width: "100%" }} size="large">
            <Card size="small">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <Text strong>Thông báo qua Email</Text>
                  <br />
                  <Text type="secondary">Nhận thông báo về đơn hàng, khuyến mãi qua email</Text>
                </div>
                <Select defaultValue="all" style={{ width: 150 }}>
                  <Select.Option value="all">Tất cả</Select.Option>
                  <Select.Option value="important">Quan trọng</Select.Option>
                  <Select.Option value="none">Tắt</Select.Option>
                </Select>
              </div>
            </Card>
            <Card size="small">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <Text strong>Thông báo qua SMS</Text>
                  <br />
                  <Text type="secondary">Nhận tin nhắn về đơn hàng và bảo mật</Text>
                </div>
                <Select defaultValue="important" style={{ width: 150 }}>
                  <Select.Option value="all">Tất cả</Select.Option>
                  <Select.Option value="important">Quan trọng</Select.Option>
                  <Select.Option value="none">Tắt</Select.Option>
                </Select>
              </div>
            </Card>
            <Card size="small">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <Text strong>Thông báo đẩy</Text>
                  <br />
                  <Text type="secondary">Nhận thông báo trên trình duyệt</Text>
                </div>
                <Select defaultValue="none" style={{ width: 150 }}>
                  <Select.Option value="all">Tất cả</Select.Option>
                  <Select.Option value="important">Quan trọng</Select.Option>
                  <Select.Option value="none">Tắt</Select.Option>
                </Select>
              </div>
            </Card>
          </Space>
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#3b82f6",
          borderRadius: 8,
        },
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 16px" }}>
        {/* Page Title */}
        <Title level={2} style={{ marginBottom: 24 }}>
          Hồ sơ cá nhân
        </Title>

        {/* Profile Header */}
        <Card style={{ marginBottom: 24, textAlign: "center" }}>
          <div style={{ position: "relative", display: "inline-block", marginBottom: 16 }}>
            <Avatar
              size={120}
              icon={<UserOutlined />}
              style={{ backgroundColor: "#3b82f6" }}
              src="/img/section1.jpg"
            />
            <Upload {...uploadProps}>
              <Button
                type="primary"
                shape="circle"
                size="small"
                icon={<CameraOutlined />}
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  border: "2px solid #fff",
                }}
              />
            </Upload>
          </div>
          <Title level={3} style={{ marginBottom: 4 }}>
            Nguyễn Văn A
          </Title>
          <Text type="secondary">
            <MailOutlined /> nguyenvana@email.com
          </Text>
          <br />
          <Text type="secondary">
            <GlobalOutlined /> Thành viên từ tháng 01/2024
          </Text>
        </Card>

        {/* Profile Content */}
        <Card>
          <Tabs items={tabItems} />
        </Card>
      </div>
    </ConfigProvider>
  );
}
