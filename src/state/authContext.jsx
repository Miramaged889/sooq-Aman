import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { getAuthUser, setAuthUser, clearAuthUser } from "../utils/storage.js";

const AuthContext = createContext();

export { AuthContext };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verificationStep, setVerificationStep] = useState(0);
  const [error, setError] = useState(null);

  // Initialize user from storage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const savedUser = getAuthUser();
        if (savedUser) {
          setUser(savedUser);
        }
      } catch (err) {
        console.error("Failed to initialize auth:", err);
        setError("Failed to load user session");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function with proper error handling
  const login = useCallback(async (phone, email, password) => {
    if (!phone && !email) {
      setError("Phone number or email is required");
      return { success: false, error: "Phone number or email is required" };
    }

    if (!password) {
      setError("Password is required");
      return { success: false, error: "Password is required" };
    }

    setLoading(true);
    setError(null);

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser = {
        id: "1",
        email: email || "user@example.com",
        phone: phone || "+968 1234 5678",
        name: "مستخدم تجريبي",
        verified: true,
        activeAds: 2,
        maxAds: 3,
        createdAt: new Date().toISOString(),
      };

      setUser(mockUser);
      setAuthUser(mockUser);
      return { success: true, user: mockUser };
    } catch {
      const errorMessage = "Login failed. Please try again.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Register function with proper error handling
  const register = useCallback(async (userData) => {
    if (!userData || !userData.email || !userData.name) {
      setError("Name and email are required");
      return { success: false, error: "Name and email are required" };
    }

    setLoading(true);
    setError(null);

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser = {
        id: "1",
        ...userData,
        verified: false,
        activeAds: 0,
        maxAds: 3,
        createdAt: new Date().toISOString(),
      };

      setUser(mockUser);
      setAuthUser(mockUser);
      setVerificationStep(1);
      return { success: true, user: mockUser };
    } catch {
      const errorMessage = "Registration failed. Please try again.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Verify code function with proper error handling
  const verifyCode = useCallback(
    async (code) => {
      if (!code) {
        setError("Verification code is required");
        return { success: false, error: "Verification code is required" };
      }

      if (!user) {
        setError("No user to verify");
        return { success: false, error: "No user to verify" };
      }

      setLoading(true);
      setError(null);

      try {
        // Mock verification
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (code === "123456") {
          const updatedUser = { ...user, verified: true };
          setUser(updatedUser);
          setAuthUser(updatedUser);
          setVerificationStep(0);
          return { success: true, user: updatedUser };
        } else {
          const errorMessage = "Invalid verification code";
          setError(errorMessage);
          return { success: false, error: errorMessage };
        }
      } catch {
        const errorMessage = "Verification failed. Please try again.";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  // Logout function
  const logout = useCallback(() => {
    setUser(null);
    setError(null);
    setVerificationStep(0);
    clearAuthUser();
  }, []);

  // Update user function
  const updateUser = useCallback(
    (updates) => {
      if (!user) return;

      try {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        setAuthUser(updatedUser);
      } catch (err) {
        console.error("Failed to update user:", err);
        setError("Failed to update user profile");
      }
    },
    [user]
  );

  // Clear error function
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Memoized context value
  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      verificationStep,
      login,
      register,
      verifyCode,
      logout,
      updateUser,
      clearError,
      isAuthenticated: !!user,
      isVerified: user?.verified || false,
    }),
    [
      user,
      loading,
      error,
      verificationStep,
      login,
      register,
      verifyCode,
      logout,
      updateUser,
      clearError,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
