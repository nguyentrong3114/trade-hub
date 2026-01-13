"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Card,
  Table,
  Button,
  Input,
  Tag,
  Space,
  Dropdown,
  Typography,
  Row,
  Col,
  Statistic,
  Select,
  Modal,
  message,
  Image,
  Avatar,
} from "antd";
import type { MenuProps, TableProps } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  MoreOutlined,
  FileTextOutlined,
  LikeOutlined,
  CommentOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

interface BlogPost {
  key: string;
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  author: string;
  views: number;
  likes: number;
  comments: number;
  status: "published" | "draft" | "scheduled";
  publishedAt: string;
}

const mockPosts: BlogPost[] = [
  {
    key: "1",
    id: "BL001",
    title: "Xu hướng công nghệ 2024: AI và Machine Learning",
    thumbnail: "/img/section1.jpg",
    category: "Công nghệ",
    author: "Nguyễn Văn A",
    views: 1250,
    likes: 89,
    comments: 23,
    status: "published",
    publishedAt: "2024-01-20",
  },
  {
    key: "2",
    id: "BL002",
    title: "Hướng dẫn sử dụng sản phẩm hiệu quả",
    thumbnail: "/img/section2.jpg",
    category: "Hướng dẫn",
    author: "Trần Thị B",
    views: 856,
    likes: 45,
    comments: 12,
    status: "published",
    publishedAt: "2024-01-18",
  },
  {
    key: "3",
    id: "BL003",
    title: "Tin tức cập nhật từ công ty",
    thumbnail: "/img/section3.jpg",
    category: "Tin tức",
    author: "Lê Văn C",
    views: 0,
    likes: 0,
    comments: 0,
    status: "draft",
    publishedAt: "",
  },
  {
    key: "4",
    id: "BL004",
    title: "Sự kiện ra mắt sản phẩm mới",
    thumbnail: "/img/section4.jpg",
    category: "Sự kiện",
    author: "Phạm Thị D",
    views: 0,
    likes: 0,
    comments: 0,
    status: "scheduled",
    publishedAt: "2024-02-01",
  },
];

export default function BlogPage() {
  const params = useParams();
  const locale = params.locale as string;
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc chắn muốn xóa bài viết ${id}?`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        message.success("Đã xóa bài viết thành công!");
      },
    });
  };

  const getStatusTag = (status: string) => {
    switch (status) {
      case "published":
        return <Tag color="green">Đã đăng</Tag>;
      case "draft":
        return <Tag color="default">Bản nháp</Tag>;
      case "scheduled":
        return <Tag color="blue">Lên lịch</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  const actionItems = (record: BlogPost): MenuProps["items"] => [
    { key: "view", label: "Xem bài viết", icon: <EyeOutlined /> },
    { key: "edit", label: "Chỉnh sửa", icon: <EditOutlined /> },
    { type: "divider" },
    {
      key: "delete",
      label: "Xóa",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => handleDelete(record.id),
    },
  ];

  const columns: TableProps<BlogPost>["columns"] = [
    {
      title: "Bài viết",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Image
            src={record.thumbnail}
            alt={text}
            width={80}
            height={50}
            style={{ borderRadius: 8, objectFit: "cover" }}
            fallback="/img/section1.jpg"
          />
          <div>
            <Text strong style={{ display: "block", maxWidth: 300 }} ellipsis>
              {text}
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {record.id}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
      render: (text) => (
        <Space>
          <Avatar size="small" style={{ backgroundColor: "#10b981" }}>
            {text.charAt(0)}
          </Avatar>
          {text}
        </Space>
      ),
    },
    {
      title: "Thống kê",
      key: "stats",
      render: (_, record) => (
        <Space size="middle">
          <Text type="secondary">
            <EyeOutlined /> {record.views}
          </Text>
          <Text type="secondary">
            <LikeOutlined /> {record.likes}
          </Text>
          <Text type="secondary">
            <CommentOutlined /> {record.comments}
          </Text>
        </Space>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusTag(status),
    },
    {
      title: "Ngày đăng",
      dataIndex: "publishedAt",
      key: "publishedAt",
      render: (text) => text || "-",
    },
    {
      title: "",
      key: "action",
      width: 50,
      render: (_, record) => (
        <Dropdown menu={{ items: actionItems(record) }} trigger={["click"]}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const filteredPosts = mockPosts.filter((post) => {
    const matchSearch = post.title.toLowerCase().includes(searchText.toLowerCase());
    const matchCategory = !selectedCategory || post.category === selectedCategory;
    const matchStatus = !selectedStatus || post.status === selectedStatus;
    return matchSearch && matchCategory && matchStatus;
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <Title level={4} style={{ margin: 0 }}>Quản lý Blog</Title>
          <Text type="secondary">Quản lý tất cả bài viết của công ty</Text>
        </div>
        <Link href={`/${locale}/dashboard/company/blog/add`}>
          <Button type="primary" icon={<PlusOutlined />}>
            Viết bài mới
          </Button>
        </Link>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={12} sm={6}>
          <Card size="small">
            <Statistic
              title="Tổng bài viết"
              value={mockPosts.length}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small">
            <Statistic
              title="Đã đăng"
              value={mockPosts.filter((p) => p.status === "published").length}
              valueStyle={{ color: "#10b981" }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small">
            <Statistic
              title="Tổng lượt xem"
              value={mockPosts.reduce((sum, p) => sum + p.views, 0)}
              prefix={<EyeOutlined />}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small">
            <Statistic
              title="Tổng tương tác"
              value={mockPosts.reduce((sum, p) => sum + p.likes + p.comments, 0)}
              prefix={<LikeOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <div style={{ marginBottom: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Input
            placeholder="Tìm kiếm bài viết..."
            prefix={<SearchOutlined />}
            style={{ width: 250 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Select
            placeholder="Danh mục"
            style={{ width: 150 }}
            allowClear
            onChange={setSelectedCategory}
            options={[
              { value: "Công nghệ", label: "Công nghệ" },
              { value: "Hướng dẫn", label: "Hướng dẫn" },
              { value: "Tin tức", label: "Tin tức" },
              { value: "Sự kiện", label: "Sự kiện" },
            ]}
          />
          <Select
            placeholder="Trạng thái"
            style={{ width: 150 }}
            allowClear
            onChange={setSelectedStatus}
            options={[
              { value: "published", label: "Đã đăng" },
              { value: "draft", label: "Bản nháp" },
              { value: "scheduled", label: "Lên lịch" },
            ]}
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredPosts}
          pagination={{
            pageSize: 10,
            showTotal: (total) => `Tổng ${total} bài viết`,
          }}
        />
      </Card>
    </div>
  );
}

