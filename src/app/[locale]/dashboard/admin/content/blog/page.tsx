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
  Image,
  Modal,
  message,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

const { Title } = Typography;

interface BlogPost {
  key: string;
  id: number;
  title: string;
  author: string;
  category: string;
  status: "published" | "draft" | "pending";
  views: number;
  createdAt: string;
  image?: string;
}

const mockBlogPosts: BlogPost[] = [
  {
    key: "1",
    id: 1,
    title: "Hướng dẫn đầu tư chứng khoán cho người mới",
    author: "Admin",
    category: "Tài chính",
    status: "published",
    views: 1250,
    createdAt: "2024-01-15",
  },
  {
    key: "2",
    id: 2,
    title: "Xu hướng thị trường 2024",
    author: "Expert",
    category: "Phân tích",
    status: "draft",
    views: 0,
    createdAt: "2024-01-16",
  },
  {
    key: "3",
    id: 3,
    title: "Công nghệ mới trong giao dịch",
    author: "Tech Writer",
    category: "Công nghệ",
    status: "pending",
    views: 0,
    createdAt: "2024-01-17",
  },
];

export default function ContentBlogPage() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const columns: ColumnsType<BlogPost> = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      render: (text) => <Typography.Text strong>{text}</Typography.Text>,
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      render: (category) => <Tag>{category}</Tag>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const config = {
          published: { color: "success", text: "Đã xuất bản" },
          draft: { color: "default", text: "Bản nháp" },
          pending: { color: "warning", text: "Chờ duyệt" },
        };
        const { color, text } = config[status as keyof typeof config];
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Lượt xem",
      dataIndex: "views",
      key: "views",
      render: (views) => views.toLocaleString("vi-VN"),
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
          <Button type="text" icon={<EyeOutlined />} title="Xem" />
          <Button type="text" icon={<EditOutlined />} title="Chỉnh sửa" />
          {record.status === "pending" && (
            <>
              <Button
                type="text"
                icon={<CheckCircleOutlined />}
                title="Duyệt"
                onClick={() => handleApprove(record.id)}
              />
              <Button
                type="text"
                danger
                icon={<CloseCircleOutlined />}
                title="Từ chối"
                onClick={() => handleReject(record.id)}
              />
            </>
          )}
          <Button type="text" danger icon={<DeleteOutlined />} title="Xóa" />
        </Space>
      ),
    },
  ];

  const handleApprove = (id: number) => {
    message.success("Đã duyệt bài viết");
  };

  const handleReject = (id: number) => {
    Modal.confirm({
      title: "Xác nhận từ chối",
      content: "Bạn có chắc chắn muốn từ chối bài viết này?",
      okButtonProps: { danger: true },
      onOk: () => {
        message.success("Đã từ chối bài viết");
      },
    });
  };

  const categories = ["Tài chính", "Phân tích", "Công nghệ", "Thị trường"];

  const filteredData = mockBlogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === "all" || post.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || post.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div>
      <Title level={2}>Quản lý Blog</Title>

      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Tìm kiếm theo tiêu đề..."
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
                { label: "Chờ duyệt", value: "pending" },
              ]}
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              style={{ width: "100%" }}
              value={categoryFilter}
              onChange={setCategoryFilter}
              options={[
                { label: "Tất cả danh mục", value: "all" },
                ...categories.map((cat) => ({ label: cat, value: cat })),
              ]}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Space>
              <Button type="primary">Tạo bài viết mới</Button>
              <Button>Xuất Excel</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Card title={`Danh sách bài viết (${filteredData.length})`}>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} bài viết`,
          }}
        />
      </Card>
    </div>
  );
}

