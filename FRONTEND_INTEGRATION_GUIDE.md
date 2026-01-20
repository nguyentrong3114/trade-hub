# 🎨 TradeHub Frontend Integration Guide
## Hierarchical Permission System

> **Mục đích:** Hướng dẫn chi tiết để Frontend Developer/AI xây dựng giao diện và tích hợp hệ thống phân quyền phân cấp của TradeHub.

---

## 📋 MỤC LỤC

1. [Tổng Quan Hệ Thống](#tổng-quan-hệ-thống)
2. [Cấu Trúc Phân Quyền](#cấu-trúc-phân-quyền)
3. [API Endpoints](#api-endpoints)
4. [Authentication Flow](#authentication-flow)
5. [UI Components Cần Xây Dựng](#ui-components-cần-xây-dựng)
6. [State Management](#state-management)
7. [Route Protection](#route-protection)
8. [Ví Dụ Code](#ví-dụ-code)

---

## 🎯 TỔNG QUAN HỆ THỐNG

### Kiến Trúc 3 Cấp

```
┌─────────────────────────────────────────────────────────┐
│                    PLATFORM LEVEL                        │
│  👑 Super Admin + 👔 Platform Manager                   │
│  → Quản lý toàn bộ hệ thống, companies, users          │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                    COMPANY LEVEL                         │
│  🏢 Company Owner + 👔 Company Manager                  │
│  → Quản lý công ty, employees, stores, products        │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                    USER LEVEL                            │
│  👤 Customers + 👨‍💼 Employees                            │
│  → Mua hàng, đánh giá, hoặc làm việc cho công ty       │
└─────────────────────────────────────────────────────────┘
```

### User Types

| User Type | Mô Tả | Roles Có Thể Có |
|-----------|-------|-----------------|
| `admin` | Platform Administrator | `super_admin`, `platform_manager` |
| `business` | Company/Business Account | `company_owner`, `company_manager` |
| `user` | Regular User/Customer | `customer` hoặc employee |

---

## 🔐 CẤU TRÚC PHÂN QUYỀN

### 1. Platform Roles (Admin)

#### **Super Admin** ⭐⭐⭐⭐⭐
```json
{
  "userType": "admin",
  "role": "super_admin",
  "capabilities": ["ALL_CAPABILITIES"]
}
```

**Có thể làm:**
- ✅ Tất cả mọi thứ trong hệ thống
- ✅ Tạo/xóa companies
- ✅ Suspend/ban users
- ✅ Thay đổi cấu hình hệ thống
- ✅ Xem tất cả dữ liệu

**UI cần hiển thị:**
- Admin Dashboard với full stats
- Company Management
- User Management
- System Settings
- Platform Analytics

---

#### **Platform Manager** ⭐⭐⭐⭐
```json
{
  "userType": "admin",
  "role": "platform_manager",
  "capabilities": [
    "view_all_companies",
    "view_all_users",
    "suspend_company",
    "suspend_user",
    "moderate_content",
    "handle_disputes"
  ]
}
```

**Có thể làm:**
- ✅ Xem danh sách companies/users
- ✅ Suspend companies/users
- ✅ Kiểm duyệt nội dung
- ✅ Xử lý tranh chấp
- ❌ Xóa companies
- ❌ Thay đổi settings

**UI cần hiển thị:**
- Dashboard (read-only stats)
- Company List (view + suspend)
- User List (view + suspend)
- Content Moderation
- Dispute Management

---

### 2. Company Roles (Business)

#### **Company Owner** ⭐⭐⭐
```json
{
  "userType": "business",
  "role": "company_owner",
  "companyId": "company_123",
  "capabilities": [
    "create_employees",
    "manage_employee_roles",
    "create_stores",
    "manage_products",
    "view_financial_reports"
  ]
}
```

**Có thể làm:**
- ✅ Toàn quyền trong công ty
- ✅ Tạo/quản lý employees
- ✅ Cấp quyền cho employees
- ✅ Quản lý stores/products
- ✅ Xem báo cáo tài chính
- ❌ Truy cập công ty khác

**UI cần hiển thị:**
- Company Dashboard
- Employee Management (full CRUD)
- Store Management
- Product Management
- Order Management
- Financial Reports
- Subscription Management

---

#### **Company Manager** ⭐⭐
```json
{
  "userType": "business",
  "role": "company_manager",
  "companyId": "company_123",
  "capabilities": [
    "edit_employees",
    "manage_products",
    "manage_orders",
    "view_reports"
  ]
}
```

**Có thể làm:**
- ✅ Quản lý products/orders
- ✅ Sửa thông tin employees
- ✅ Xem báo cáo
- ❌ Tạo/xóa employees
- ❌ Cấp quyền
- ❌ Xem báo cáo tài chính

**UI cần hiển thị:**
- Company Dashboard (limited)
- Employee List (view + edit)
- Product Management
- Order Management
- Reports (non-financial)

---

### 3. User Roles

#### **Customer** ⭐
```json
{
  "userType": "user",
  "role": "customer"
}
```

**Có thể làm:**
- ✅ Mua hàng
- ✅ Đánh giá sản phẩm
- ✅ Quản lý wishlist
- ✅ Xem lịch sử đơn hàng

**UI cần hiển thị:**
- Customer Dashboard
- Product Catalog
- Shopping Cart
- Order History
- Reviews
- Wishlist

---

## 🔌 API ENDPOINTS

### Authentication

#### 1. Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "userType": "admin",
      "role": "super_admin",
      "status": "active",
      "capabilities": ["..."]
    },
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

**Frontend cần lưu:**
- `accessToken` → localStorage/cookie (cho API calls)
- `refreshToken` → httpOnly cookie (cho refresh)
- `user` object → Redux/Zustand store

---

#### 2. Get Current User
```http
GET /api/auth/me
Authorization: Bearer {accessToken}

Response:
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "admin@tradehub.com",
      "userType": "admin",
      "role": "super_admin",
      "fullName": "Super Admin",
      "status": "active",
      "capabilities": ["manage_companies", "..."]
    }
  }
}
```

**Sử dụng để:**
- Kiểm tra user đã login chưa
- Lấy thông tin user hiện tại
- Xác định role/permissions
- Hiển thị UI phù hợp

---

### Platform Admin APIs

#### 1. Dashboard Stats
```http
GET /api/admin/dashboard/stats
Authorization: Bearer {accessToken}

Response:
{
  "success": true,
  "data": {
    "stats": {
      "companies": {
        "total": 150,
        "active": 120,
        "inactive": 30
      },
      "users": {
        "total": 5000,
        "active": 4500,
        "inactive": 500
      },
      "stores": { "total": 300 },
      "products": { "total": 15000 },
      "orders": {
        "total": 25000,
        "pending": 150
      }
    }
  }
}
```

**UI Component:**
```tsx
<AdminDashboard>
  <StatCard title="Companies" total={150} active={120} />
  <StatCard title="Users" total={5000} active={4500} />
  <StatCard title="Orders" total={25000} pending={150} />
</AdminDashboard>
```

---

#### 2. Get Companies
```http
GET /api/admin/companies?status=active&search=keyword&page=1&limit=20
Authorization: Bearer {accessToken}

Response:
{
  "success": true,
  "data": {
    "data": [
      {
        "id": "company_1",
        "email": "company@example.com",
        "companyName": "ABC Corp",
        "taxCode": "123456789",
        "status": "active",
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  }
}
```

**UI Component:**
```tsx
<CompanyList>
  <SearchBar onSearch={handleSearch} />
  <FilterDropdown options={["active", "suspended", "banned"]} />
  <Table>
    {companies.map(company => (
      <CompanyRow 
        key={company.id}
        company={company}
        onSuspend={handleSuspend}
        onActivate={handleActivate}
      />
    ))}
  </Table>
  <Pagination {...pagination} />
</CompanyList>
```

---

#### 3. Suspend Company
```http
PUT /api/admin/companies/{companyId}/suspend
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "reason": "Violation of terms"
}

Response:
{
  "success": true,
  "message": "Company suspended successfully",
  "data": {
    "company": {
      "id": "company_1",
      "status": "suspended",
      "suspendedAt": "2024-01-15T10:00:00Z",
      "suspendedReason": "Violation of terms"
    }
  }
}
```

**UI Component:**
```tsx
<SuspendCompanyModal>
  <Form onSubmit={handleSuspend}>
    <TextArea 
      name="reason" 
      label="Reason for suspension"
      required
    />
    <Button type="submit">Suspend Company</Button>
  </Form>
</SuspendCompanyModal>
```

---

#### 4. Get Users
```http
GET /api/admin/users?status=active&search=keyword&page=1&limit=20
Authorization: Bearer {accessToken}

Response:
{
  "success": true,
  "data": {
    "data": [
      {
        "id": "user_1",
        "email": "user@example.com",
        "username": "john_doe",
        "fullName": "John Doe",
        "userType": "user",
        "status": "active",
        "isEmailVerified": true,
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": { "..." }
  }
}
```

---

### Company APIs

#### 1. Get Employees
```http
GET /api/employees?status=active&search=keyword&page=1&limit=20
Authorization: Bearer {accessToken}

Response:
{
  "success": true,
  "data": {
    "data": [
      {
        "id": "emp_1",
        "email": "employee@company.com",
        "fullName": "Jane Smith",
        "position": "Sales Manager",
        "role": "staff",
        "capabilities": ["create_products", "edit_products"],
        "status": "active",
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": { "..." }
  }
}
```

---

#### 2. Create Employee
```http
POST /api/employees
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "email": "newemployee@company.com",
  "password": "TempPassword123",
  "fullName": "New Employee",
  "phoneNumber": "+84123456789",
  "position": "Sales Staff",
  "department": "Sales",
  "role": "staff",
  "capabilities": [
    "create_products",
    "edit_products",
    "list_products"
  ]
}

Response:
{
  "success": true,
  "data": {
    "employee": { "..." },
    "credentials": {
      "email": "newemployee@company.com",
      "tempPassword": "TempPassword123"
    }
  }
}
```

**UI Component:**
```tsx
<CreateEmployeeForm>
  <Input name="email" type="email" required />
  <Input name="fullName" required />
  <Input name="position" required />
  <Select name="role" options={["staff", "manager"]} />
  <MultiSelect 
    name="capabilities" 
    options={availableCapabilities}
    label="Permissions"
  />
  <Button type="submit">Create Employee</Button>
</CreateEmployeeForm>
```

---

#### 3. Update Employee Capabilities
```http
PUT /api/employees/{employeeId}/capabilities
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "capabilities": [
    "create_products",
    "edit_products",
    "delete_products",
    "manage_stock"
  ]
}

Response:
{
  "success": true,
  "data": {
    "employee": {
      "id": "emp_1",
      "capabilities": ["create_products", "edit_products", "delete_products", "manage_stock"]
    }
  }
}
```

---

## 🎨 UI COMPONENTS CẦN XÂY DỰNG

### 1. Platform Admin Dashboard

```tsx
// components/admin/AdminDashboard.tsx
interface AdminDashboardProps {
  stats: {
    companies: { total: number; active: number; inactive: number };
    users: { total: number; active: number; inactive: number };
    stores: { total: number };
    products: { total: number };
    orders: { total: number; pending: number };
  };
}

export function AdminDashboard({ stats }: AdminDashboardProps) {
  return (
    <div className="admin-dashboard">
      <h1>Platform Dashboard</h1>
      
      <div className="stats-grid">
        <StatCard
          title="Companies"
          icon={<BuildingIcon />}
          total={stats.companies.total}
          active={stats.companies.active}
          inactive={stats.companies.inactive}
        />
        
        <StatCard
          title="Users"
          icon={<UsersIcon />}
          total={stats.users.total}
          active={stats.users.active}
          inactive={stats.users.inactive}
        />
        
        <StatCard
          title="Orders"
          icon={<ShoppingCartIcon />}
          total={stats.orders.total}
          pending={stats.orders.pending}
        />
      </div>
      
      <div className="charts">
        <RevenueChart />
        <UserGrowthChart />
      </div>
    </div>
  );
}
```

---

### 2. Company Management

```tsx
// components/admin/CompanyList.tsx
interface Company {
  id: string;
  email: string;
  companyName: string;
  taxCode: string;
  status: 'active' | 'suspended' | 'banned';
  createdAt: string;
}

export function CompanyList() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filters, setFilters] = useState({ status: 'all', search: '' });
  const [pagination, setPagination] = useState({ page: 1, limit: 20 });

  return (
    <div className="company-list">
      <div className="header">
        <h1>Company Management</h1>
        <SearchBar 
          value={filters.search}
          onChange={(search) => setFilters({ ...filters, search })}
        />
      </div>

      <div className="filters">
        <Select
          value={filters.status}
          onChange={(status) => setFilters({ ...filters, status })}
          options={[
            { value: 'all', label: 'All Status' },
            { value: 'active', label: 'Active' },
            { value: 'suspended', label: 'Suspended' },
            { value: 'banned', label: 'Banned' }
          ]}
        />
      </div>

      <Table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Email</th>
            <th>Tax Code</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map(company => (
            <tr key={company.id}>
              <td>{company.companyName}</td>
              <td>{company.email}</td>
              <td>{company.taxCode}</td>
              <td>
                <StatusBadge status={company.status} />
              </td>
              <td>{formatDate(company.createdAt)}</td>
              <td>
                <ActionMenu>
                  <MenuItem onClick={() => viewCompany(company.id)}>
                    View Details
                  </MenuItem>
                  {company.status === 'active' && (
                    <MenuItem onClick={() => suspendCompany(company.id)}>
                      Suspend
                    </MenuItem>
                  )}
                  {company.status === 'suspended' && (
                    <MenuItem onClick={() => activateCompany(company.id)}>
                      Activate
                    </MenuItem>
                  )}
                </ActionMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination {...pagination} onChange={setPagination} />
    </div>
  );
}
```

---

### 3. Employee Management

```tsx
// components/company/EmployeeManagement.tsx
interface Employee {
  id: string;
  email: string;
  fullName: string;
  position: string;
  role: string;
  capabilities: string[];
  status: 'active' | 'inactive';
}

export function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  return (
    <div className="employee-management">
      <div className="header">
        <h1>Employee Management</h1>
        <Button onClick={() => setShowCreateModal(true)}>
          <PlusIcon /> Add Employee
        </Button>
      </div>

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Role</th>
            <th>Permissions</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.fullName}</td>
              <td>{employee.email}</td>
              <td>{employee.position}</td>
              <td>
                <RoleBadge role={employee.role} />
              </td>
              <td>
                <CapabilitiesList capabilities={employee.capabilities} />
              </td>
              <td>
                <StatusBadge status={employee.status} />
              </td>
              <td>
                <ActionMenu>
                  <MenuItem onClick={() => editEmployee(employee)}>
                    Edit
                  </MenuItem>
                  <MenuItem onClick={() => editCapabilities(employee)}>
                    Manage Permissions
                  </MenuItem>
                  {employee.status === 'active' ? (
                    <MenuItem onClick={() => deactivateEmployee(employee.id)}>
                      Deactivate
                    </MenuItem>
                  ) : (
                    <MenuItem onClick={() => activateEmployee(employee.id)}>
                      Activate
                    </MenuItem>
                  )}
                </ActionMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showCreateModal && (
        <CreateEmployeeModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleEmployeeCreated}
        />
      )}
    </div>
  );
}
```

---

### 4. Permission Editor

```tsx
// components/company/PermissionEditor.tsx
interface PermissionEditorProps {
  employee: Employee;
  onSave: (capabilities: string[]) => void;
  onCancel: () => void;
}

export function PermissionEditor({ employee, onSave, onCancel }: PermissionEditorProps) {
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>(
    employee.capabilities
  );

  const capabilityGroups = {
    'Product Management': [
      { value: 'create_products', label: 'Create Products' },
      { value: 'edit_products', label: 'Edit Own Products' },
      { value: 'edit_others_products', label: 'Edit Others Products' },
      { value: 'delete_products', label: 'Delete Products' },
      { value: 'publish_products', label: 'Publish Products' },
      { value: 'list_products', label: 'View Products' }
    ],
    'Order Management': [
      { value: 'create_orders', label: 'Create Orders' },
      { value: 'edit_orders', label: 'Edit Orders' },
      { value: 'list_orders', label: 'View Orders' },
      { value: 'manage_order_status', label: 'Manage Order Status' }
    ],
    'Inventory': [
      { value: 'view_inventory', label: 'View Inventory' },
      { value: 'edit_inventory', label: 'Edit Inventory' },
      { value: 'manage_stock', label: 'Manage Stock' }
    ],
    'Reports': [
      { value: 'view_reports', label: 'View Reports' },
      { value: 'view_analytics', label: 'View Analytics' },
      { value: 'export_data', label: 'Export Data' }
    ]
  };

  return (
    <Modal title={`Edit Permissions: ${employee.fullName}`}>
      <div className="permission-editor">
        {Object.entries(capabilityGroups).map(([group, capabilities]) => (
          <div key={group} className="capability-group">
            <h3>{group}</h3>
            <div className="capabilities">
              {capabilities.map(cap => (
                <Checkbox
                  key={cap.value}
                  label={cap.label}
                  checked={selectedCapabilities.includes(cap.value)}
                  onChange={(checked) => {
                    if (checked) {
                      setSelectedCapabilities([...selectedCapabilities, cap.value]);
                    } else {
                      setSelectedCapabilities(
                        selectedCapabilities.filter(c => c !== cap.value)
                      );
                    }
                  }}
                />
              ))}
            </div>
          </div>
        ))}

        <div className="actions">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={() => onSave(selectedCapabilities)}>
            Save Permissions
          </Button>
        </div>
      </div>
    </Modal>
  );
}
```

---

## 🔒 ROUTE PROTECTION

### 1. Protected Route Component

```tsx
// components/auth/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: 'admin' | 'business' | 'user';
  requiredRole?: string;
  requiredCapability?: string;
  fallback?: string;
}

export function ProtectedRoute({
  children,
  requiredUserType,
  requiredRole,
  requiredCapability,
  fallback = '/login'
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to={fallback} replace />;
  }

  // Check user type
  if (requiredUserType && user.userType !== requiredUserType) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check role
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check capability
  if (requiredCapability && !user.capabilities?.includes(requiredCapability)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
```

---

### 2. Route Configuration

```tsx
// routes/index.tsx
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Platform Admin Routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute requiredUserType="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="companies" element={<CompanyList />} />
        <Route path="companies/:id" element={<CompanyDetails />} />
        <Route path="users" element={<UserList />} />
      </Route>

      {/* Company Routes */}
      <Route
        path="/company/*"
        element={
          <ProtectedRoute requiredUserType="business">
            <CompanyLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<CompanyDashboard />} />
        <Route 
          path="employees" 
          element={
            <ProtectedRoute requiredCapability="list_employees">
              <EmployeeList />
            </ProtectedRoute>
          } 
        />
        <Route path="products" element={<ProductList />} />
        <Route path="orders" element={<OrderList />} />
      </Route>

      {/* Customer Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requiredUserType="user">
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
```

---

## 📦 STATE MANAGEMENT

### 1. Auth Store (Zustand)

```tsx
// stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  userType: 'admin' | 'business' | 'user';
  role?: string;
  capabilities?: string[];
  status: string;
  fullName?: string;
  companyName?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  
  // Actions
  login: (user: User, accessToken: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  
  // Helpers
  hasCapability: (capability: string) => boolean;
  isAdmin: () => boolean;
  isCompanyOwner: () => boolean;
  canAccess: (requiredUserType?: string, requiredRole?: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,

      login: (user, accessToken) => {
        set({ user, accessToken, isAuthenticated: true });
      },

      logout: () => {
        set({ user: null, accessToken: null, isAuthenticated: false });
      },

      updateUser: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null
        }));
      },

      hasCapability: (capability) => {
        const { user } = get();
        return user?.capabilities?.includes(capability) ?? false;
      },

      isAdmin: () => {
        const { user } = get();
        return user?.userType === 'admin';
      },

      isCompanyOwner: () => {
        const { user } = get();
        return user?.userType === 'business' && user?.role === 'company_owner';
      },

      canAccess: (requiredUserType, requiredRole) => {
        const { user } = get();
        if (!user) return false;
        
        if (requiredUserType && user.userType !== requiredUserType) {
          return false;
        }
        
        if (requiredRole && user.role !== requiredRole) {
          return false;
        }
        
        return true;
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);
```

---

### 2. API Client

```tsx
// lib/apiClient.ts
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  
  return config;
});

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired - logout
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export { apiClient };
```

---

### 3. API Hooks

```tsx
// hooks/useAdminAPI.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';

export function useAdminAPI() {
  const queryClient = useQueryClient();

  // Get dashboard stats
  const useDashboardStats = () => {
    return useQuery({
      queryKey: ['admin', 'dashboard', 'stats'],
      queryFn: async () => {
        const { data } = await apiClient.get('/admin/dashboard/stats');
        return data.data;
      }
    });
  };

  // Get companies
  const useCompanies = (filters: any) => {
    return useQuery({
      queryKey: ['admin', 'companies', filters],
      queryFn: async () => {
        const { data } = await apiClient.get('/admin/companies', { params: filters });
        return data.data;
      }
    });
  };

  // Suspend company
  const useSuspendCompany = () => {
    return useMutation({
      mutationFn: async ({ companyId, reason }: { companyId: string; reason: string }) => {
        const { data } = await apiClient.put(`/admin/companies/${companyId}/suspend`, { reason });
        return data.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['admin', 'companies'] });
      }
    });
  };

  // Activate company
  const useActivateCompany = () => {
    return useMutation({
      mutationFn: async (companyId: string) => {
        const { data } = await apiClient.put(`/admin/companies/${companyId}/activate`);
        return data.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['admin', 'companies'] });
      }
    });
  };

  return {
    useDashboardStats,
    useCompanies,
    useSuspendCompany,
    useActivateCompany
  };
}
```

---

## 🎯 AUTHENTICATION FLOW

### Login Flow

```
User enters credentials
        ↓
POST /api/auth/login
        ↓
Backend validates
        ↓
Returns: user + accessToken + refreshToken
        ↓
Frontend stores:
  - accessToken → localStorage
  - refreshToken → httpOnly cookie
  - user → Zustand store
        ↓
Redirect based on userType:
  - admin → /admin/dashboard
  - business → /company/dashboard
  - user → /dashboard
```

### Permission Check Flow

```
User navigates to protected route
        ↓
ProtectedRoute component checks:
  1. Is user logged in?
  2. Does userType match?
  3. Does role match?
  4. Does user have required capability?
        ↓
If ALL checks pass → Render component
If ANY check fails → Redirect to /unauthorized
```

---

## 🎨 UI/UX GUIDELINES

### 1. Navigation Based on Role

```tsx
// components/layout/Sidebar.tsx
export function Sidebar() {
  const { user, hasCapability, isAdmin } = useAuthStore();

  return (
    <nav>
      {/* Platform Admin Menu */}
      {isAdmin() && (
        <>
          <NavItem to="/admin/dashboard" icon={<DashboardIcon />}>
            Dashboard
          </NavItem>
          <NavItem to="/admin/companies" icon={<BuildingIcon />}>
            Companies
          </NavItem>
          <NavItem to="/admin/users" icon={<UsersIcon />}>
            Users
          </NavItem>
        </>
      )}

      {/* Company Menu */}
      {user?.userType === 'business' && (
        <>
          <NavItem to="/company/dashboard" icon={<DashboardIcon />}>
            Dashboard
          </NavItem>
          
          {hasCapability('list_employees') && (
            <NavItem to="/company/employees" icon={<TeamIcon />}>
              Employees
            </NavItem>
          )}
          
          {hasCapability('list_products') && (
            <NavItem to="/company/products" icon={<BoxIcon />}>
              Products
            </NavItem>
          )}
          
          {hasCapability('list_orders') && (
            <NavItem to="/company/orders" icon={<ShoppingCartIcon />}>
              Orders
            </NavItem>
          )}
        </>
      )}

      {/* Customer Menu */}
      {user?.userType === 'user' && (
        <>
          <NavItem to="/dashboard" icon={<HomeIcon />}>
            Dashboard
          </NavItem>
          <NavItem to="/orders" icon={<ShoppingCartIcon />}>
            My Orders
          </NavItem>
          <NavItem to="/wishlist" icon={<HeartIcon />}>
            Wishlist
          </NavItem>
        </>
      )}
    </nav>
  );
}
```

---

### 2. Conditional Rendering

```tsx
// components/ConditionalRender.tsx
interface CanProps {
  capability?: string;
  userType?: 'admin' | 'business' | 'user';
  role?: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function Can({ capability, userType, role, children, fallback = null }: CanProps) {
  const { user, hasCapability } = useAuthStore();

  if (!user) return <>{fallback}</>;

  if (userType && user.userType !== userType) {
    return <>{fallback}</>;
  }

  if (role && user.role !== role) {
    return <>{fallback}</>;
  }

  if (capability && !hasCapability(capability)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// Usage:
<Can capability="delete_products">
  <Button onClick={handleDelete}>Delete Product</Button>
</Can>

<Can userType="admin">
  <AdminPanel />
</Can>
```

---

## 📱 RESPONSIVE DESIGN

### Breakpoints
```css
/* Mobile First */
--mobile: 320px;
--tablet: 768px;
--desktop: 1024px;
--wide: 1440px;
```

### Layout Structure
```
┌─────────────────────────────────────┐
│           Top Navigation            │
├──────────┬──────────────────────────┤
│          │                          │
│ Sidebar  │    Main Content          │
│          │                          │
│          │                          │
└──────────┴──────────────────────────┘
```

---

## 🎨 DESIGN TOKENS

```css
/* Colors */
--primary: #3B82F6;
--secondary: #8B5CF6;
--success: #10B981;
--warning: #F59E0B;
--error: #EF4444;
--info: #06B6D4;

/* Status Colors */
--status-active: #10B981;
--status-suspended: #F59E0B;
--status-banned: #EF4444;
--status-inactive: #6B7280;

/* Role Colors */
--role-super-admin: #8B5CF6;
--role-platform-manager: #3B82F6;
--role-company-owner: #10B981;
--role-company-manager: #06B6D4;
--role-staff: #6B7280;
--role-customer: #EC4899;
```

---

## ✅ CHECKLIST IMPLEMENTATION

### Phase 1: Authentication
- [ ] Login page
- [ ] Auth store setup
- [ ] API client with interceptors
- [ ] Protected route component
- [ ] Logout functionality

### Phase 2: Platform Admin
- [ ] Admin dashboard
- [ ] Company list & management
- [ ] User list & management
- [ ] Suspend/activate modals
- [ ] Stats cards & charts

### Phase 3: Company Management
- [ ] Company dashboard
- [ ] Employee list
- [ ] Create employee form
- [ ] Permission editor
- [ ] Employee activation/deactivation

### Phase 4: UI Components
- [ ] Navigation sidebar
- [ ] Top bar with user menu
- [ ] Data tables with pagination
- [ ] Search & filter components
- [ ] Status badges
- [ ] Action menus

### Phase 5: Polish
- [ ] Loading states
- [ ] Error handling
- [ ] Toast notifications
- [ ] Responsive design
- [ ] Dark mode support

---

## 🔗 USEFUL RESOURCES

- **API Base URL:** `http://localhost:3000/api`
- **Documentation:** `/docs/HIERARCHY_SYSTEM_IMPLEMENTATION.md`
- **Postman Collection:** [Link to collection]
- **Figma Design:** [Link to design]

---

## 💡 TIPS FOR AI FRONTEND DEVELOPER

1. **Start with Authentication** - Implement login/logout first
2. **Use TypeScript** - All interfaces are provided
3. **State Management** - Use Zustand or Redux
4. **API Calls** - Use React Query for caching
5. **Component Library** - Recommend: shadcn/ui, Ant Design, or Material-UI
6. **Testing** - Write tests for permission checks
7. **Error Handling** - Always handle 401/403 errors
8. **Loading States** - Show skeletons while loading
9. **Responsive** - Mobile-first approach
10. **Accessibility** - Use semantic HTML and ARIA labels

---

## 🎯 PRIORITY ORDER

1. **High Priority:**
   - Authentication flow
   - Platform admin dashboard
   - Company list management
   - Employee management

2. **Medium Priority:**
   - User management
   - Permission editor
   - Stats & analytics

3. **Low Priority:**
   - Dark mode
   - Advanced filters
   - Export functionality

---

**Happy Coding! 🚀**

Nếu có câu hỏi, tham khảo backend documentation hoặc liên hệ backend team.
