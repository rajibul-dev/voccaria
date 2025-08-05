// _hooks/useAuth.ts
"use client"; // This file contains client-side hooks

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation"; // For App Router navigation
import toast from "react-hot-toast";
import api from "@/_libs/axios"; // configured axios instance
import { User } from "@/_types/user"; // Your User interface

// --- Query Key Constants ---
const USER_QUERY_KEY = "user";

// --- 1. Get Current User Query (useUser) ---
// This hook fetches the current user's data.
// It's designed to be used globally to determine auth status.
const fetchCurrentUser = async (): Promise<User | null> => {
  try {
    const { data } = await api.get("/users/me"); // Calls /api/users/me (proxied to Express)
    // Assuming your backend returns { success: true, data: userObject }
    if (data.success && data.data) {
      return data.data;
    }
    return null; // No user data or not successful
  } catch (error: any) {
    // If the API returns a 401 (Unauthorized) or similar, it means no user is logged in.
    // We don't want to show an error toast for this, just return null.
    if (error.response?.status === 401 || error.response?.status === 403) {
      return null;
    }
    // For other errors (e.g., network issues), re-throw or handle as needed.
    console.error("Error fetching current user:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch user data.",
    );
  }
};

export const useUser = () => {
  return useQuery<User | null, Error>({
    queryKey: [USER_QUERY_KEY],
    queryFn: fetchCurrentUser,
    // staleTime: Infinity, // User data is generally stable until a mutation changes it
    // If you want to refetch on window focus, remove staleTime or set it to a low value
    staleTime: 5 * 60 * 1000, // 5 minutes stale time for user data
    retry: false, // Do not retry if the initial fetch fails (e.g., 401)
  });
};

// --- 2. Login Mutation (useLogin) ---
interface LoginCredentials {
  email: string;
  password: string;
}

const loginUser = async (credentials: LoginCredentials): Promise<User> => {
  const { data } = await api.post("/auth/login", credentials); // Calls /api/auth/login
  // Assuming your backend returns { success: true, message: "...", data: { user: userObject } }
  if (data.success && data.data?.user) {
    return data.data.user;
  }
  throw new Error(data.message || "Login failed.");
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<User, Error, LoginCredentials>({
    mutationFn: loginUser,
    onSuccess: (user) => {
      // Invalidate the user query to refetch the latest user data
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
      toast.success(`Login successful! Welcome ${user.name || "User"}!`);
      router.replace("/app"); // Redirect to the app dashboard
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "Login failed. Please check your credentials.";
      toast.error(errorMessage);
    },
  });
};

// --- 3. Register Mutation (useRegister) ---
interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

const registerUser = async (credentials: RegisterCredentials) => {
  const { data } = await api.post("/auth/register", credentials); // Calls /api/auth/register
  if (data.success) {
    return data;
  }
  throw new Error(data.message || "Registration failed.");
};

export const useRegister = () => {
  return useMutation<any, Error, RegisterCredentials>({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success(
        "Registration successful! Please check your email to verify your account.",
      );
      // No user invalidation here as user is not yet logged in/verified
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
    },
  });
};

// --- 4. Verify Email Mutation (useVerifyEmail) ---
interface VerifyEmailPayload {
  token: string;
  email: string;
}

const verifyUserEmail = async (payload: VerifyEmailPayload) => {
  const { data } = await api.post("/auth/verify-email", payload); // Calls /api/auth/verify-email
  if (data.success) {
    return data;
  }
  throw new Error(data.message || "Email verification failed.");
};

export const useVerifyEmail = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<any, Error, VerifyEmailPayload>({
    mutationFn: verifyUserEmail,
    onSuccess: () => {
      toast.success("Email verified successfully! You can now log in.");
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] }); // Invalidate user to reflect verified status if logged in
      router.replace("/auth/login"); // Redirect to login page
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "Email verification failed. Please try again.";
      toast.error(errorMessage);
    },
  });
};

// --- 5. Request New Verification Email Mutation (useResendVerificationEmail) ---
interface ResendEmailPayload {
  email: string;
}

