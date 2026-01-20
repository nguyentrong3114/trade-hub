"use client";

import { useState } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Typography,
  DatePicker,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import {
  DollarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

const { Title } = Typography;
const { RangePicker } = DatePicker;

interface RevenueData {
  key: string;
  date: string;
  orders: number;
  revenue: number;
  commission: number;
  growth: number;
}

const mockRevenueData: RevenueData[] = [
  {
    key: "1",
    date: "2024-01-01",
    orders: 120,
    revenue: 50000000,
    commission: 5000000,
    growth: 12.5,
  },
  {
    key: "2",
    date: "2024-01-02",
    orders: 135,
    revenue: 56000000,
    commission: 5600000,
    growth: 15.2,
  },
  {
    key: "3",
    date: "2024-01-03",
    orders: 98,
    revenue: 42000000,
    commission: 4200000,
    growth: -8.3,
  },
];

export default function RevenueReportPage() {
  const [period, setPeriod] = useState("month");
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);

  const columns: ColumnsType<RevenueData> = [
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Số đơn",
      dataIndex: "orders",
      key: "orders",
    },
    {
      title: "Doanh thu",
      dataIndex: "revenue",
      key: "revenue",
      render: (amount) =>
        new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount),
    },
    {
      title: "Hoa hồng",
      dataIndex: "commission",
      key: "commission",
      render: (amount) =>
        new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount),
    },
    {
      title: "Tăng trưởng",
      dataIndex: "growth",
      key: "growth",
      render: (growth) => (
        <Tag color={growth > 0 ? "success" : "error"}>
          {growth > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {Math.abs(growth)}%
        </Tag>
      ),
    },
  ];

  const totalRevenue = mockRevenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalCommission = mockRevenueData.reduce((sum, item) => sum + item.commission, 0);
  const totalOrders = mockRevenueData.reduce((sum, item) => sum + item.orders, 0);
  const avgGrowth =
    mockRevenueData.reduce((sum, item) => sum + item.growth, 0) / mockRevenueData.length;

  return (
    <div>
      <Title level={2}>Báo cáo Doanh thu</Title>

      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={6}>
            <Select
              style={{ width: "100%" }}
              value={period}
              onChange={setPeriod}
              options={[
                { label: "Hôm nay", value: "today" },
                { label: "Tuần này", value: "week" },
                { label: "Tháng này", value: "month" },
                { label: "Năm này", value: "year" },
                { label: "Tùy chọn", value: "custom" },
              ]}
            />
          </Col>
          <Col xs={24} sm={12} md={12}>
            {period === "custom" && (
              <RangePicker
                style={{ width: "100%" }}
                value={dateRange}
                onChange={(dates) => setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs] | null)}
              />
            )}
          </Col>
        </Row>
      </Card>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng doanh thu"
              value={totalRevenue}
              prefix={<DollarOutlined style={{ color: "#10b981" }} />}
              formatter={(value) =>
                new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                  Number(value)
                )
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Hoa hồng"
              value={totalCommission}
              prefix={<DollarOutlined style={{ color: "#3b82f6" }} />}
              formatter={(value) =>
                new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                  Number(value)
                )
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng đơn hàng"
              value={totalOrders}
              prefix={<ShoppingCartOutlined style={{ color: "#8b5cf6" }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tăng trưởng TB"
              value={avgGrowth}
              prefix={avgGrowth > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix="%"
              valueStyle={{ color: avgGrowth > 0 ? "#10b981" : "#ef4444" }}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Chi tiết doanh thu">
        <Table
          columns={columns}
          dataSource={mockRevenueData}
          pagination={false}
        />
      </Card>
    </div>
  );
}

