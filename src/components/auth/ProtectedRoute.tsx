"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Spin } from "antd";
import { useAuthStore } from "@/stores/authStore";

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
  fallback = '/auth/login'
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, canAccess } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // Check if user is authenticated
      if (!isAuthenticated || !user) {
        const locale = pathname.split('/')[1] || 'vi';
        router.push(`/${locale}${fallback}`);
        return;
      }

      // Check user type
      if (requiredUserType && user.userType !== requiredUserType) {
        const locale = pathname.split('/')[1] || 'vi';
        router.push(`/${locale}/unauthorized`);
        return;
      }

      // Check role
      if (requiredRole && user.role !== requiredRole) {
        const locale = pathname.split('/')[1] || 'vi';
        router.push(`/${locale}/unauthorized`);
        return;
      }

      // Check capability
      if (requiredCapability && !canAccess(undefined, undefined, requiredCapability)) {
        const locale = pathname.split('/')[1] || 'vi';
        router.push(`/${locale}/unauthorized`);
        return;
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [isAuthenticated, user, requiredUserType, requiredRole, requiredCapability, router, pathname, fallback, canAccess]);

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return <>{children}</>;
}

