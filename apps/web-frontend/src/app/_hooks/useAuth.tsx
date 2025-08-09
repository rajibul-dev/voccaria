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

// Helper function for consistent API calls with better error handling
const apiCall = async (
  endpoint: string,
  options: RequestInit = {},
): Promise<any> => {
  const url = `/api${endpoint}`;

  const response = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    let errorText;
    try {
      errorText = await response.text();
    } catch {
      errorText = "";
    }

    // Try to parse JSON error response
    let errorData;
    try {
      if (errorText) {
        errorData = JSON.parse(errorText);
      } else {
        errorData = { message: response.statusText };
      }
    } catch {
      errorData = { message: response.statusText || "Unknown error" };
    }

    // Create user-friendly error messages based on status codes
    let userFriendlyMessage;
    switch (response.status) {
      case 400:
        userFriendlyMessage =
          errorData.message || "Invalid request. Please check your input.";
        break;
      case 401:
        userFriendlyMessage = errorData.message || "Invalid email or password.";
        break;
      case 403:
        userFriendlyMessage =
          errorData.message || "Access denied. Please check your permissions.";
        break;
      case 404:
        userFriendlyMessage = errorData.message || "Resource not found.";
        break;
      case 409:
        userFriendlyMessage =
          errorData.message || "This resource already exists.";
        break;
      case 422:
        userFriendlyMessage =
          errorData.message || "Please check your input and try again.";
        break;
      case 429:
        userFriendlyMessage =
          errorData.message || "Too many requests. Please wait a moment.";
        break;
      case 500:
        userFriendlyMessage = "Server error. Please try again later.";
        break;
      default:
        userFriendlyMessage =
          errorData.message || `Something went wrong (${response.status}).`;
    }

    throw new Error(userFriendlyMessage);
  }

  // Handle JSON parsing with better error handling
  let data;
  try {
    const responseText = await response.text();

    if (!responseText) {
      data = {};
    } else {
      data = JSON.parse(responseText);
    }
  } catch (parseError) {
    console.error("apiCall - JSON parse error:", parseError);
    throw new Error("Invalid response from server. Please try again.");
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
      // Server-side call - use direct backend URL to avoid proxy issues
      headers["Cookie"] = cookieHeader;
      // Use server-side env var, fallback to client-side for compatibility
      const backendOrigin =
        process.env.EXPRESS_BACKEND_ORIGIN ||
        process.env.NEXT_PUBLIC_EXPRESS_BACKEND_ORIGIN;
      url = `${backendOrigin}/api/v1/users/me`;
    } else {
      // Client-side call - use proxy route
      url = "/api/users/me";
    }

    // Make the request with fetch instead of axios to avoid baseURL issues
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      credentials: cookieHeader ? "include" : "include", // Always include credentials
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        return null;
      }

      // Try to read the error response
      let errorText = "";
      try {
        errorText = await response.text();
      } catch (textError) {
        // Ignore text reading errors
      }

      throw new Error(
        `HTTP ${response.status}: ${response.statusText} - ${errorText}`,
      );
    }

    let data;
    try {
      const responseText = await response.text();

      // Temporary debug logging for Discord issue
      console.log(
        "🔍 FETCH_USER_DISCORD: Response text length:",
        responseText.length,
      );
      console.log(
        "🔍 FETCH_USER_DISCORD: Response preview:",
        responseText.substring(0, 200),
      );
      console.log(
        "🔍 FETCH_USER_DISCORD: Response ending:",
        responseText.substring(responseText.length - 200),
      );

      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error("❌ FETCH_USER: JSON parse error:", parseError);
      const errorMessage =
        parseError instanceof Error ? parseError.message : String(parseError);
      throw new Error(`Failed to parse response as JSON: ${errorMessage}`);
    }

    if (data.success && data.data) {
      return data.data;
    }
    return null;
  } catch (error: any) {
    if (error.message?.includes("401") || error.message?.includes("403")) {
      return null;
    }
    console.error("Error fetching current user:", error);
    throw new Error(error.message || "Failed to fetch user data.");
  }
};

export const useUser = () => {
  return useQuery<User | null, Error>({
    queryKey: [USER_QUERY_KEY],
    queryFn: () => fetchCurrentUser(), // Client-side call doesn't need cookieHeader
    staleTime: 5 * 60 * 1000, // 5 minutes stale time for user data
    retry: false,
  });
};

// --- 2. Login Mutation (useLogin) ---
interface LoginCredentials {
  email: string;
  password: string;
}

