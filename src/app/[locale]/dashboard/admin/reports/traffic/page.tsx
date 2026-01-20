"use client";

import { useState } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Typography,
  Select,
  Table,
  Tag,
  Progress,
  Space,
} from "antd";
import {
  EyeOutlined,
  UserOutlined,
  GlobalOutlined,
  ArrowUpOutlined,
  MobileOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

const { Title } = Typography;

interface TrafficData {
  key: string;
  date: string;
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: string;
  topPage: string;
}

const mockTrafficData: TrafficData[] = [
  {
    key: "1",
    date: "2024-01-01",
    pageViews: 12500,
    uniqueVisitors: 3200,
    bounceRate: 45.2,
    avgSessionDuration: "3m 25s",
    topPage: "/",
  },
  {
    key: "2",
    date: "2024-01-02",
    pageViews: 13800,
    uniqueVisitors: 3500,
    bounceRate: 42.8,
    avgSessionDuration: "3m 45s",
    topPage: "/market",
  },
  {
    key: "3",
    date: "2024-01-03",
    pageViews: 11200,
    uniqueVisitors: 2900,
    bounceRate: 48.5,
    avgSessionDuration: "3m 10s",
    topPage: "/auction",
  },
];

export default function TrafficReportPage() {
  const [period, setPeriod] = useState("month");

  const columns: ColumnsType<TrafficData> = [
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Lượt xem",
      dataIndex: "pageViews",
      key: "pageViews",
      render: (count) => count.toLocaleString("vi-VN"),
    },
    {
      title: "Người truy cập",
      dataIndex: "uniqueVisitors",
      key: "uniqueVisitors",
      render: (count) => count.toLocaleString("vi-VN"),
    },
    {
      title: "Tỷ lệ thoát",
      dataIndex: "bounceRate",
      key: "bounceRate",
      render: (rate) => (
        <Tag color={rate < 50 ? "success" : rate < 70 ? "warning" : "error"}>
          {rate}%
        </Tag>
      ),
    },
    {
      title: "Thời gian trung bình",
      dataIndex: "avgSessionDuration",
      key: "avgSessionDuration",
    },
    {
      title: "Trang phổ biến",
      dataIndex: "topPage",
      key: "topPage",
      render: (page) => <Tag>{page}</Tag>,
    },
  ];

  const totalPageViews = mockTrafficData.reduce((sum, item) => sum + item.pageViews, 0);
  const totalVisitors = mockTrafficData.reduce((sum, item) => sum + item.uniqueVisitors, 0);
  const avgBounceRate =
    mockTrafficData.reduce((sum, item) => sum + item.bounceRate, 0) / mockTrafficData.length;

  return (
    <div>
      <Title level={2}>Báo cáo Traffic</Title>

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
              ]}
            />
          </Col>
        </Row>
      </Card>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng lượt xem"
              value={totalPageViews}
              prefix={<EyeOutlined style={{ color: "#3b82f6" }} />}
              formatter={(value) => Number(value).toLocaleString("vi-VN")}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Người truy cập"
              value={totalVisitors}
              prefix={<UserOutlined style={{ color: "#10b981" }} />}
              formatter={(value) => Number(value).toLocaleString("vi-VN")}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tỷ lệ thoát TB"
              value={avgBounceRate}
              suffix="%"
              prefix={<GlobalOutlined style={{ color: avgBounceRate < 50 ? "#10b981" : "#f59e0b" }} />}
              valueStyle={{ color: avgBounceRate < 50 ? "#10b981" : "#f59e0b" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tăng trưởng"
              value={12.5}
              prefix={<ArrowUpOutlined />}
              suffix="%"
              valueStyle={{ color: "#10b981" }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} lg={12}>
          <Card title="Thiết bị">
            <Space orientation="vertical" style={{ width: "100%" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <Space>
                    <DesktopOutlined />
                    <span>Desktop</span>
                  </Space>
                  <span>65%</span>
                </div>
                <Progress percent={65} strokeColor="#3b82f6" />
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <Space>
                    <MobileOutlined />
                    <span>Mobile</span>
                  </Space>
                  <span>35%</span>
                </div>
                <Progress percent={35} strokeColor="#10b981" />
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Nguồn traffic">
            <Space orientation="vertical" style={{ width: "100%" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span>Trực tiếp</span>
                  <span>40%</span>
                </div>
                <Progress percent={40} strokeColor="#3b82f6" />
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span>Google Search</span>
                  <span>35%</span>
                </div>
                <Progress percent={35} strokeColor="#10b981" />
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span>Social Media</span>
                  <span>20%</span>
                </div>
                <Progress percent={20} strokeColor="#8b5cf6" />
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span>Khác</span>
                  <span>5%</span>
                </div>
                <Progress percent={5} strokeColor="#f59e0b" />
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      <Card title="Chi tiết traffic">
        <Table
          columns={columns}
          dataSource={mockTrafficData}
          pagination={false}
        />
      </Card>
    </div>
  );
}