const requestNewVerificationEmail = async (payload: ResendEmailPayload) => {
  const { data } = await api.post(
    "/auth/request-new-verification-email",
    payload,
  ); // Calls /api/auth/request-new-verification-email
  if (data.success) {
    return data;
  }
  throw new Error(data.message || "Could not resend link.");
};

export const useResendVerificationEmail = () => {
  return useMutation<any, Error, ResendEmailPayload>({
    mutationFn: requestNewVerificationEmail,
    onSuccess: () => {
      toast.success("Verification link resent!");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Could not resend link.";
      toast.error(errorMessage);
    },
  });
};

// --- 6. Forgot Password Mutation (useForgotPassword) ---
interface ForgotPasswordPayload {
  email: string;
}

const requestPasswordResetLink = async (payload: ForgotPasswordPayload) => {
  const { data } = await api.post("/auth/forgot-password", payload); // Calls /api/auth/forgot-password
  if (data.success) {
    return data;
  }
  throw new Error(data.message || "Failed to request password reset link.");
};

export const useForgotPassword = () => {
  return useMutation<any, Error, ForgotPasswordPayload>({
    mutationFn: requestPasswordResetLink,
    onSuccess: () => {
      toast.success("A password reset link has been sent to your email.");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to request password reset link.";
      toast.error(errorMessage);
    },
  });
};

// --- 7. Reset Password Mutation (useResetPassword) ---
interface ResetPasswordPayload {
  email: string;
  token: string;
  password: string;
}

const resetUserPassword = async (payload: ResetPasswordPayload) => {
  const { data } = await api.post("/auth/reset-password", payload); // Calls /api/auth/reset-password
  if (data.success) {
    return data;
  }
  throw new Error(data.message || "Failed to reset password.");
};

export const useResetPassword = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<any, Error, ResetPasswordPayload>({
    mutationFn: resetUserPassword,
    onSuccess: () => {
      toast.success(
        "Password reset successfully! You can now log in with your new password.",
      );
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] }); // Invalidate user if they were somehow logged in
      router.replace("/auth/login"); // Redirect to login page
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to reset password. Please try again.";
      toast.error(errorMessage);
    },
  });
};

// --- 8. Change Password Mutation (useChangePassword) ---
interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

const changeUserPassword = async (payload: ChangePasswordPayload) => {
  const { data } = await api.post("/auth/change-password", payload); // Calls /api/auth/change-password
  if (data.success) {
    return data;
  }
  throw new Error(data.message || "Failed to change password.");
};

export const useChangePassword = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, ChangePasswordPayload>({
    mutationFn: changeUserPassword,
    onSuccess: () => {
      toast.success("Password changed successfully!");
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] }); // Invalidate user to ensure any cached data is fresh
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to change password. Please try again.";
      toast.error(errorMessage);
    },
  });
};

// --- 9. Logout Mutation (useLogout) ---
const logoutUser = async () => {
  const { data } = await api.post("/auth/logout"); // Calls /api/auth/logout
  if (data.success) {
    return data;
  }
  throw new Error(data.message || "Logout failed.");
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<any, Error, void>({
    mutationFn: logoutUser,
    onSuccess: () => {
      // Set user data to null in the cache
      queryClient.setQueryData([USER_QUERY_KEY], null);
      // Invalidate all queries to clear any potentially sensitive cached data
      queryClient.invalidateQueries();
      toast.success("Logged out successfully!");
      router.replace("/auth/login"); // Redirect to login page after logout
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Logout failed.";
      toast.error(errorMessage);
    },
  });
};

// --- Optional: Google Auth Redirect (No TanStack Query Hook Needed) ---
// Google authentication typically involves a direct redirect from the frontend
// to your Next.js /api/auth/google endpoint, which then redirects to Google,
// and finally Google redirects back to your Next.js /api/auth/google/redirect.
// So, a simple Link or window.location.href is usually sufficient.
// Example: <a href="/api/auth/google">Login with Google</a>
