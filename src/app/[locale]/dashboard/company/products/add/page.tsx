"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Card,
  Form,
  Input,
  Button,
  Upload,
  Select,
  InputNumber,
  Row,
  Col,
  Typography,
  Divider,
  message,
  Switch,
  Space,
} from "antd";
import {
  PlusOutlined,
  SaveOutlined,
  ArrowLeftOutlined,
  InboxOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Dragger } = Upload;

export default function AddProductPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: Record<string, unknown>) => {
    setLoading(true);
    console.log("Product data:", values);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    message.success("Thêm sản phẩm thành công!");
    setLoading(false);
    router.push(`/${locale}/dashboard/company/products`);
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => router.back()}
          style={{ marginBottom: 16 }}
        >
          Quay lại
        </Button>
        <Title level={4} style={{ margin: 0 }}>
          Thêm sản phẩm mới
        </Title>
        <Text type="secondary">Điền thông tin chi tiết sản phẩm</Text>
      </div>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={24}>
          <Col xs={24} lg={16}>
            <Card title="Thông tin cơ bản" style={{ marginBottom: 24 }}>
              <Form.Item
                label="Tên sản phẩm"
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
              >
                <Input placeholder="Nhập tên sản phẩm" />
              </Form.Item>

              <Form.Item
                label="Mô tả ngắn"
                name="shortDescription"
                rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
              >
                <TextArea rows={2} placeholder="Mô tả ngắn gọn về sản phẩm" />
              </Form.Item>

              <Form.Item label="Mô tả chi tiết" name="description">
                <TextArea rows={6} placeholder="Mô tả chi tiết sản phẩm, tính năng, thông số..." />
              </Form.Item>
            </Card>

            <Card title="Hình ảnh sản phẩm" style={{ marginBottom: 24 }}>
              <Form.Item name="images">
                <Dragger
                  multiple
                  listType="picture-card"
                  accept="image/*"
                  beforeUpload={() => false}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Kéo thả hoặc click để tải ảnh</p>
                  <p className="ant-upload-hint">Hỗ trợ JPG, PNG, GIF. Tối đa 5MB/ảnh</p>
                </Dragger>
              </Form.Item>
            </Card>

            <Card title="Giá & Tồn kho">
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Giá bán"
                    name="price"
                    rules={[{ required: true, message: "Vui lòng nhập giá" }]}
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      parser={(value) => value?.replace(/\$\s?|(,*)/g, "") as unknown as number}
                      addonAfter="VNĐ"
                      placeholder="0"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Giá gốc (nếu có)" name="originalPrice">
                    <InputNumber
                      style={{ width: "100%" }}
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      parser={(value) => value?.replace(/\$\s?|(,*)/g, "") as unknown as number}
                      addonAfter="VNĐ"
                      placeholder="0"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Số lượng tồn kho"
                    name="stock"
                    rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
                  >
                    <InputNumber style={{ width: "100%" }} min={0} placeholder="0" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="SKU" name="sku">
                    <Input placeholder="Mã SKU sản phẩm" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="Phân loại" style={{ marginBottom: 24 }}>
              <Form.Item
                label="Danh mục"
                name="category"
                rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
              >
                <Select
                  placeholder="Chọn danh mục"
                  options={[
                    { value: "dien-thoai", label: "Điện thoại" },
                    { value: "laptop", label: "Laptop" },
                    { value: "tablet", label: "Tablet" },
                    { value: "phu-kien", label: "Phụ kiện" },
                    { value: "dong-ho", label: "Đồng hồ" },
                  ]}
                />
              </Form.Item>

              <Form.Item label="Thương hiệu" name="brand">
                <Select
                  placeholder="Chọn thương hiệu"
                  options={[
                    { value: "apple", label: "Apple" },
                    { value: "samsung", label: "Samsung" },
                    { value: "xiaomi", label: "Xiaomi" },
                    { value: "oppo", label: "OPPO" },
                    { value: "other", label: "Khác" },
                  ]}
                />
              </Form.Item>

              <Form.Item label="Tags" name="tags">
                <Select
                  mode="tags"
                  placeholder="Nhập tags"
                  options={[
                    { value: "moi", label: "Mới" },
                    { value: "hot", label: "Hot" },
                    { value: "giam-gia", label: "Giảm giá" },
                    { value: "ban-chay", label: "Bán chạy" },
                  ]}
                />
              </Form.Item>
            </Card>

            <Card title="Trạng thái" style={{ marginBottom: 24 }}>
              <Form.Item
                label="Hiển thị sản phẩm"
                name="isActive"
                valuePropName="checked"
                initialValue={true}
              >
                <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
              </Form.Item>

              <Form.Item
                label="Sản phẩm nổi bật"
                name="isFeatured"
                valuePropName="checked"
              >
                <Switch checkedChildren="Có" unCheckedChildren="Không" />
              </Form.Item>

              <Form.Item
                label="Cho phép đặt trước"
                name="allowPreorder"
                valuePropName="checked"
              >
                <Switch checkedChildren="Có" unCheckedChildren="Không" />
              </Form.Item>
            </Card>

            <Card title="SEO">
              <Form.Item label="Meta Title" name="metaTitle">
                <Input placeholder="Tiêu đề SEO" />
              </Form.Item>

              <Form.Item label="Meta Description" name="metaDescription">
                <TextArea rows={3} placeholder="Mô tả SEO" />
              </Form.Item>
            </Card>
          </Col>
        </Row>

        <Divider />

        <div style={{ textAlign: "right" }}>
          <Space>
            <Button onClick={() => router.back()}>Hủy</Button>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={loading}>
              Lưu sản phẩm
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  );
}

