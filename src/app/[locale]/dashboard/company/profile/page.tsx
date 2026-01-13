"use client";

import { useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Upload,
  Avatar,
  Row,
  Col,
  Divider,
  Select,
  DatePicker,
  message,
  Tabs,
  Tag,
  Space,
  Progress,
  Typography,
} from "antd";
import {
  ShopOutlined,
  UploadOutlined,
  SaveOutlined,
  GlobalOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  SafetyCertificateOutlined,
  FileTextOutlined,
  BankOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;
const { Title, Text } = Typography;

export default function CompanyProfilePage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    message.success("Cập nhật hồ sơ thành công!");
    setLoading(false);
  };

  const profileCompletion = 85;

  const tabItems = [
    {
      key: "basic",
      label: "Thông tin cơ bản",
      children: (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={24}>
            <Col span={24}>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <Avatar size={120} style={{ backgroundColor: "#10b981" }}>
                  TC
                </Avatar>
                <div style={{ marginTop: 16 }}>
                  <Upload showUploadList={false}>
                    <Button icon={<UploadOutlined />}>Thay đổi logo</Button>
                  </Upload>
                </div>
              </div>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Tên công ty"
                name="companyName"
                initialValue="TechCorp Vietnam"
                rules={[{ required: true, message: "Vui lòng nhập tên công ty" }]}
              >
                <Input prefix={<ShopOutlined />} placeholder="Nhập tên công ty" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Mã số thuế"
                name="taxCode"
                initialValue="0123456789"
                rules={[{ required: true, message: "Vui lòng nhập MST" }]}
              >
                <Input prefix={<FileTextOutlined />} placeholder="Nhập mã số thuế" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Email"
                name="email"
                initialValue="contact@techcorp.vn"
                rules={[{ required: true, type: "email" }]}
              >
                <Input prefix={<MailOutlined />} placeholder="Email công ty" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                initialValue="028 1234 5678"
                rules={[{ required: true }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Số điện thoại" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Website" name="website" initialValue="https://techcorp.vn">
                <Input prefix={<GlobalOutlined />} placeholder="Website" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Ngành nghề" name="industry" initialValue="technology">
                <Select
                  options={[
                    { value: "technology", label: "Công nghệ" },
                    { value: "retail", label: "Bán lẻ" },
                    { value: "manufacturing", label: "Sản xuất" },
                    { value: "services", label: "Dịch vụ" },
                    { value: "food", label: "Thực phẩm" },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Địa chỉ"
                name="address"
                initialValue="123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh"
              >
                <Input prefix={<EnvironmentOutlined />} placeholder="Địa chỉ công ty" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Mô tả công ty"
                name="description"
                initialValue="TechCorp Vietnam là công ty công nghệ hàng đầu, chuyên cung cấp các giải pháp phần mềm và dịch vụ IT cho doanh nghiệp."
              >
                <TextArea rows={4} placeholder="Mô tả về công ty của bạn" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <div style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={loading}>
              Lưu thay đổi
            </Button>
          </div>
        </Form>
      ),
    },
    {
      key: "legal",
      label: "Pháp lý & Chứng nhận",
      children: (
        <div>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Card title="Giấy phép kinh doanh" size="small">
                <Space direction="vertical" style={{ width: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Text>Trạng thái:</Text>
                    <Tag color="green" icon={<CheckCircleOutlined />}>
                      Đã xác minh
                    </Tag>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Text>Số GPKD:</Text>
                    <Text strong>0123456789</Text>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Text>Ngày cấp:</Text>
                    <Text>01/01/2020</Text>
                  </div>
                  <Upload>
                    <Button icon={<UploadOutlined />} block style={{ marginTop: 8 }}>
                      Cập nhật giấy phép
                    </Button>
                  </Upload>
                </Space>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card title="Chứng nhận ISO" size="small">
                <Space direction="vertical" style={{ width: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Text>ISO 9001:2015</Text>
                    <Tag color="green">Có hiệu lực</Tag>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Text>ISO 27001</Text>
                    <Tag color="orange">Đang xử lý</Tag>
                  </div>
                  <Upload>
                    <Button icon={<UploadOutlined />} block style={{ marginTop: 8 }}>
                      Thêm chứng nhận
                    </Button>
                  </Upload>
                </Space>
              </Card>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: "bank",
      label: "Thông tin ngân hàng",
      children: (
        <Form layout="vertical">
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item label="Ngân hàng" name="bankName" initialValue="Vietcombank">
                <Select
                  options={[
                    { value: "Vietcombank", label: "Vietcombank" },
                    { value: "Techcombank", label: "Techcombank" },
                    { value: "BIDV", label: "BIDV" },
                    { value: "VietinBank", label: "VietinBank" },
                    { value: "ACB", label: "ACB" },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Chi nhánh" name="bankBranch" initialValue="Hồ Chí Minh">
                <Input placeholder="Chi nhánh ngân hàng" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Số tài khoản" name="accountNumber" initialValue="1234567890">
                <Input prefix={<BankOutlined />} placeholder="Số tài khoản" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label="Chủ tài khoản" name="accountHolder" initialValue="CONG TY TNHH TECHCORP VIETNAM">
                <Input placeholder="Tên chủ tài khoản" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <div style={{ textAlign: "right" }}>
            <Button type="primary" icon={<SaveOutlined />}>
              Lưu thông tin
            </Button>
          </div>
        </Form>
      ),
    },
  ];

  return (
    <div>
      <Title level={4}>Hồ sơ công ty</Title>
      <Text type="secondary">Quản lý thông tin và cài đặt công ty của bạn</Text>

      <Row gutter={24} style={{ marginTop: 24 }}>
        <Col xs={24} lg={18}>
          <Card>
            <Tabs items={tabItems} />
          </Card>
        </Col>

        <Col xs={24} lg={6}>
          <Card title="Mức độ hoàn thiện" size="small">
            <Progress
              type="circle"
              percent={profileCompletion}
              strokeColor="#10b981"
              style={{ display: "block", margin: "0 auto 16px" }}
            />
            <Space direction="vertical" style={{ width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text>Thông tin cơ bản</Text>
                <CheckCircleOutlined style={{ color: "#10b981" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text>Giấy phép kinh doanh</Text>
                <CheckCircleOutlined style={{ color: "#10b981" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text>Thông tin ngân hàng</Text>
                <CheckCircleOutlined style={{ color: "#10b981" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text>Chứng nhận ISO</Text>
                <Tag color="orange">Đang xử lý</Tag>
              </div>
            </Space>
          </Card>

          <Card title="Trạng thái tài khoản" size="small" style={{ marginTop: 16 }}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text>Loại tài khoản:</Text>
                <Tag color="gold">Premium</Tag>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text>Xác minh:</Text>
                <Tag color="green" icon={<SafetyCertificateOutlined />}>
                  Đã xác minh
                </Tag>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text>Ngày tham gia:</Text>
                <Text>01/01/2024</Text>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

