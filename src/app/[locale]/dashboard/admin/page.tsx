"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Tag,
  Space,
  Button,
  Input,
  Avatar,
  Progress,
  Typography,
  Tabs,
  List,
  Timeline,
  Spin,
  Alert,
  DatePicker,
  Select,
  Form,
  Collapse,
  Badge,
} from "antd";
import {
  UserOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  PlusOutlined,
  FilterOutlined,
  DownloadOutlined,
  ReloadOutlined,
  ClearOutlined,
} from "@ant-design/icons";
import { Line, Column, Pie } from "@ant-design/charts";
import type { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import { message } from "antd";
// TODO: Uncomment khi backend sẵn sàng
// import { useAdminAPI } from "@/hooks/useAdminAPI";
import { useAuthStore } from "@/stores/authStore";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Panel } = Collapse;

// Types
interface UserData {
  key: string;
  id: number;
  name: string;
  email: string;
  type: "user" | "company";
  status: "active" | "pending" | "banned";
  createdAt: string;
}

interface ActivityItem {
  action: string;
  user: string;
  time: string;
  type: "success" | "warning" | "info" | "error";
}

// Mock data
const usersData: UserData[] = [
  { key: "1", id: 1, name: "Nguyễn Văn A", email: "nguyenvana@email.com", type: "user", status: "active", createdAt: "2024-01-15" },
  { key: "2", id: 2, name: "TechCorp Ltd", email: "contact@techcorp.com", type: "company", status: "pending", createdAt: "2024-01-14" },
  { key: "3", id: 3, name: "Trần Thị B", email: "tranthib@email.com", type: "user", status: "active", createdAt: "2024-01-14" },
  { key: "4", id: 4, name: "GlobalTrade Inc", email: "info@globaltrade.com", type: "company", status: "active", createdAt: "2024-01-13" },
  { key: "5", id: 5, name: "Lê Văn C", email: "levanc@email.com", type: "user", status: "banned", createdAt: "2024-01-12" },
];

const activities: ActivityItem[] = [
  { action: "Người dùng mới đăng ký", user: "Nguyễn Văn A", time: "5 phút trước", type: "success" },
  { action: "Giao dịch hoàn thành", user: "TechCorp Ltd", time: "15 phút trước", type: "info" },
  { action: "Company được phê duyệt", user: "GlobalTrade", time: "1 giờ trước", type: "success" },
  { action: "Báo cáo vi phạm", user: "Anonymous", time: "2 giờ trước", type: "warning" },
  { action: "Cập nhật hệ thống", user: "System", time: "3 giờ trước", type: "info" },
];

// Chart data
const userGrowthData = [
  { month: "T1", value: 8500, type: "Users" },
  { month: "T2", value: 9200, type: "Users" },
  { month: "T3", value: 9800, type: "Users" },
  { month: "T4", value: 10500, type: "Users" },
  { month: "T5", value: 11200, type: "Users" },
  { month: "T6", value: 12845, type: "Users" },
  { month: "T1", value: 850, type: "Companies" },
  { month: "T2", value: 920, type: "Companies" },
  { month: "T3", value: 980, type: "Companies" },
  { month: "T4", value: 1050, type: "Companies" },
  { month: "T5", value: 1120, type: "Companies" },
  { month: "T6", value: 1234, type: "Companies" },
];

const revenueData = [
  { month: "T1", revenue: 850000 },
  { month: "T2", revenue: 920000 },
  { month: "T3", revenue: 980000 },
  { month: "T4", revenue: 1050000 },
  { month: "T5", revenue: 1120000 },
  { month: "T6", revenue: 1200000 },
];

const userTypeData = [
  { type: "User thường", value: 10911 },
  { type: "Company", value: 1234 },
  { type: "Pending", value: 700 },
];

