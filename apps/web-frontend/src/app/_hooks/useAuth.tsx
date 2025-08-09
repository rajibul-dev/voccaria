"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { User, AllUsersResponse } from "@/_types/user"; // Your User interface

// --- Query Key Constants ---
const USER_QUERY_KEY = "user";
const ALL_USERS_QUERY_KEY = "allUsers"; // New key for all users
const SPECIFIC_USER_QUERY_KEY = "specificUser"; // New key for specific user
const PROVIDERS_QUERY_KEY = "avatarProviders"; // Already defined

const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`/api${endpoint}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    // Your backend always sends { success: false, message: "specific error" }
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const fetchCurrentUser = async (
  cookieHeader?: string,
): Promise<User | null> => {
  try {
    const headers: Record<string, string> = {};
    let url: string;

    if (cookieHeader) {
      headers["Cookie"] = cookieHeader;
      const backendOrigin =
        process.env.EXPRESS_BACKEND_ORIGIN ||
        process.env.NEXT_PUBLIC_EXPRESS_BACKEND_ORIGIN;
      url = `${backendOrigin}/api/v1/users/me`;
    } else {
      url = "/api/users/me";
    }

    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json", ...headers },
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) return null;
      throw new Error(`HTTP ${response.status}`);
    }

    const data = JSON.parse(await response.text());
    return data.success && data.data ? data.data : null;
  } catch (error: any) {
    if (error.message?.includes("401") || error.message?.includes("403")) {
      return null;
    }
    throw new Error(error.message || "Failed to fetch user");
  }
};

export const useUser = () => {
  return useQuery<User | null, Error>({
    queryKey: [USER_QUERY_KEY],
    queryFn: () => fetchCurrentUser(),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

type LoginCredentials = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<User, Error, LoginCredentials>({
    mutationFn: async (credentials) => {
      const data = await apiCall("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
      return data.data.user;
    },
    onSuccess: (user) => {
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [PROVIDERS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [ALL_USERS_QUERY_KEY] });
      toast.success(`Welcome back, ${user.name}!`);
      router.replace("/app");
    },
    onError: (error) => toast.error(error.message),
  });
};

type RegisterCredentials = {
  name: string;
  email: string;
  password: string;
};

export const useRegister = () => {
  return useMutation<any, Error, RegisterCredentials>({
    mutationFn: async (credentials) => {
      return await apiCall("/auth/register", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
    },
    onSuccess: () => {
      toast.success("Check your email to verify your account");
    },
    onError: (error) => toast.error(error.message),
  });
};

type VerifyEmailPayload = {
  verificationToken: string;
  email: string;
};

export const useVerifyEmail = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<any, Error, VerifyEmailPayload>({
    mutationFn: async (payload) => {
      return await apiCall("/auth/verify-email", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => {
      toast.success("Email verified successfully! You can now log in.");
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
      router.replace("/auth/login");
    },
    onError: (error) => toast.error(error.message),
  });
};

type ResendEmailPayload = {
  email: string;
};

export const useResendVerificationEmail = () => {
  return useMutation<any, Error, ResendEmailPayload>({
    mutationFn: async (payload) => {
      return await apiCall("/auth/request-new-verification-email", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => toast.success("Verification link resent!"),
    onError: (error) => toast.error(error.message),
  });
};

type ForgotPasswordPayload = {
  email: string;
};

export const useForgotPassword = () => {
  return useMutation<any, Error, ForgotPasswordPayload>({
    mutationFn: async (payload) => {
      return await apiCall("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () =>
      toast.success("A password reset link has been sent to your email."),
    onError: (error) => toast.error(error.message),
  });
};

type ResetPasswordPayload = {
  email: string;
  token: string;
  password: string;
};

export const useResetPassword = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<any, Error, ResetPasswordPayload>({
    mutationFn: async (payload) => {
      return await apiCall("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => {
      toast.success(
        "Password reset successfully! You can now log in with your new password.",
      );
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
      router.replace("/auth/login");
    },
    onError: (error) => toast.error(error.message),
  });
};

type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export const useChangePassword = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, ChangePasswordPayload>({
    mutationFn: async (payload) => {
      return await apiCall("/auth/change-password", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => {
      toast.success("Password changed successfully!");
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
    },
    onError: (error) => toast.error(error.message),
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<any, Error, void>({
    mutationFn: async () => {
      return await apiCall("/auth/logout", { method: "POST" });
    },
    onSuccess: () => {
      queryClient.setQueryData([USER_QUERY_KEY], null);
      queryClient.invalidateQueries();
      toast.success("Logged out successfully", { icon: "👋" });
      router.replace("/auth/login");
    },
    onError: (error) => toast.error(error.message),
  });
};

type UpdateProfilePayload = {
  name: string;
  bio?: string;
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, UpdateProfilePayload>({
    mutationFn: async (payload) => {
      const data = await apiCall("/users/me", {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      return data.data.user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
      toast.success("Profile updated successfully!");
    },
    onError: (error) => toast.error(error.message),
  });
};

export const useAvatarProviders = () => {
  return useQuery<string[], Error>({
    queryKey: [PROVIDERS_QUERY_KEY],
    queryFn: async () => {
      try {
        const data = await apiCall("/users/me/providers", { method: "GET" });
        return Array.isArray(data.data) ? data.data : [];
      } catch (error) {
        return []; // Return empty array on error, don't show toast for UI options
      }
    },
    staleTime: 60 * 60 * 1000, // 1 hour
    retry: false,
  });
};

type UpdateAvatarProviderPayload = {
  provider: string;
};

export const useUpdateAvatarProvider = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, UpdateAvatarProviderPayload>({
    mutationFn: async (payload) => {
      const data = await apiCall("/users/me/avatar", {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      return data.data.user;
    },
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [PROVIDERS_QUERY_KEY] });
      toast.success(
        `Avatar updated to ${updatedUser.avatars?.selected || "default"}!`,
      );
    },
    onError: (error) => toast.error(error.message),
  });
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, File>({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await fetch("/api/users/me/avatar", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const text = await response.text();
        const data = text ? JSON.parse(text) : {};
        throw new Error(data.message || "Upload failed");
      }

      const data = await response.json();
      return data.data?.user || {};
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [PROVIDERS_QUERY_KEY] });
      toast.success("Avatar uploaded successfully!");
    },
    onError: (error) => toast.error(error.message),
  });
};

export const useDeleteAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, void>({
    mutationFn: async () => {
      return await apiCall("/users/me/avatar", { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [PROVIDERS_QUERY_KEY] });
      toast.success("Avatar deleted successfully!");
    },
    onError: (error) => toast.error(error.message),
  });
};

export const useAllUsers = () => {
  return useQuery<AllUsersResponse, Error>({
    queryKey: [ALL_USERS_QUERY_KEY],
    queryFn: async () => {
      const data = await apiCall("/users", { method: "GET" });
      return data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useSpecificUser = (userId: string) => {
  return useQuery<User, Error>({
    queryKey: [SPECIFIC_USER_QUERY_KEY, userId],
    queryFn: async () => {
      const data = await apiCall(`/users/${userId}`, { method: "GET" });
      return data.data;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useDiscordDisconnect = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, void>({
    mutationFn: async () => {
      return await apiCall("/users/discord-disconnect", { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [PROVIDERS_QUERY_KEY] });
      toast.success("Discord disconnected successfully!");
    },
    onError: (error) => toast.error(error.message),
  });
};
