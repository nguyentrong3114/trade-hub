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
  Tag,
  Progress,
} from "antd";
import type { TableProps } from "antd";
import {
  DollarOutlined,
  RiseOutlined,
  FallOutlined,
  ShoppingCartOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

interface RevenueData {
  key: string;
  date: string;
  orders: number;
  revenue: number;
  profit: number;
  growth: number;
}

const mockRevenueData: RevenueData[] = [
  { key: "1", date: "2024-01-20", orders: 45, revenue: 125000000, profit: 25000000, growth: 15 },
  { key: "2", date: "2024-01-19", orders: 38, revenue: 98000000, profit: 19600000, growth: 8 },
  { key: "3", date: "2024-01-18", orders: 52, revenue: 156000000, profit: 31200000, growth: 22 },
  { key: "4", date: "2024-01-17", orders: 41, revenue: 112000000, profit: 22400000, growth: -5 },
  { key: "5", date: "2024-01-16", orders: 35, revenue: 89000000, profit: 17800000, growth: -12 },
];

export default function RevenuePage() {
  const columns: TableProps<RevenueData>["columns"] = [
    { title: "Ngày", dataIndex: "date", key: "date" },
    {
      title: "Số đơn",
      dataIndex: "orders",
      key: "orders",
      render: (value) => <Text strong>{value}</Text>,
    },
    {
      title: "Doanh thu",
      dataIndex: "revenue",
      key: "revenue",
      render: (value) => (
        <Text strong style={{ color: "#10b981" }}>
          {value.toLocaleString("vi-VN")}đ
        </Text>
      ),
    },
    {
      title: "Lợi nhuận",
      dataIndex: "profit",
      key: "profit",
      render: (value) => <Text>{value.toLocaleString("vi-VN")}đ</Text>,
    },
    {
      title: "Tăng trưởng",
      dataIndex: "growth",
      key: "growth",
      render: (value) => (
        <Tag color={value >= 0 ? "green" : "red"} icon={value >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}>
          {value}%
        </Tag>
      ),
    },
  ];

  const topProducts = [
    { name: "iPhone 15 Pro Max", revenue: 349900000, percentage: 35 },
    { name: "MacBook Pro 14 M3", revenue: 249950000, percentage: 25 },
    { name: "AirPods Pro 2", revenue: 139800000, percentage: 14 },
    { name: "iPad Pro 12.9", revenue: 98970000, percentage: 10 },
    { name: "Apple Watch Ultra 2", revenue: 65970000, percentage: 7 },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <Title level={4} style={{ margin: 0 }}>Doanh thu</Title>
          <Text type="secondary">Tổng quan doanh thu cửa hàng</Text>
        </div>
        <RangePicker />
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Doanh thu tháng này"
              value={1250000000}
              precision={0}
              valueStyle={{ color: "#10b981" }}
              prefix={<DollarOutlined />}
              suffix="đ"
              formatter={(value) => `${(Number(value) / 1000000).toFixed(0)}M`}
            />
            <div style={{ marginTop: 8 }}>
              <Text type="success"><RiseOutlined /> 12.5%</Text>
              <Text type="secondary"> so với tháng trước</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Lợi nhuận"
              value={250000000}
              precision={0}
              valueStyle={{ color: "#3b82f6" }}
              prefix={<DollarOutlined />}
              formatter={(value) => `${(Number(value) / 1000000).toFixed(0)}M đ`}
            />
            <div style={{ marginTop: 8 }}>
              <Text type="success"><RiseOutlined /> 8.2%</Text>
              <Text type="secondary"> so với tháng trước</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng đơn hàng"
              value={856}
              prefix={<ShoppingCartOutlined />}
            />
            <div style={{ marginTop: 8 }}>
              <Text type="success"><RiseOutlined /> 5.8%</Text>
              <Text type="secondary"> so với tháng trước</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Giá trị đơn TB"
              value={1460000}
              precision={0}
              formatter={(value) => `${(Number(value) / 1000).toFixed(0)}K đ`}
            />
            <div style={{ marginTop: 8 }}>
              <Text type="danger"><FallOutlined /> -2.1%</Text>
              <Text type="secondary"> so với tháng trước</Text>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Doanh thu theo ngày">
            <Table
              columns={columns}
              dataSource={mockRevenueData}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Top sản phẩm bán chạy">
            {topProducts.map((product, index) => (
              <div key={index} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <Text>{product.name}</Text>
                  <Text strong>{(product.revenue / 1000000).toFixed(0)}M đ</Text>
                </div>
                <Progress percent={product.percentage} strokeColor="#10b981" size="small" />
              </div>
            ))}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