const loginUser = async (credentials: LoginCredentials): Promise<User> => {
  const data = await apiCall("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
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
      // Login affects all user-related queries - comprehensive invalidation
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [PROVIDERS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [ALL_USERS_QUERY_KEY] });
      toast.success(`Welcome back, ${user.name || "User"}!`);
      router.replace("/app");
    },
    onError: (error: any) => {
      const errorMessage =
        error.message || "Invalid email or password. Please try again.";
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
  const data = await apiCall("/auth/register", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
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
        error.message ||
        "Unable to create account. Please check your information and try again.";
      toast.error(errorMessage);
    },
  });
};

// --- 4. Verify Email Mutation (useVerifyEmail) ---
interface VerifyEmailPayload {
  verificationToken: string;
  email: string;
}

const verifyUserEmail = async (payload: VerifyEmailPayload) => {
  const data = await apiCall("/auth/verify-email", {
    method: "POST",
    body: JSON.stringify(payload),
  });
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
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
      router.replace("/auth/login");
    },
    onError: (error: any) => {
      const errorMessage =
        error.message || "Email verification failed. Please try again.";
      toast.error(errorMessage);
    },
  });
};

// --- 5. Request New Verification Email Mutation (useResendVerificationEmail) ---
interface ResendEmailPayload {
  email: string;
}

const requestNewVerificationEmail = async (payload: ResendEmailPayload) => {
  const data = await apiCall("/auth/request-new-verification-email", {
    method: "POST",
    body: JSON.stringify(payload),
  });
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
      const errorMessage = error.message || "Could not resend link.";
      toast.error(errorMessage);
    },
  });
};

// --- 6. Forgot Password Mutation (useForgotPassword) ---
interface ForgotPasswordPayload {
  email: string;
}

const requestPasswordResetLink = async (payload: ForgotPasswordPayload) => {
  const data = await apiCall("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
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
        error.message ||
        "Unable to send password reset email. Please check your email address.";
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
  const data = await apiCall("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
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
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
      router.replace("/auth/login");
    },
    onError: (error: any) => {
      const errorMessage =
        error.message ||
        "Unable to reset password. Please check your reset link or try again.";
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
  const data = await apiCall("/auth/change-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
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
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
    },
    onError: (error: any) => {
      const errorMessage =
        error.message ||
        "Unable to change password. Please check your current password.";
      toast.error(errorMessage);
    },
  });
};

// --- 9. Logout Mutation (useLogout) ---
const logoutUser = async () => {
  const data = await apiCall("/auth/logout", {
    method: "POST",
  });
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
      // Immediately clear user data for instant UI update
      queryClient.setQueryData([USER_QUERY_KEY], null);
      queryClient.invalidateQueries();

      // Show toast and redirect immediately
      toast.success("Logged out successfully", { icon: "👋" });
      router.replace("/auth/login");
    },
    onError: (error: any) => {
      const errorMessage =
        error.message || "Unable to log out. Please try again.";
      toast.error(errorMessage);
    },
  });
};

// For Google OAuth there is no Tanstack Query required

// --- 10. Update Profile Mutation (useUpdateProfile) ---
interface UpdateProfilePayload {
  name: string;
  bio?: string;
}

const updateProfile = async (payload: UpdateProfilePayload): Promise<User> => {
  const data = await apiCall("/users/me", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  if (data.success && data.data) {
    return data.data.user;
  }
  throw new Error(data.message || "Failed to update profile.");
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, UpdateProfilePayload>({
    mutationFn: updateProfile,
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] }); // Invalidate user data to refetch
      toast.success("Profile updated successfully!");
    },
    onError: (error: any) => {
      const errorMessage =
        error.message || "Failed to update profile. Please try again.";
      toast.error(errorMessage);
    },
  });
};

// --- 11. Fetch Avatar Providers Query (useAvatarProviders) ---
const fetchAvatarProviders = async (): Promise<string[]> => {
  try {
    const data = await apiCall("/users/me/providers", {
      method: "GET",
    });
    if (data.success && Array.isArray(data.data)) {
      return data.data;
    }
    return [];
  } catch (error: any) {
    console.error("Error fetching avatar providers:", error);
    // Don't show a toast for this, as it's a background fetch for UI options
    return []; // Return empty array on error
  }
};

export const useAvatarProviders = () => {
  return useQuery<string[], Error>({
    queryKey: [PROVIDERS_QUERY_KEY],
    queryFn: fetchAvatarProviders,
    staleTime: 1000 * 60 * 60, // Providers don't change often, 1 hour stale time
    retry: false, // Don't retry if initial fetch fails
  });
};

// --- 12. Update Avatar Provider Mutation (useUpdateAvatarProvider) ---
interface UpdateAvatarProviderPayload {
  provider: string;
}

