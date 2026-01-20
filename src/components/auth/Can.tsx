"use client";

import { useAuthStore } from "@/stores/authStore";

interface CanProps {
  capability?: string;
  userType?: 'admin' | 'business' | 'user';
  role?: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function Can({ capability, userType, role, children, fallback = null }: CanProps) {
  const { user, hasCapability, canAccess } = useAuthStore();

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

