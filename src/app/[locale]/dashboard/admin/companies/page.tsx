"use client";

import { useState } from "react";
import {
  Card,
  Table,
  Tag,
  Space,
  Button,
  Input,
  Avatar,
  Typography,
  Row,
  Col,
  Select,
  Modal,
  message,
  Descriptions,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

const { Title } = Typography;

interface CompanyData {
  key: string;
  id: number;
  name: string;
  email: string;
  phone: string;
  category: string;
  status: "active" | "pending" | "suspended";
  verified: boolean;
  createdAt: string;
  employees: number;
}

const mockCompanies: CompanyData[] = [
  {
    key: "1",
    id: 1,
    name: "TechNova Solutions",
    email: "contact@technova.com",
    phone: "+84 24 1234 5678",
    category: "Công nghệ",
    status: "active",
    verified: true,
    createdAt: "2024-01-10",
    employees: 500,
  },
  {
    key: "2",
    id: 2,
    name: "GreenLeaf Trading",
    email: "info@greenleaf.com",
    phone: "+84 28 9876 5432",
    category: "Thương mại",
    status: "active",
    verified: true,
    createdAt: "2024-01-09",
    employees: 1200,
  },
  {
    key: "3",
    id: 3,
    name: "NewStartup Inc",
    email: "contact@newstartup.com",
    phone: "+84 91 234 5678",
    category: "Công nghệ",
    status: "pending",
    verified: false,
    createdAt: "2024-01-20",
    employees: 10,
  },
  {
    key: "4",
    id: 4,
    name: "Suspended Corp",
    email: "info@suspended.com",
    phone: "+84 92 345 6789",
    category: "Tài chính",
    status: "suspended",
    verified: false,
    createdAt: "2024-01-05",
    employees: 50,
  },
];

export default function CompaniesListPage() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns: ColumnsType<CompanyData> = [
    {
      title: "Company",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <Avatar style={{ backgroundColor: "#10b981" }} icon={<ShopOutlined />} />
          <div>
            <Space>
              <Typography.Text strong>{text}</Typography.Text>
              {record.verified && <Tag color="success">Đã xác minh</Tag>}
            </Space>
            <br />
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              {record.email}
            </Typography.Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Ngành",
      dataIndex: "category",
      key: "category",
      render: (category) => <Tag>{category}</Tag>,
    },
    {
      title: "Nhân viên",
      dataIndex: "employees",
      key: "employees",
      render: (count) => `${count}+`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const config = {
          active: { color: "success", text: "Hoạt động" },
          pending: { color: "warning", text: "Chờ duyệt" },
          suspended: { color: "error", text: "Tạm ngưng" },
        };
        const { color, text } = config[status as keyof typeof config];
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="text" icon={<EyeOutlined />} title="Xem chi tiết" />
          <Button type="text" icon={<EditOutlined />} title="Chỉnh sửa" />
          {record.status === "pending" && (
            <Button
              type="text"
              icon={<CheckCircleOutlined />}
              title="Duyệt"
              onClick={() => handleApprove(record.id)}
            />
          )}
          {record.status === "suspended" && (
            <Button
              type="text"
              icon={<CheckCircleOutlined />}
              title="Kích hoạt"
              onClick={() => handleActivate(record.id)}
            />
          )}
          <Button type="text" danger icon={<DeleteOutlined />} title="Xóa" />
        </Space>
      ),
    },
  ];

  const handleApprove = (id: number) => {
    Modal.confirm({
      title: "Xác nhận duyệt",
      content: "Bạn có chắc chắn muốn duyệt company này?",
      onOk: () => {
        message.success("Đã duyệt company thành công");
      },
    });
  };

  const handleActivate = (id: number) => {
    Modal.confirm({
      title: "Xác nhận kích hoạt",
      content: "Bạn có chắc chắn muốn kích hoạt company này?",
      onOk: () => {
        message.success("Đã kích hoạt company");
      },
    });
  };

  const categories = ["Công nghệ", "Thương mại", "Tài chính", "Sản xuất"];

  const filteredData = mockCompanies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchText.toLowerCase()) ||
      company.email.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === "all" || company.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || company.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div>
      <Title level={2}>Quản lý Company</Title>

      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Tìm kiếm theo tên, email..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              style={{ width: "100%" }}
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { label: "Tất cả trạng thái", value: "all" },
                { label: "Hoạt động", value: "active" },
                { label: "Chờ duyệt", value: "pending" },
                { label: "Tạm ngưng", value: "suspended" },
              ]}
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              style={{ width: "100%" }}
              value={categoryFilter}
              onChange={setCategoryFilter}
              options={[
                { label: "Tất cả ngành", value: "all" },
                ...categories.map((cat) => ({ label: cat, value: cat })),
              ]}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Space>
              {selectedRowKeys.length > 0 && (
                <Button danger>Xóa đã chọn ({selectedRowKeys.length})</Button>
              )}
              <Button type="primary">Xuất Excel</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Card title={`Danh sách Company (${filteredData.length})`}>
        <Table
          columns={columns}
          dataSource={filteredData}
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} company`,
          }}
        />
      </Card>
    </div>
  );
}

