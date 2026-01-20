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
  Table,
  Tag,
  Progress,
  Space,
} from "antd";
import {
  UserOutlined,
  TeamOutlined,
  ShopOutlined,
  ArrowUpOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

const { Title } = Typography;
const { RangePicker } = DatePicker;

interface UserReportData {
  key: string;
  date: string;
  newUsers: number;
  newCompanies: number;
  activeUsers: number;
  totalUsers: number;
  growth: number;
}

const mockUserReportData: UserReportData[] = [
  {
    key: "1",
    date: "2024-01-01",
    newUsers: 45,
    newCompanies: 5,
    activeUsers: 1200,
    totalUsers: 12845,
    growth: 5.2,
  },
  {
    key: "2",
    date: "2024-01-02",
    newUsers: 52,
    newCompanies: 7,
    activeUsers: 1350,
    totalUsers: 12904,
    growth: 6.1,
  },
  {
    key: "3",
    date: "2024-01-03",
    newUsers: 38,
    newCompanies: 4,
    activeUsers: 1180,
    totalUsers: 12946,
    growth: 4.8,
  },
];

export default function UsersReportPage() {
  const [period, setPeriod] = useState("month");

  const columns: ColumnsType<UserReportData> = [
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "User mới",
      dataIndex: "newUsers",
      key: "newUsers",
      render: (count) => <Tag color="blue">{count}</Tag>,
    },
    {
      title: "Company mới",
      dataIndex: "newCompanies",
      key: "newCompanies",
      render: (count) => <Tag color="green">{count}</Tag>,
    },
    {
      title: "Người dùng hoạt động",
      dataIndex: "activeUsers",
      key: "activeUsers",
    },
    {
      title: "Tổng người dùng",
      dataIndex: "totalUsers",
      key: "totalUsers",
    },
    {
      title: "Tăng trưởng",
      dataIndex: "growth",
      key: "growth",
      render: (growth) => (
        <Tag color="success">
          <ArrowUpOutlined /> {growth}%
        </Tag>
      ),
    },
  ];

  const totalNewUsers = mockUserReportData.reduce((sum, item) => sum + item.newUsers, 0);
  const totalNewCompanies = mockUserReportData.reduce((sum, item) => sum + item.newCompanies, 0);
  const avgActiveUsers =
    mockUserReportData.reduce((sum, item) => sum + item.activeUsers, 0) /
    mockUserReportData.length;
  const latestTotal = mockUserReportData[mockUserReportData.length - 1]?.totalUsers || 0;

  return (
    <div>
      <Title level={2}>Báo cáo Người dùng</Title>

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
              title="Tổng người dùng"
              value={latestTotal}
              prefix={<UserOutlined style={{ color: "#3b82f6" }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="User mới"
              value={totalNewUsers}
              prefix={<UserOutlined style={{ color: "#10b981" }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Company mới"
              value={totalNewCompanies}
              prefix={<ShopOutlined style={{ color: "#8b5cf6" }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Hoạt động trung bình"
              value={Math.round(avgActiveUsers)}
              prefix={<TeamOutlined style={{ color: "#f59e0b" }} />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} lg={12}>
          <Card title="Phân bổ người dùng">
            <Space orientation="vertical" style={{ width: "100%" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span>User thường</span>
                  <span>85%</span>
                </div>
                <Progress percent={85} strokeColor="#3b82f6" />
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span>Company</span>
                  <span>15%</span>
                </div>
                <Progress percent={15} strokeColor="#10b981" />
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Trạng thái người dùng">
            <Space orientation="vertical" style={{ width: "100%" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <Space>
                    <CheckCircleOutlined style={{ color: "#10b981" }} />
                    <span>Hoạt động</span>
                  </Space>
                  <span>92%</span>
                </div>
                <Progress percent={92} strokeColor="#10b981" />
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <Space>
                    <ClockCircleOutlined style={{ color: "#f59e0b" }} />
                    <span>Chờ duyệt</span>
                  </Space>
                  <span>5%</span>
                </div>
                <Progress percent={5} strokeColor="#f59e0b" />
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <Space>
                    <CheckCircleOutlined style={{ color: "#ef4444" }} />
                    <span>Bị cấm</span>
                  </Space>
                  <span>3%</span>
                </div>
                <Progress percent={3} strokeColor="#ef4444" />
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      <Card title="Chi tiết báo cáo">
        <Table
          columns={columns}
          dataSource={mockUserReportData}
          pagination={false}
        />
      </Card>
    </div>
  );
}

