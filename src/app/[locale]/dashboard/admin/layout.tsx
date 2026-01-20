"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useParams, useRouter } from "next/navigation";
import { ConfigProvider, Layout, Menu, Avatar, Dropdown, Badge, Button, theme } from "antd";
import type { MenuProps } from "antd";
import { useAuthStore } from "@/stores/authStore";
// TODO: Uncomment khi có authentication thực tế
// import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  SettingOutlined,
  BellOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  GlobalOutlined,
  SafetyCertificateOutlined,
  FileTextOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const { user, logout } = useAuthStore();
  
  // TODO: Xóa khi có authentication thực tế
  // Mock user để hiển thị UI khi chưa login
  const displayUser = user || {
    fullName: "Admin",
    email: "admin@b2b.com",
    userType: "admin" as const,
    role: "super_admin",
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: <Link href={`/${locale}/dashboard/admin`}>Dashboard</Link>,
    },
    {
      key: "users",
      icon: <UserOutlined />,
      label: "Quản lý Users",
      children: [
        { key: "users-list", label: <Link href={`/${locale}/dashboard/admin/users`}>Danh sách Users</Link> },
        { key: "users-permissions", label: <Link href={`/${locale}/dashboard/admin/users/permissions`}>Cấp quyền</Link> },
        { key: "users-pending", label: <Link href={`/${locale}/dashboard/admin/users/pending`}>Chờ duyệt</Link> },
        { key: "users-banned", label: <Link href={`/${locale}/dashboard/admin/users/banned`}>Bị cấm</Link> },
      ],
    },
    {
      key: "companies",
      icon: <ShopOutlined />,
      label: "Quản lý Company",
      children: [
        { key: "companies-list", label: <Link href={`/${locale}/dashboard/admin/companies`}>Danh sách</Link> },
        { key: "companies-verify", label: <Link href={`/${locale}/dashboard/admin/companies/verify`}>Xác minh</Link> },
      ],
    },
    {
      key: "orders",
      icon: <ShoppingCartOutlined />,
      label: <Link href={`/${locale}/dashboard/admin/orders`}>Đơn hàng</Link>,
    },
    {
      key: "reports",
      icon: <BarChartOutlined />,
      label: "Báo cáo",
      children: [
        { key: "reports-revenue", label: <Link href={`/${locale}/dashboard/admin/reports/revenue`}>Doanh thu</Link> },
        { key: "reports-users", label: <Link href={`/${locale}/dashboard/admin/reports/users`}>Người dùng</Link> },
        { key: "reports-traffic", label: <Link href={`/${locale}/dashboard/admin/reports/traffic`}>Traffic</Link> },
      ],
    },
    {
      key: "content",
      icon: <FileTextOutlined />,
      label: "Nội dung",
      children: [
        { key: "content-blog", label: <Link href={`/${locale}/dashboard/admin/content/blog`}>Blog</Link> },
        { key: "content-pages", label: <Link href={`/${locale}/dashboard/admin/content/pages`}>Trang</Link> },
      ],
    },
    {
      key: "support",
      icon: <CustomerServiceOutlined />,
      label: <Link href={`/${locale}/dashboard/admin/support`}>Hỗ trợ</Link>,
    },
    { type: "divider" },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: <Link href={`/${locale}/dashboard/admin/settings`}>Cài đặt</Link>,
    },
  ];

  const handleLogout = () => {
    logout();
    router.push(`/${locale}/auth/login`);
  };

  const userMenuItems: MenuProps["items"] = [
    { key: "profile", icon: <UserOutlined />, label: "Hồ sơ" },
    { key: "settings", icon: <SettingOutlined />, label: "Cài đặt" },
    { type: "divider" },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      onClick: handleLogout,
      danger: true,
    },
  ];

  // TODO: Uncomment khi có authentication thực tế
  // return (
  //   <ProtectedRoute requiredUserType="admin">
  //     <ConfigProvider
  return (
    <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#dc2626",
            borderRadius: 8,
          },
          algorithm: theme.defaultAlgorithm,
        }}
      >
        <Layout style={{ minHeight: "100vh" }}>
        {/* Sidebar */}
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={260}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            background: "#001529",
          }}
        >
          {/* Logo */}
          <div
            style={{
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "flex-start",
              padding: collapsed ? 0 : "0 24px",
              background: "rgba(255,255,255,0.05)",
            }}
          >
            <SafetyCertificateOutlined style={{ fontSize: 28, color: "#dc2626" }} />
            {!collapsed && (
              <span style={{ marginLeft: 12, color: "#fff", fontSize: 18, fontWeight: 700 }}>
                Admin Panel
              </span>
            )}
          </div>

          {/* Menu */}
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["dashboard"]}
            defaultOpenKeys={["users", "companies"]}
            items={menuItems}
            style={{ borderRight: 0 }}
          />
        </Sider>

        {/* Main Layout */}
        <Layout style={{ marginLeft: collapsed ? 80 : 260, transition: "all 0.2s" }}>
          {/* Header */}
          <Header
            style={{
              padding: "0 24px",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
              position: "sticky",
              top: 0,
              zIndex: 100,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{ fontSize: 18 }}
              />
              <span style={{ fontSize: 16, fontWeight: 600, color: "#1f2937" }}>
                Admin Dashboard
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {/* Back to Website */}
              <Link href={`/${locale}`}>
                <Button icon={<GlobalOutlined />}>Về Website</Button>
              </Link>

              {/* Notifications */}
              <Badge count={5} size="small">
                <Button type="text" icon={<BellOutlined style={{ fontSize: 20 }} />} />
              </Badge>

              {/* User Dropdown */}
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
                <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                  <Avatar style={{ backgroundColor: "#dc2626" }}>
                    {displayUser?.fullName?.charAt(0) || displayUser?.email?.charAt(0) || "A"}
                  </Avatar>
                  <span style={{ fontWeight: 500 }}>{displayUser?.fullName || displayUser?.email || "Admin"}</span>
                </div>
              </Dropdown>
            </div>
          </Header>

          {/* Content */}
          <Content
            style={{
              margin: 24,
              minHeight: "calc(100vh - 64px - 48px)",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
    // </ProtectedRoute>
    // );
  );
}

