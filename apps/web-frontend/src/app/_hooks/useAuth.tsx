"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import api from "@/_libs/axios"; // configured axios instance
import { User, AllUsersResponse } from "@/_types/user"; // Your User interface

// --- Query Key Constants ---
const USER_QUERY_KEY = "user";
const ALL_USERS_QUERY_KEY = "allUsers"; // New key for all users
const SPECIFIC_USER_QUERY_KEY = "specificUser"; // New key for specific user
const PROVIDERS_QUERY_KEY = "avatarProviders"; // Already defined

export const fetchCurrentUser = async (
  cookieHeader?: string,
): Promise<User | null> => {
  try {
    const headers: Record<string, string> = {};
    if (cookieHeader) {
      headers["Cookie"] = cookieHeader; // Forward the incoming Cookie header
    }

    // --- NEW LOG HERE ---
    console.log(
      "*** fetchCurrentUser (Next.js Server-Side) - Attempting to fetch: /users/me",
    );
    console.log(
      "*** fetchCurrentUser (Next.js Server-Side) - Headers being sent:",
      headers,
    );
    // --- END NEW LOG ---

    // Pass the headers to the axios request
    const { data } = await api.get("/users/me", { headers }); // Calls /api/users/me (proxied to Express)

    if (data.success && data.data) {
      return data.data;
    }
    return null;
  } catch (error: any) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      return null;
    }
    console.error("Error fetching current user:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch user data.",
    );
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
  const { data } = await api.post("/auth/login", credentials);
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
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
      toast.success(`Login successful! Welcome ${user.name || "User"}!`);
      router.replace("/app");
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
  const { data } = await api.post("/auth/register", credentials);
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
  verificationToken: string;
  email: string;
}

const verifyUserEmail = async (payload: VerifyEmailPayload) => {
  const { data } = await api.post("/auth/verify-email", payload);
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
  );
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
  const { data } = await api.post("/auth/forgot-password", payload);
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
  const { data } = await api.post("/auth/reset-password", payload);
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
  const { data } = await api.post("/auth/change-password", payload);
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
        error.response?.data?.message ||
        "Failed to change password. Please try again.";
      toast.error(errorMessage);
    },
  });
};

// --- 9. Logout Mutation (useLogout) ---
const logoutUser = async () => {
  const { data } = await api.post("/auth/logout");
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
      queryClient.setQueryData([USER_QUERY_KEY], null);
      queryClient.invalidateQueries();
      toast.success("Logging out...", { icon: "👋" });
      setTimeout(() => {
        router.replace("/auth/login");
      }, 300);
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Logout failed.";
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
  const { data } = await api.patch("/users/me", payload);
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
        error.response?.data?.message ||
        "Failed to update profile. Please try again.";
      toast.error(errorMessage);
    },
  });
};

// --- 11. Fetch Avatar Providers Query (useAvatarProviders) ---
const fetchAvatarProviders = async (): Promise<string[]> => {
  try {
    const { data } = await api.get("/users/me/providers");
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
  const { data } = await api.patch("/users/me/avatar", payload);
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
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] }); // Invalidate user data to refetch
      toast.success(
        `Selected ${updatedUser.avatars?.selected || "default"} avatar!`,
      );
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Failed to update avatar provider.";
      toast.error(errorMessage);
    },
  });
};

// --- 13. Upload Avatar Mutation (useUploadAvatar) ---
const uploadAvatar = async (file: File): Promise<User> => {
  const formData = new FormData();
  formData.append("avatar", file);

  const { data } = await api.post("/users/me/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data", // axios handles this automatically with FormData, but explicit is fine
    },
  });

  if (data.success && data.data) {
    return data.data.user;
  }
  throw new Error(data.message || "Failed to upload avatar.");
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, File>({
    mutationFn: uploadAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] }); // Invalidate user data to refetch
      toast.success("Avatar uploaded successfully!");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Failed to upload avatar.";
      toast.error(errorMessage);
    },
  });
};

// --- 14. Delete Avatar Mutation (useDeleteAvatar) ---
const deleteAvatar = async (): Promise<any> => {
  const { data } = await api.delete("/users/me/avatar");
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
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] }); // Invalidate user data to refetch
      toast.success("Avatar deleted successfully!");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Failed to delete avatar.";
      toast.error(errorMessage);
    },
  });
};

// --- 15. Get All Users Query (useAllUsers) ---
const fetchAllUsers = async (): Promise<AllUsersResponse> => {
  const { data } = await api.get("/users");
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
  const { data } = await api.get(`/users/${userId}`);
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
  const { data } = await api.delete("/discord-disconnect");
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
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] }); // Invalidate current user to reflect change
      toast.success("Discord profile disconnected successfully!");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Failed to disconnect Discord.";
      toast.error(errorMessage);
    },
  });
};
