"use client";

import {
  Card,
  Row,
  Col,
  Statistic,
  Typography,
  Select,
  DatePicker,
  Table,
  Progress,
  Tag,
} from "antd";
import type { TableProps } from "antd";
import {
  ShoppingCartOutlined,
  DollarOutlined,
  UserOutlined,
  AppstoreOutlined,
  RiseOutlined,
  FallOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

interface ProductReport {
  key: string;
  name: string;
  category: string;
  sold: number;
  revenue: number;
  growth: number;
}

const mockProductReports: ProductReport[] = [
  { key: "1", name: "iPhone 15 Pro Max", category: "Điện thoại", sold: 120, revenue: 419880000, growth: 25 },
  { key: "2", name: "MacBook Pro 14 M3", category: "Laptop", sold: 45, revenue: 224955000, growth: 15 },
  { key: "3", name: "AirPods Pro 2", category: "Phụ kiện", sold: 200, revenue: 139800000, growth: -5 },
  { key: "4", name: "iPad Pro 12.9", category: "Tablet", sold: 30, revenue: 98970000, growth: 8 },
  { key: "5", name: "Apple Watch Ultra 2", category: "Đồng hồ", sold: 55, revenue: 120945000, growth: 20 },
];

export default function ReportsPage() {
  const columns: TableProps<ProductReport>["columns"] = [
    {
      title: "#",
      key: "rank",
      width: 50,
      render: (_, __, index) => (
        index < 3 ? (
          <TrophyOutlined style={{ color: index === 0 ? "#ffd700" : index === 1 ? "#c0c0c0" : "#cd7f32", fontSize: 18 }} />
        ) : (
          <Text>{index + 1}</Text>
        )
      ),
    },
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      render: (text) => <Tag>{text}</Tag>,
    },
    {
      title: "Đã bán",
      dataIndex: "sold",
      key: "sold",
      sorter: (a, b) => a.sold - b.sold,
    },
    {
      title: "Doanh thu",
      dataIndex: "revenue",
      key: "revenue",
      sorter: (a, b) => a.revenue - b.revenue,
      render: (value) => (
        <Text strong style={{ color: "#10b981" }}>
          {(value / 1000000).toFixed(1)}M đ
        </Text>
      ),
    },
    {
      title: "Tăng trưởng",
      dataIndex: "growth",
      key: "growth",
      render: (value) => (
        <span style={{ color: value >= 0 ? "#10b981" : "#ef4444" }}>
          {value >= 0 ? <RiseOutlined /> : <FallOutlined />} {Math.abs(value)}%
        </span>
      ),
    },
  ];

  const categoryData = [
    { name: "Điện thoại", value: 45, color: "#10b981" },
    { name: "Laptop", value: 25, color: "#3b82f6" },
    { name: "Phụ kiện", value: 15, color: "#f59e0b" },
    { name: "Tablet", value: 10, color: "#8b5cf6" },
    { name: "Đồng hồ", value: 5, color: "#ef4444" },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <Title level={4} style={{ margin: 0 }}>Báo cáo kinh doanh</Title>
          <Text type="secondary">Tổng quan hoạt động kinh doanh</Text>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <Select
            defaultValue="month"
            style={{ width: 120 }}
            options={[
              { value: "week", label: "Tuần này" },
              { value: "month", label: "Tháng này" },
              { value: "quarter", label: "Quý này" },
              { value: "year", label: "Năm nay" },
            ]}
          />
          <RangePicker />
        </div>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng đơn hàng"
              value={856}
              prefix={<ShoppingCartOutlined />}
              suffix={<Text type="success" style={{ fontSize: 14 }}><RiseOutlined /> 12%</Text>}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Doanh thu"
              value={1250}
              precision={0}
              valueStyle={{ color: "#10b981" }}
              prefix={<DollarOutlined />}
              suffix="M đ"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Khách hàng mới"
              value={128}
              prefix={<UserOutlined />}
              suffix={<Text type="success" style={{ fontSize: 14 }}><RiseOutlined /> 8%</Text>}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Sản phẩm bán"
              value={450}
              prefix={<AppstoreOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Top sản phẩm bán chạy">
            <Table
              columns={columns}
              dataSource={mockProductReports}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Doanh thu theo danh mục">
            {categoryData.map((item, index) => (
              <div key={index} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <Text>{item.name}</Text>
                  <Text strong>{item.value}%</Text>
                </div>
                <Progress percent={item.value} strokeColor={item.color} showInfo={false} />
              </div>
            ))}
          </Card>

          <Card title="Tỷ lệ hoàn thành đơn" style={{ marginTop: 16 }}>
            <div style={{ textAlign: "center" }}>
              <Progress
                type="circle"
                percent={94}
                strokeColor="#10b981"
                format={(percent) => (
                  <>
                    <div style={{ fontSize: 24, fontWeight: 600 }}>{percent}%</div>
                    <div style={{ fontSize: 12, color: "#999" }}>Đơn thành công</div>
                  </>
                )}
              />
            </div>
            <Row gutter={16} style={{ marginTop: 24, textAlign: "center" }}>
              <Col span={8}>
                <Statistic title="Hoàn thành" value={805} valueStyle={{ fontSize: 16 }} />
              </Col>
              <Col span={8}>
                <Statistic title="Đang giao" value={35} valueStyle={{ fontSize: 16, color: "#f59e0b" }} />
              </Col>
              <Col span={8}>
                <Statistic title="Đã hủy" value={16} valueStyle={{ fontSize: 16, color: "#ef4444" }} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

