import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  userType: 'admin' | 'business' | 'user';
  role?: string;
  capabilities?: string[];
  status: string;
  fullName?: string;
  companyName?: string;
  companyId?: string;
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
  isCompanyManager: () => boolean;
  canAccess: (requiredUserType?: string, requiredRole?: string, requiredCapability?: string) => boolean;
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
        // Clear localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth-storage');
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      },

      updateUser: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null
        }));
      },

      hasCapability: (capability) => {
        const { user } = get();
        if (!user) return false;
        
        // Super admin has all capabilities
        if (user.role === 'super_admin') return true;
        
        return user.capabilities?.includes(capability) ?? false;
      },

      isAdmin: () => {
        const { user } = get();
        return user?.userType === 'admin';
      },

      isCompanyOwner: () => {
        const { user } = get();
        return user?.userType === 'business' && user?.role === 'company_owner';
      },

      isCompanyManager: () => {
        const { user } = get();
        return user?.userType === 'business' && user?.role === 'company_manager';
      },

      canAccess: (requiredUserType, requiredRole, requiredCapability) => {
        const { user } = get();
        if (!user) return false;
        
        if (requiredUserType && user.userType !== requiredUserType) {
          return false;
        }
        
        if (requiredRole && user.role !== requiredRole) {
          return false;
        }
        
        if (requiredCapability && !get().hasCapability(requiredCapability)) {
          return false;
        }
        
        return true;
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

