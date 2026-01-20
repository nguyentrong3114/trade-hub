"use client";

import { useState } from "react";
import {
  Card,
  Table,
  Tag,
  Space,
  Button,
  Input,
  Typography,
  Row,
  Col,
  Select,
  Modal,
  message,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

const { Title } = Typography;

interface PageData {
  key: string;
  id: number;
  title: string;
  slug: string;
  type: "static" | "dynamic";
  status: "published" | "draft";
  updatedAt: string;
  author: string;
}

const mockPages: PageData[] = [
  {
    key: "1",
    id: 1,
    title: "Trang chủ",
    slug: "/",
    type: "static",
    status: "published",
    updatedAt: "2024-01-15",
    author: "Admin",
  },
  {
    key: "2",
    id: 2,
    title: "Giới thiệu",
    slug: "/about",
    type: "static",
    status: "published",
    updatedAt: "2024-01-14",
    author: "Admin",
  },
  {
    key: "3",
    id: 3,
    title: "Liên hệ",
    slug: "/contact",
    type: "static",
    status: "published",
    updatedAt: "2024-01-13",
    author: "Admin",
  },
  {
    key: "4",
    id: 4,
    title: "Điều khoản sử dụng",
    slug: "/terms",
    type: "static",
    status: "draft",
    updatedAt: "2024-01-12",
    author: "Admin",
  },
];

export default function ContentPagesPage() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const columns: ColumnsType<PageData> = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      render: (text) => <Typography.Text strong>{text}</Typography.Text>,
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      render: (slug) => <Typography.Text code>{slug}</Typography.Text>,
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Tag color={type === "static" ? "blue" : "green"}>
          {type === "static" ? "Tĩnh" : "Động"}
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "published" ? "success" : "default"}>
          {status === "published" ? "Đã xuất bản" : "Bản nháp"}
        </Tag>
      ),
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => window.open(record.slug, "_blank")}
            title="Xem"
          />
          <Button type="text" icon={<EditOutlined />} title="Chỉnh sửa" />
          <Button type="text" danger icon={<DeleteOutlined />} title="Xóa" />
        </Space>
      ),
    },
  ];

  const filteredData = mockPages.filter((page) => {
    const matchesSearch =
      page.title.toLowerCase().includes(searchText.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === "all" || page.status === statusFilter;
    const matchesType = typeFilter === "all" || page.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div>
      <Title level={2}>Quản lý Trang</Title>

      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Tìm kiếm theo tiêu đề, slug..."
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
                { label: "Đã xuất bản", value: "published" },
                { label: "Bản nháp", value: "draft" },
              ]}
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              style={{ width: "100%" }}
              value={typeFilter}
              onChange={setTypeFilter}
              options={[
                { label: "Tất cả loại", value: "all" },
                { label: "Tĩnh", value: "static" },
                { label: "Động", value: "dynamic" },
              ]}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Space>
              <Button type="primary" icon={<PlusOutlined />}>
                Tạo trang mới
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Card title={`Danh sách trang (${filteredData.length})`}>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} trang`,
          }}
        />
      </Card>
    </div>
  );
}

