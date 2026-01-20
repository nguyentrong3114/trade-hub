"use client";

import { useState } from "react";
import {
    Card,
    Row,
    Col,
    Form,
    Select,
    DatePicker,
    Button,
    Typography,
    Space,
    Divider,
    Checkbox,
    Input,
    message,
    Steps,
    Radio,
    Alert,
} from "antd";
import {
    FileTextOutlined,
    DownloadOutlined,
    MailOutlined,
    CalendarOutlined,
    BarChartOutlined,
    UserOutlined,
    DollarOutlined,
    ShoppingCartOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

export default function CreateReportPage() {
    const [form] = Form.useForm();
    const [currentStep, setCurrentStep] = useState(0);
    const [reportType, setReportType] = useState<string>("comprehensive");
    const [loading, setLoading] = useState(false);

    const reportTypes = [
        {
            value: "comprehensive",
            label: "Báo cáo tổng hợp",
            icon: <BarChartOutlined />,
            description: "Tổng hợp toàn bộ hoạt động của hệ thống",
            color: "#3b82f6",
        },
        {
            value: "users",
            label: "Báo cáo người dùng",
            icon: <UserOutlined />,
            description: "Thống kê về người dùng và hoạt động",
            color: "#10b981",
        },
        {
            value: "revenue",
            label: "Báo cáo doanh thu",
            icon: <DollarOutlined />,
            description: "Phân tích doanh thu và tài chính",
            color: "#f59e0b",
        },
        {
            value: "orders",
            label: "Báo cáo đơn hàng",
            icon: <ShoppingCartOutlined />,
            description: "Thống kê đơn hàng và giao dịch",
            color: "#8b5cf6",
        },
    ];

    const handleGenerateReport = async (values: any) => {
        setLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        message.success("Báo cáo đã được tạo thành công!");
        setLoading(false);
        setCurrentStep(2);
    };

    const handleDownload = (format: string) => {
        message.success(`Đang tải xuống báo cáo định dạng ${format.toUpperCase()}...`);
    };

    const handleSendEmail = () => {
        message.success("Báo cáo đã được gửi qua email!");
    };

    const steps = [
        {
            title: "Chọn loại báo cáo",
            icon: <FileTextOutlined />,
        },
        {
            title: "Cấu hình chi tiết",
            icon: <CalendarOutlined />,
        },
        {
            title: "Hoàn thành",
            icon: <CheckCircleOutlined />,
        },
    ];

    return (
        <div>
            <Title level={2}>Tạo báo cáo</Title>
            <Paragraph type="secondary">
                Tạo báo cáo tùy chỉnh về hoạt động của hệ thống
            </Paragraph>

            <Steps current={currentStep} items={steps} style={{ marginBottom: 32 }} />

            {currentStep === 0 && (
                <Card>
                    <Title level={4}>Chọn loại báo cáo</Title>
                    <Paragraph type="secondary">
                        Chọn loại báo cáo bạn muốn tạo
                    </Paragraph>

                    <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
                        {reportTypes.map((type) => (
                            <Col xs={24} sm={12} lg={6} key={type.value}>
                                <Card
                                    hoverable
                                    onClick={() => setReportType(type.value)}
                                    style={{
                                        borderColor: reportType === type.value ? type.color : undefined,
                                        borderWidth: reportType === type.value ? 2 : 1,
                                    }}
                                >
                                    <Space direction="vertical" style={{ width: "100%" }}>
                                        <div style={{ fontSize: 32, color: type.color }}>
                                            {type.icon}
                                        </div>
                                        <Title level={5} style={{ margin: 0 }}>
                                            {type.label}
                                        </Title>
                                        <Text type="secondary" style={{ fontSize: 12 }}>
                                            {type.description}
                                        </Text>
                                    </Space>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    <Divider />

                    <Space>
                        <Button
                            type="primary"
                            size="large"
                            onClick={() => setCurrentStep(1)}
                        >
                            Tiếp tục
                        </Button>
                    </Space>
                </Card>
            )}

            {currentStep === 1 && (
                <Card>
                    <Title level={4}>Cấu hình báo cáo</Title>
                    <Paragraph type="secondary">
                        Tùy chỉnh các thông số cho báo cáo của bạn
                    </Paragraph>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleGenerateReport}
                        initialValues={{
                            period: "month",
                            dateRange: [dayjs().subtract(30, "day"), dayjs()],
                            format: "pdf",
                            includeCharts: true,
                            includeDetails: true,
                        }}
                        style={{ marginTop: 24 }}
                    >
                        <Row gutter={16}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="Khoảng thời gian"
                                    name="period"
                                    rules={[{ required: true, message: "Vui lòng chọn khoảng thời gian" }]}
                                >
                                    <Select size="large">
                                        <Select.Option value="today">Hôm nay</Select.Option>
                                        <Select.Option value="week">Tuần này</Select.Option>
                                        <Select.Option value="month">Tháng này</Select.Option>
                                        <Select.Option value="quarter">Quý này</Select.Option>
                                        <Select.Option value="year">Năm này</Select.Option>
                                        <Select.Option value="custom">Tùy chỉnh</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="Chọn ngày cụ thể"
                                    name="dateRange"
                                    rules={[{ required: true, message: "Vui lòng chọn ngày" }]}
                                >
                                    <RangePicker
                                        size="large"
                                        style={{ width: "100%" }}
                                        format="DD/MM/YYYY"
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="Định dạng xuất"
                                    name="format"
                                    rules={[{ required: true, message: "Vui lòng chọn định dạng" }]}
                                >
                                    <Radio.Group size="large">
                                        <Radio.Button value="pdf">PDF</Radio.Button>
                                        <Radio.Button value="excel">Excel</Radio.Button>
                                        <Radio.Button value="csv">CSV</Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item label="Tùy chọn nội dung">
                                    <Space direction="vertical">
                                        <Form.Item name="includeCharts" valuePropName="checked" noStyle>
                                            <Checkbox>Bao gồm biểu đồ</Checkbox>
                                        </Form.Item>
                                        <Form.Item name="includeDetails" valuePropName="checked" noStyle>
                                            <Checkbox>Bao gồm chi tiết</Checkbox>
                                        </Form.Item>
                                        <Form.Item name="includeSummary" valuePropName="checked" noStyle>
                                            <Checkbox>Bao gồm tóm tắt</Checkbox>
                                        </Form.Item>
                                    </Space>
                                </Form.Item>
                            </Col>

                            <Col xs={24}>
                                <Form.Item label="Ghi chú (tùy chọn)" name="notes">
                                    <TextArea
                                        rows={4}
                                        placeholder="Thêm ghi chú hoặc mô tả cho báo cáo..."
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Divider />

                        <Space>
                            <Button size="large" onClick={() => setCurrentStep(0)}>
                                Quay lại
                            </Button>
                            <Button
                                type="primary"
                                size="large"
                                htmlType="submit"
                                loading={loading}
                                icon={<FileTextOutlined />}
                            >
                                Tạo báo cáo
                            </Button>
                        </Space>
                    </Form>
                </Card>
            )}

            {currentStep === 2 && (
                <Card>
                    <div style={{ textAlign: "center", padding: "40px 0" }}>
                        <CheckCircleOutlined
                            style={{ fontSize: 64, color: "#10b981", marginBottom: 16 }}
                        />
                        <Title level={3}>Báo cáo đã được tạo thành công!</Title>
                        <Paragraph type="secondary">
                            Báo cáo của bạn đã sẵn sàng để tải xuống hoặc gửi qua email
                        </Paragraph>

                        <Alert
                            message="Thông tin báo cáo"
                            description={
                                <div style={{ textAlign: "left" }}>
                                    <p><strong>Loại báo cáo:</strong> {reportTypes.find(t => t.value === reportType)?.label}</p>
                                    <p><strong>Khoảng thời gian:</strong> {form.getFieldValue("period")}</p>
                                    <p><strong>Định dạng:</strong> {form.getFieldValue("format")?.toUpperCase()}</p>
                                    <p><strong>Ngày tạo:</strong> {dayjs().format("DD/MM/YYYY HH:mm")}</p>
                                </div>
                            }
                            type="info"
                            style={{ marginTop: 24, marginBottom: 24, textAlign: "left" }}
                        />

                        <Space size="large" style={{ marginTop: 24 }}>
                            <Button
                                type="primary"
                                size="large"
                                icon={<DownloadOutlined />}
                                onClick={() => handleDownload(form.getFieldValue("format"))}
                            >
                                Tải xuống
                            </Button>
                            <Button
                                size="large"
                                icon={<MailOutlined />}
                                onClick={handleSendEmail}
                            >
                                Gửi qua Email
                            </Button>
                            <Button
                                size="large"
                                onClick={() => {
                                    setCurrentStep(0);
                                    form.resetFields();
                                }}
                            >
                                Tạo báo cáo mới
                            </Button>
                        </Space>
                    </div>
                </Card>
            )}
        </div>
    );
}