export default function AdminDashboard() {
  const locale = useLocale();
  const [searchText, setSearchText] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [form] = Form.useForm();
  const { user } = useAuthStore();
  
  // TODO: Xóa khi có authentication thực tế
  // Mock user để hiển thị UI khi chưa login
  const displayUser = user || {
    fullName: "Admin",
    email: "admin@b2b.com",
  };
  
  // Advanced filters state
  const [filters, setFilters] = useState({
    status: "all",
    type: "all",
    dateRange: null as [Dayjs, Dayjs] | null,
    role: "all",
  });
  
  // TODO: Uncomment khi backend sẵn sàng
  // const { useDashboardStats, useUsers } = useAdminAPI();
  // const { data: stats, isLoading: statsLoading, error: statsError } = useDashboardStats();
  // const { data: usersData, isLoading: usersLoading } = useUsers({ limit: 5 });
  
  // Tạm thời sử dụng mock data
  const statsLoading = false;
  const statsError = null;
  const usersLoading = false;
  
  // Filter functions
  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  
  const handleResetFilters = () => {
    setFilters({
      status: "all",
      type: "all",
      dateRange: null,
      role: "all",
    });
    setSearchText("");
    form.resetFields();
  };
  
  const handleExport = () => {
    message.info("Tính năng xuất dữ liệu sẽ được triển khai sau");
    // TODO: Implement export functionality
  };
  
  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.status !== "all") count++;
    if (filters.type !== "all") count++;
    if (filters.dateRange) count++;
    if (filters.role !== "all") count++;
    if (searchText) count++;
    return count;
  };
  
  // Filter users based on filters
  const getFilteredUsers = () => {
    let filtered = [...usersData];
    
    // Search filter
    if (searchText) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchText.toLowerCase()) ||
          user.email.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    // Status filter
    if (filters.status !== "all") {
      filtered = filtered.filter((user) => user.status === filters.status);
    }
    
    // Type filter
    if (filters.type !== "all") {
      filtered = filtered.filter((user) => user.type === filters.type);
    }
    
    // Date range filter
    if (filters.dateRange && filters.dateRange[0] && filters.dateRange[1]) {
      filtered = filtered.filter((user) => {
        const userDate = dayjs(user.createdAt);
        return (
          userDate.isAfter(filters.dateRange![0].subtract(1, "day")) &&
          userDate.isBefore(filters.dateRange![1].add(1, "day"))
        );
      });
    }
    
    return filtered;
  };

  const columns: ColumnsType<UserData> = [
    {
      title: "Người dùng",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <Avatar style={{ backgroundColor: record.type === "company" ? "#10b981" : "#3b82f6" }}>
            {text.charAt(0)}
          </Avatar>
          <div>
            <Text strong>{text}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>{record.email}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Tag color={type === "company" ? "green" : "blue"}>
          {type === "company" ? "Company" : "User"}
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const config = {
          active: { color: "success", icon: <CheckCircleOutlined />, text: "Hoạt động" },
          pending: { color: "warning", icon: <ClockCircleOutlined />, text: "Chờ duyệt" },
          banned: { color: "error", icon: <DeleteOutlined />, text: "Bị cấm" },
        };
        const { color, icon, text } = config[status as keyof typeof config];
        return <Tag color={color} icon={icon}>{text}</Tag>;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Hành động",
      key: "action",
      render: () => (
        <Space>
          <Button type="text" icon={<EyeOutlined />} />
          <Button type="text" icon={<EditOutlined />} />
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Welcome Banner */}
      <Card
        style={{
          marginBottom: 24,
          background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
          border: "none",
        }}
      >
        <Row align="middle" justify="space-between">
          <Col>
            <Title level={3} style={{ color: "#fff", margin: 0 }}>
              Chào mừng trở lại, {displayUser?.fullName || "Admin"}! 👋
            </Title>
            <Text style={{ color: "rgba(255,255,255,0.85)" }}>
              Đây là tổng quan hoạt động hệ thống hôm nay.
            </Text>
          </Col>
          <Col>
            <Link href={`/${locale}/dashboard/admin/reports/create`}>
              <Button type="primary" ghost icon={<PlusOutlined />}>
                Tạo báo cáo
              </Button>
            </Link>
          </Col>
        </Row>
      </Card>

      {/* Statistics */}
      {/* TODO: Uncomment khi backend sẵn sàng */}
      {/* {statsError && (
        <Alert
          message="Lỗi tải dữ liệu"
          description="Không thể tải thống kê từ server. Đang sử dụng dữ liệu mẫu."
          type="warning"
          showIcon
          style={{ marginBottom: 24 }}
        />
      )} */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            {/* {statsLoading ? (
              <Spin />
            ) : ( */}
              <Statistic
                title="Tổng người dùng"
                value={12845}
                prefix={<UserOutlined style={{ color: "#3b82f6" }} />}
                suffix={
                  <Text type="success" style={{ fontSize: 14 }}>
                    <ArrowUpOutlined /> 12.5%
                  </Text>
                }
              />
            {/* )} */}
            <Progress percent={75} showInfo={false} strokeColor="#3b82f6" size="small" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="Company đăng ký"
              value={1234}
              prefix={<ShopOutlined style={{ color: "#10b981" }} />}
              suffix={
                <Text type="success" style={{ fontSize: 14 }}>
                  <ArrowUpOutlined /> 8.2%
                </Text>
              }
            />
            <Progress percent={60} showInfo={false} strokeColor="#10b981" size="small" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="Giao dịch"
              value={45678}
              prefix={<ShoppingCartOutlined style={{ color: "#8b5cf6" }} />}
              suffix={
                <Text type="success" style={{ fontSize: 14 }}>
                  <ArrowUpOutlined /> 23.1%
                </Text>
              }
            />
            <Progress percent={85} showInfo={false} strokeColor="#8b5cf6" size="small" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="Doanh thu"
              value={1200000}
              prefix={<DollarOutlined style={{ color: "#f59e0b" }} />}
              suffix={
                <Text type="danger" style={{ fontSize: 14 }}>
                  <ArrowDownOutlined /> 2.4%
                </Text>
              }
            />
            <Progress percent={45} showInfo={false} strokeColor="#f59e0b" size="small" />
          </Card>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="Tăng trưởng người dùng" bordered={false}>
            <Line
              data={userGrowthData}
              xField="month"
              yField="value"
              seriesField="type"
              smooth
              animation={{
                appear: {
                  animation: "path-in",
                  duration: 1000,
                },
              }}
              color={["#3b82f6", "#10b981"]}
              legend={{
                position: "top",
              }}
              tooltip={{
                formatter: (datum: any) => {
                  return {
                    name: datum.type,
                    value: datum.value?.toLocaleString("vi-VN"),
                  };
                },
              }}
              yAxis={{
                label: {
                  formatter: (v: string) => `${Number(v).toLocaleString("vi-VN")}`,
                },
              }}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Doanh thu theo tháng" bordered={false}>
            <Column
              data={revenueData}
              xField="month"
              yField="revenue"
              columnStyle={{
                radius: [8, 8, 0, 0],
              }}
              color="#f59e0b"
              animation={{
                appear: {
                  animation: "scale-in-y",
                  duration: 1000,
                },
              }}
              tooltip={{
                formatter: (datum: any) => {
                  return {
                    name: "Doanh thu",
                    value: `${datum.revenue.toLocaleString("vi-VN")} VNĐ`,
                  };
                },
              }}
              yAxis={{
                label: {
                  formatter: (v: string) => `${(Number(v) / 1000).toFixed(0)}K`,
                },
              }}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Phân bổ người dùng" bordered={false}>
            <Pie
              data={userTypeData}
              angleField="value"
              colorField="type"
              radius={0.8}
              innerRadius={0.6}
              label={{
                type: "spider",
                labelHeight: 28,
                content: "{name}\n{percentage}",
              }}
              color={["#3b82f6", "#10b981", "#f59e0b"]}
              animation={{
                appear: {
                  animation: "fade-in",
                  duration: 1000,
                },
              }}
              statistic={{
                title: {
                  content: "Tổng",
                  style: {
                    fontSize: "14px",
                  },
                },
                content: {
                  content: userTypeData.reduce((sum, item) => sum + item.value, 0).toLocaleString("vi-VN"),
                  style: {
                    fontSize: "20px",
                    fontWeight: "bold",
                  },
                },
              }}
              legend={{
                position: "bottom",
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Row gutter={[16, 16]}>
        {/* Users Table */}
        <Col xs={24} lg={16}>
          {/* Advanced Filters */}
          <Card
            style={{ marginBottom: 16 }}
            bodyStyle={{ padding: "12px 16px" }}
          >
            <Row gutter={[12, 12]} align="middle">
              <Col xs={24} sm={12} md={8}>
                <Input
                  placeholder="Tìm kiếm tên, email..."
                  prefix={<SearchOutlined />}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  allowClear
                />
              </Col>
              <Col xs={24} sm={12} md={4}>
                <Select
                  style={{ width: "100%" }}
                  placeholder="Trạng thái"
                  value={filters.status}
                  onChange={(value) => handleFilterChange("status", value)}
                  options={[
                    { label: "Tất cả", value: "all" },
                    { label: "Hoạt động", value: "active" },
                    { label: "Chờ duyệt", value: "pending" },
                    { label: "Bị cấm", value: "banned" },
                  ]}
                />
              </Col>
              <Col xs={24} sm={12} md={4}>
                <Select
                  style={{ width: "100%" }}
                  placeholder="Loại"
                  value={filters.type}
                  onChange={(value) => handleFilterChange("type", value)}
                  options={[
                    { label: "Tất cả", value: "all" },
                    { label: "User", value: "user" },
                    { label: "Company", value: "company" },
                  ]}
                />
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Space>
                  <Button
                    icon={<FilterOutlined />}
                    onClick={() => setFiltersVisible(!filtersVisible)}
                  >
                    Bộ lọc nâng cao
                    {getActiveFiltersCount() > 0 && (
                      <Badge
                        count={getActiveFiltersCount()}
                        style={{ marginLeft: 8 }}
                      />
                    )}
                  </Button>
                  {getActiveFiltersCount() > 0 && (
                    <Button
                      icon={<ClearOutlined />}
                      onClick={handleResetFilters}
                    >
                      Xóa bộ lọc
                    </Button>
                  )}
                  <Button icon={<DownloadOutlined />} onClick={handleExport}>
                    Xuất Excel
                  </Button>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => message.info("Tính năng thêm mới sẽ được triển khai")}
                  >
                    Thêm mới
                  </Button>
                </Space>
              </Col>
            </Row>

            {/* Advanced Filters Panel */}
            {filtersVisible && (
              <Collapse
                ghost
                style={{ marginTop: 12 }}
                items={[
                  {
                    key: "1",
                    label: "Bộ lọc nâng cao",
                    children: (
                      <Form form={form} layout="vertical">
                        <Row gutter={[16, 16]}>
                          <Col xs={24} sm={12} md={8}>
                            <Form.Item label="Khoảng thời gian">
                              <RangePicker
                                style={{ width: "100%" }}
                                value={filters.dateRange}
                                onChange={(dates) =>
                                  handleFilterChange("dateRange", dates)
                                }
                                format="DD/MM/YYYY"
                                placeholder={["Từ ngày", "Đến ngày"]}
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={12} md={8}>
                            <Form.Item label="Sắp xếp theo">
                              <Select
                                style={{ width: "100%" }}
                                placeholder="Chọn tiêu chí"
                                options={[
                                  { label: "Ngày tạo (Mới nhất)", value: "createdAt_desc" },
                                  { label: "Ngày tạo (Cũ nhất)", value: "createdAt_asc" },
                                  { label: "Tên A-Z", value: "name_asc" },
                                  { label: "Tên Z-A", value: "name_desc" },
                                ]}
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={12} md={8}>
                            <Form.Item label="Số lượng hiển thị">
                              <Select
                                style={{ width: "100%" }}
                                defaultValue="10"
                                options={[
                                  { label: "10", value: "10" },
                                  { label: "25", value: "25" },
                                  { label: "50", value: "50" },
                                  { label: "100", value: "100" },
                                ]}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Form>
                    ),
                  },
                ]}
              />
            )}
          </Card>

          <Card
            title={
              <Space>
                <span>Người dùng gần đây</span>
                {getActiveFiltersCount() > 0 && (
                  <Badge count={getActiveFiltersCount()} />
                )}
              </Space>
            }
            extra={
              <Text type="secondary">
                Hiển thị {getFilteredUsers().length} / {usersData.length} người dùng
              </Text>
            }
          >
            {/* TODO: Uncomment khi backend sẵn sàng */}
            {/* {usersLoading ? (
              <Spin />
            ) : ( */}
              <Table
                columns={columns}
                dataSource={getFilteredUsers()}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showTotal: (total) => `Tổng ${total} người dùng`,
                  pageSizeOptions: ["10", "25", "50", "100"],
                }}
                size="middle"
              />
            {/* )} */}
          </Card>
        </Col>

        {/* Activity & Quick Stats */}
        <Col xs={24} lg={8}>
          <Card title="Hoạt động gần đây" style={{ marginBottom: 16 }}>
            <Timeline
              items={activities.map((item) => ({
                color: item.type === "success" ? "green" : item.type === "warning" ? "orange" : item.type === "error" ? "red" : "blue",
                content: (
                  <div>
                    <Text strong>{item.action}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {item.user} • {item.time}
                    </Text>
                  </div>
                ),
              }))}
            />
          </Card>

          <Card title="Trạng thái hệ thống">
            <List
              size="small"
              dataSource={[
                { label: "Server Status", value: "Online", status: "success" },
                { label: "Database", value: "Connected", status: "success" },
                { label: "Cache", value: "Active", status: "success" },
                { label: "Queue Jobs", value: "12 pending", status: "warning" },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <Text>{item.label}</Text>
                  <Tag color={item.status}>{item.value}</Tag>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
