"use client";

import { useState } from "react";
import {
  Card,
  Table,
  Button,
  Input,
  Tag,
  Typography,
  Select,
  DatePicker,
  Row,
  Col,
  Statistic,
} from "antd";
import type { TableProps } from "antd";
import {
  SearchOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  WalletOutlined,
  ExportOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

interface Transaction {
  key: string;
  id: string;
  type: "income" | "expense" | "withdraw" | "refund";
  description: string;
  orderId?: string;
  amount: number;
  balance: number;
  createdAt: string;
}

const mockTransactions: Transaction[] = [
  { key: "1", id: "GD001", type: "income", description: "Thanh toán đơn hàng", orderId: "DH001", amount: 34990000, balance: 125000000, createdAt: "2024-01-20 14:30" },
  { key: "2", id: "GD002", type: "expense", description: "Phí vận chuyển", orderId: "DH001", amount: -50000, balance: 124950000, createdAt: "2024-01-20 14:31" },
  { key: "3", id: "GD003", type: "income", description: "Thanh toán đơn hàng", orderId: "DH002", amount: 49990000, balance: 174940000, createdAt: "2024-01-20 10:15" },
  { key: "4", id: "GD004", type: "withdraw", description: "Rút tiền về ngân hàng", amount: -50000000, balance: 124940000, createdAt: "2024-01-19 16:00" },
  { key: "5", id: "GD005", type: "refund", description: "Hoàn tiền đơn hàng", orderId: "DH005", amount: -28980000, balance: 95960000, createdAt: "2024-01-18 11:00" },
];

export default function TransactionsPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const getTypeTag = (type: string) => {
    const typeMap: Record<string, { color: string; text: string; icon: React.ReactNode }> = {
      income: { color: "green", text: "Thu", icon: <ArrowUpOutlined /> },
      expense: { color: "orange", text: "Chi", icon: <ArrowDownOutlined /> },
      withdraw: { color: "blue", text: "Rút tiền", icon: <ArrowDownOutlined /> },
      refund: { color: "red", text: "Hoàn tiền", icon: <ArrowDownOutlined /> },
    };
    const { color, text, icon } = typeMap[type];
    return <Tag color={color} icon={icon}>{text}</Tag>;
  };

  const columns: TableProps<Transaction>["columns"] = [
    {
      title: "Mã GD",
      dataIndex: "id",
      key: "id",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (type) => getTypeTag(type),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (text, record) => (
        <div>
          <Text>{text}</Text>
          {record.orderId && (
            <>
              <br />
              <Text type="secondary" style={{ fontSize: 12 }}>
                Mã đơn: {record.orderId}
              </Text>
            </>
          )}
        </div>
      ),
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <Text strong style={{ color: amount >= 0 ? "#10b981" : "#ef4444" }}>
          {amount >= 0 ? "+" : ""}
          {amount.toLocaleString("vi-VN")}đ
        </Text>
      ),
    },
    {
      title: "Số dư",
      dataIndex: "balance",
      key: "balance",
      render: (balance) => <Text>{balance.toLocaleString("vi-VN")}đ</Text>,
    },
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  const filteredTransactions = mockTransactions.filter((t) => {
    const matchSearch = t.id.toLowerCase().includes(searchText.toLowerCase()) ||
      t.description.toLowerCase().includes(searchText.toLowerCase());
    const matchType = !selectedType || t.type === selectedType;
    return matchSearch && matchType;
  });

  const totalIncome = mockTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = mockTransactions.filter((t) => t.type !== "income").reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <Title level={4} style={{ margin: 0 }}>Lịch sử giao dịch</Title>
          <Text type="secondary">Theo dõi các giao dịch tài chính</Text>
        </div>
        <Button icon={<ExportOutlined />}>Xuất Excel</Button>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card size="small">
            <Statistic
              title="Số dư hiện tại"
              value={95960000}
              valueStyle={{ color: "#10b981" }}
              prefix={<WalletOutlined />}
              formatter={(value) => `${(Number(value) / 1000000).toFixed(1)}M đ`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card size="small">
            <Statistic
              title="Tổng thu"
              value={totalIncome}
              valueStyle={{ color: "#10b981" }}
              prefix={<ArrowUpOutlined />}
              formatter={(value) => `${(Number(value) / 1000000).toFixed(1)}M đ`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card size="small">
            <Statistic
              title="Tổng chi"
              value={totalExpense}
              valueStyle={{ color: "#ef4444" }}
              prefix={<ArrowDownOutlined />}
              formatter={(value) => `${(Number(value) / 1000000).toFixed(1)}M đ`}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <div style={{ marginBottom: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Input
            placeholder="Tìm kiếm giao dịch..."
            prefix={<SearchOutlined />}
            style={{ width: 250 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Select
            placeholder="Loại giao dịch"
            style={{ width: 150 }}
            allowClear
            onChange={setSelectedType}
            options={[
              { value: "income", label: "Thu" },
              { value: "expense", label: "Chi" },
              { value: "withdraw", label: "Rút tiền" },
              { value: "refund", label: "Hoàn tiền" },
            ]}
          />
          <RangePicker />
        </div>

        <Table
          columns={columns}
          dataSource={filteredTransactions}
          pagination={{ pageSize: 10, showTotal: (total) => `Tổng ${total} giao dịch` }}
        />
      </Card>
    </div>
  );
}

