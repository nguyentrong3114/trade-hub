"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Card,
  Typography,
  Tabs,
  Table,
  Tag,
  Button,
  Alert,
  Divider,
  Input,
  Space,
  message,
} from "antd";
import {
  ArrowLeftOutlined,
  ApiOutlined,
  CopyOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  CodeOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

export default function ApiDocsPage() {
  const params = useParams();
  const locale = params.locale as string;
  const [showApiKey, setShowApiKey] = useState(false);
  const apiKey = "sk_live_abc123xyz789def456ghijklmnop";

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    message.success("Đã sao chép API key!");
  };

  const endpoints = [
    { method: "GET", endpoint: "/api/v1/products", description: "Lấy danh sách sản phẩm", auth: true },
    { method: "POST", endpoint: "/api/v1/products", description: "Tạo sản phẩm mới", auth: true },
    { method: "PUT", endpoint: "/api/v1/products/:id", description: "Cập nhật sản phẩm", auth: true },
    { method: "DELETE", endpoint: "/api/v1/products/:id", description: "Xóa sản phẩm", auth: true },
    { method: "GET", endpoint: "/api/v1/orders", description: "Lấy danh sách đơn hàng", auth: true },
    { method: "PUT", endpoint: "/api/v1/orders/:id/status", description: "Cập nhật trạng thái đơn", auth: true },
    { method: "GET", endpoint: "/api/v1/customers", description: "Lấy danh sách khách hàng", auth: true },
    { method: "GET", endpoint: "/api/v1/analytics", description: "Lấy thống kê", auth: true },
  ];

  const columns = [
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
      render: (method: string) => {
        const colorMap: Record<string, string> = {
          GET: "green",
          POST: "blue",
          PUT: "orange",
          DELETE: "red",
        };
        return <Tag color={colorMap[method]}>{method}</Tag>;
      },
    },
    { title: "Endpoint", dataIndex: "endpoint", key: "endpoint", render: (text: string) => <code>{text}</code> },
    { title: "Mô tả", dataIndex: "description", key: "description" },
    {
      title: "Auth",
      dataIndex: "auth",
      key: "auth",
      render: (auth: boolean) => auth ? <Tag color="purple">Required</Tag> : <Tag>Public</Tag>,
    },
  ];

  const webhookEvents = [
    { event: "order.created", description: "Khi có đơn hàng mới" },
    { event: "order.updated", description: "Khi đơn hàng được cập nhật" },
    { event: "order.completed", description: "Khi đơn hàng hoàn thành" },
    { event: "order.cancelled", description: "Khi đơn hàng bị hủy" },
    { event: "product.created", description: "Khi sản phẩm được tạo" },
    { event: "product.updated", description: "Khi sản phẩm được cập nhật" },
    { event: "payment.received", description: "Khi nhận được thanh toán" },
  ];

  const tabItems = [
    {
      key: "overview",
      label: "Tổng quan",
      children: (
        <>
          <Paragraph>
            API của TechCorp cho phép bạn tích hợp cửa hàng với các hệ thống bên ngoài như ERP, 
            phần mềm kế toán, hoặc ứng dụng di động của riêng bạn.
          </Paragraph>
          
          <Card title="API Key của bạn" size="small" style={{ marginBottom: 24 }}>
            <Space.Compact style={{ width: "100%" }}>
              <Input
                value={showApiKey ? apiKey : "••••••••••••••••••••••••••••••••"}
                readOnly
                style={{ fontFamily: "monospace" }}
              />
              <Button icon={showApiKey ? <EyeInvisibleOutlined /> : <EyeOutlined />} onClick={() => setShowApiKey(!showApiKey)} />
              <Button icon={<CopyOutlined />} onClick={copyApiKey}>Sao chép</Button>
            </Space.Compact>
            <Text type="secondary" style={{ display: "block", marginTop: 8 }}>
              ⚠️ Không chia sẻ API key này với bất kỳ ai
            </Text>
          </Card>

          <Alert
            message="Base URL"
            description={<code>https://api.techcorp.vn/v1</code>}
            type="info"
            style={{ marginBottom: 24 }}
          />

          <Title level={5}>Authentication</Title>
          <Paragraph>
            Thêm header <code>Authorization: Bearer YOUR_API_KEY</code> vào mỗi request.
          </Paragraph>
          <pre style={{ background: "#1f2937", color: "#e5e7eb", padding: 16, borderRadius: 8, overflow: "auto" }}>
{`curl -X GET "https://api.techcorp.vn/v1/products" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json"`}
          </pre>
        </>
      ),
    },
    {
      key: "endpoints",
      label: "Endpoints",
      children: (
        <>
          <Table 
            columns={columns} 
            dataSource={endpoints.map((e, i) => ({ ...e, key: i }))} 
            pagination={false}
            size="small"
          />
          
          <Divider />
          
          <Title level={5}>Ví dụ Response</Title>
          <pre style={{ background: "#1f2937", color: "#e5e7eb", padding: 16, borderRadius: 8, overflow: "auto" }}>
{`{
  "success": true,
  "data": {
    "products": [
      {
        "id": "prod_123",
        "name": "iPhone 15 Pro Max",
        "price": 34990000,
        "stock": 50,
        "status": "active"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 156
    }
  }
}`}
          </pre>
        </>
      ),
    },
    {
      key: "webhooks",
      label: "Webhooks",
      children: (
        <>
          <Paragraph>
            Webhooks cho phép bạn nhận thông báo realtime khi có sự kiện xảy ra trên cửa hàng.
          </Paragraph>
          
          <Table
            columns={[
              { title: "Event", dataIndex: "event", key: "event", render: (text: string) => <code>{text}</code> },
              { title: "Mô tả", dataIndex: "description", key: "description" },
            ]}
            dataSource={webhookEvents.map((e, i) => ({ ...e, key: i }))}
            pagination={false}
            size="small"
          />
          
          <Divider />
          
          <Title level={5}>Cấu hình Webhook</Title>
          <Paragraph>
            Vào <Link href={`/${locale}/dashboard/company/settings`}>Cài đặt → API & Tích hợp</Link> để 
            cấu hình webhook URL và chọn events muốn nhận.
          </Paragraph>
          
          <Title level={5}>Webhook Payload</Title>
          <pre style={{ background: "#1f2937", color: "#e5e7eb", padding: 16, borderRadius: 8, overflow: "auto" }}>
{`{
  "event": "order.created",
  "timestamp": "2024-01-20T14:30:00Z",
  "data": {
    "order_id": "ord_123",
    "customer": {
      "name": "Nguyễn Văn A",
      "email": "customer@example.com"
    },
    "total": 34990000,
    "items": [...]
  }
}`}
          </pre>
        </>
      ),
    },
    {
      key: "sdks",
      label: "SDKs",
      children: (
        <>
          <Paragraph>
            Sử dụng SDK để tích hợp nhanh hơn với ngôn ngữ yêu thích của bạn.
          </Paragraph>
          
          <Card title="JavaScript / Node.js" size="small" style={{ marginBottom: 16 }}>
            <pre style={{ background: "#1f2937", color: "#e5e7eb", padding: 12, borderRadius: 8, margin: 0 }}>
{`npm install @techcorp/sdk

// Usage
const TechCorp = require('@techcorp/sdk');
const client = new TechCorp('YOUR_API_KEY');

const products = await client.products.list();`}
            </pre>
          </Card>
          
          <Card title="Python" size="small" style={{ marginBottom: 16 }}>
            <pre style={{ background: "#1f2937", color: "#e5e7eb", padding: 12, borderRadius: 8, margin: 0 }}>
{`pip install techcorp

# Usage
from techcorp import TechCorp
client = TechCorp('YOUR_API_KEY')

products = client.products.list()`}
            </pre>
          </Card>
          
          <Card title="PHP" size="small">
            <pre style={{ background: "#1f2937", color: "#e5e7eb", padding: 12, borderRadius: 8, margin: 0 }}>
{`composer require techcorp/sdk

// Usage
$client = new \\TechCorp\\Client('YOUR_API_KEY');
$products = $client->products->list();`}
            </pre>
          </Card>
        </>
      ),
    },
  ];

  return (
    <div>
      <Link href={`/${locale}/dashboard/company/docs`}>
        <Button icon={<ArrowLeftOutlined />} style={{ marginBottom: 24 }}>
          Quay lại Tài liệu
        </Button>
      </Link>

      <Title level={2}>
        <ApiOutlined style={{ marginRight: 12, color: "#8b5cf6" }} />
        API Reference
      </Title>
      <Paragraph type="secondary" style={{ fontSize: 16 }}>
        Tài liệu API cho developer để tích hợp với hệ thống của bạn
      </Paragraph>

      <Tabs items={tabItems} />

      {/* Navigation */}
      <Divider />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link href={`/${locale}/dashboard/company/docs/orders`}>
          <Button>← Quản lý đơn hàng</Button>
        </Link>
        <Link href={`/${locale}/dashboard/company/docs/faq`}>
          <Button type="primary">FAQ →</Button>
        </Link>
      </div>
    </div>
  );
}

