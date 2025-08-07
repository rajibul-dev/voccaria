"use client";

import api from "@/_libs/axios"; // configured axios instance
import { AllUsersResponse, User } from "@/_types/user"; // Your User interface
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// --- Query Key Constants ---
const USER_QUERY_KEY = "user";
const ALL_USERS_QUERY_KEY = "allUsers"; // New key for all users
const SPECIFIC_USER_QUERY_KEY = "specificUser"; // New key for specific user
const PROVIDERS_QUERY_KEY = "avatarProviders"; // Already defined

// --- 1. Update Profile Mutation (useUpdateProfile) ---
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

// --- 2. Fetch Avatar Providers Query (useAvatarProviders) ---
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

// --- 3. Update Avatar Provider Mutation (useUpdateAvatarProvider) ---
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

// --- 4. Upload Avatar Mutation (useUploadAvatar) ---
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

// --- 5. Delete Avatar Mutation (useDeleteAvatar) ---
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

// --- 6. Get All Users Query (useAllUsers) ---
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

// --- 7. Get Specific User Query (useSpecificUser) ---
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

// --- 8. Discord Disconnect Mutation (useDiscordDisconnect) ---
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