const updateAvatarProvider = async (
  payload: UpdateAvatarProviderPayload,
): Promise<User> => {
  const data = await apiCall("/users/me/avatar", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  if (data.success && data.data) {
    return data.data.user;
  }
  throw new Error(data.message || "Failed to update avatar provider.");
};

export const useUpdateAvatarProvider = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, UpdateAvatarProviderPayload>({
    mutationFn: updateAvatarProvider,
    onSuccess: (updatedUser) => {
      // Avatar provider changes affect both user profile and available providers
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [PROVIDERS_QUERY_KEY] });
      toast.success(
        `Avatar updated to ${updatedUser.avatars?.selected || "default"}!`,
      );
    },
    onError: (error: any) => {
      const errorMessage =
        error.message || "Unable to update avatar. Please try again.";
      toast.error(errorMessage);
    },
  });
};

// --- 13. Upload Avatar Mutation (useUploadAvatar) ---
const uploadAvatar = async (file: File): Promise<User> => {
  const formData = new FormData();
  formData.append("avatar", file);

  // Use fetch for file upload - don't set Content-Type header, let fetch handle it
  const response = await fetch("/api/users/me/avatar", {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Upload failed:", errorText);
    throw new Error(`Upload failed: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.success && data.data) {
    if (data.data.user) {
      return data.data.user;
    } else {
      // If no user data is returned, we'll rely on query invalidation
      return {} as User; // Return empty user, invalidation will handle the rest
    }
  }
  throw new Error(data.message || "Failed to upload avatar.");
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, File>({
    mutationFn: uploadAvatar,
    onSuccess: () => {
      // Avatar uploads add new provider and update user profile
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [PROVIDERS_QUERY_KEY] });
      toast.success("Avatar uploaded successfully!");
    },
    onError: (error: any) => {
      const errorMessage =
        error.message ||
        "Unable to upload avatar. Please check file size and format.";
      toast.error(errorMessage);
    },
  });
};

// --- 14. Delete Avatar Mutation (useDeleteAvatar) ---
const deleteAvatar = async (): Promise<any> => {
  const data = await apiCall("/users/me/avatar", {
    method: "DELETE",
  });
  if (data.success) {
    return data;
  }
  throw new Error(data.message || "Failed to delete avatar.");
};

export const useDeleteAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, void>({
    mutationFn: deleteAvatar,
    onSuccess: () => {
      // Avatar deletion affects user profile and available providers
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [PROVIDERS_QUERY_KEY] });
      toast.success("Avatar deleted successfully!");
    },
    onError: (error: any) => {
      const errorMessage =
        error.message || "Unable to delete avatar. Please try again.";
      toast.error(errorMessage);
    },
  });
};

// --- 15. Get All Users Query (useAllUsers) ---
const fetchAllUsers = async (): Promise<AllUsersResponse> => {
  const data = await apiCall("/users", {
    method: "GET",
  });
  if (data.success && data.data) {
    return data.data;
  }
  throw new Error(data.message || "Failed to fetch all users.");
};

export const useAllUsers = () => {
  return useQuery<AllUsersResponse, Error>({
    queryKey: [ALL_USERS_QUERY_KEY],
    queryFn: fetchAllUsers,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};

// --- 16. Get Specific User Query (useSpecificUser) ---
const fetchSpecificUser = async (userId: string): Promise<User> => {
  const data = await apiCall(`/users/${userId}`, {
    method: "GET",
  });
  if (data.success && data.data) {
    return data.data;
  }
  throw new Error(data.message || "Failed to fetch user.");
};

export const useSpecificUser = (userId: string) => {
  return useQuery<User, Error>({
    queryKey: [SPECIFIC_USER_QUERY_KEY, userId], // Query key includes the ID
    queryFn: () => fetchSpecificUser(userId),
    enabled: !!userId, // Only run query if userId is available
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};

// --- 17. Discord Disconnect Mutation (useDiscordDisconnect) ---
const disconnectDiscord = async (): Promise<any> => {
  const data = await apiCall("/users/discord-disconnect", {
    method: "DELETE",
  });
  if (data.success) {
    return data;
  }
  throw new Error(data.message || "Failed to disconnect Discord.");
};

export const useDiscordDisconnect = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, void>({
    mutationFn: disconnectDiscord,
    onSuccess: () => {
      // Comprehensive invalidation - Discord disconnect affects user profile AND avatar providers
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [PROVIDERS_QUERY_KEY] });
      toast.success("Discord disconnected successfully!");
    },
    onError: (error: any) => {
      const errorMessage =
        error.message || "Unable to disconnect Discord. Please try again.";
      toast.error(errorMessage);
    },
  });
};
